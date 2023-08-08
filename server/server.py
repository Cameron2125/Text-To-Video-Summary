# Import the necessary libraries and modules
import base64
from io import BytesIO
import zipfile
import csv
import os
from flask import Flask, jsonify, request, send_file
from moviepy.editor import *
from flask_cors import CORS
from google.cloud import texttospeech
from moviepy.video.compositing.concatenate import concatenate_videoclips
from langchain.document_loaders.csv_loader import CSVLoader
from langchain.indexes import VectorstoreIndexCreator
from langchain.chains import RetrievalQA
from langchain.llms import OpenAI

# Instantiate Flask app and allow Cross-Origin Resource Sharing (CORS) from localhost:3000
app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])

# Set environment variables for Google Text-to-Speech and OpenAI
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = './scrum-videos-135195b74aac.json'
os.environ["OPENAI_API_KEY"] = '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'

# Define paths for image folder and CSV file
IMAGE_FOLDER = "./ImageList"
CSV_FILE = "Images.csv"

# Route for overlaying videos


@app.route('/overlay_videos', methods=['POST'])
def overlay_videos():
    try:
        # Get the uploaded background and overlay videos from the request
        bg_video = request.files['bg_video']
        overlay_video = request.files['overlay_video']

        # Get overlay position parameters
        overlay_x = int(request.form.get('overlay_x', 0))
        overlay_y = int(request.form.get('overlay_y', 0))
        scale_factor = float(request.form.get('scale_factor', 1.0))

        # Save the uploaded videos to temporary files
        bg_video_path = 'tmp_bg_video.mp4'
        overlay_video_path = 'tmp_overlay_video.mp4'
        bg_video.save(bg_video_path)
        overlay_video.save(overlay_video_path)

        # Load the videos, resize the overlay video, and ensure the frame rates match
        video_bg = VideoFileClip(bg_video_path)
        video_overlay = VideoFileClip(overlay_video_path, has_mask=True)
        video_overlay = video_overlay.resize(scale_factor)
        if video_bg.fps != video_overlay.fps:
            video_overlay = video_overlay.set_fps(video_bg.fps)

        # Extend overlay video to match background video length if necessary
        if video_bg.duration > video_overlay.duration:
            video_overlay = video_overlay.set_duration(video_bg.duration)

        # Composite the videos
        video_final = CompositeVideoClip([video_bg.set_position('center'),
                                          video_overlay.set_position((overlay_x, overlay_y), relative=True)])

        # Save the final video to the animations folder
        output_path = './animations/final_video.mp4'
        video_final.write_videofile(output_path, codec='libx264', fps=video_bg.fps,
                                    preset='ultrafast', ffmpeg_params=["-pix_fmt", "rgba"])

        # Clean up temporary files
        video_bg.reader.close()
        video_bg.audio.reader.close_proc()
        video_overlay.reader.close()
        video_overlay.audio.reader.close_proc()
        os.remove(bg_video_path)
        os.remove(overlay_video_path)

        # Return success message
        return jsonify({"message": "Video processed and saved successfully.", "output_path": output_path})
    except Exception as e:
        # Return error message if any error occurs
        return jsonify({"error": str(e)})

# Function to save image along with its description in a CSV file (CSV file is used for indexing for langchain)

# Route for synthesizing text into speech


@app.route('/synthesize', methods=['POST'])
def synthesize_text():
    # Check if the 'text' parameter is present in the request
    if 'text' not in request.form:
        return 'Error: Text parameter is missing', 400

    # Get the 'text' parameter value
    text = request.form['text']

    # Instantiate the Text-to-Speech client
    client = texttospeech.TextToSpeechClient()

    # Set the synthesis input, voice, and audio configuration parameters
    input_text = texttospeech.SynthesisInput(text=text)
    voice = texttospeech.VoiceSelectionParams(
        language_code='en-US', name='en-US-Neural2-D')
    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3)

    # Call the synthesize_speech method and get the response
    response = client.synthesize_speech(
        input=input_text, voice=voice, audio_config=audio_config)

    # Write the audio content to an output file
    output_file = 'output.mp3'
    with open(output_file, 'wb') as out:
        out.write(response.audio_content)

    # Return the output audio file
    return send_file(output_file, mimetype='audio/mpeg')

# Route for generating a video from an image and audio


@app.route('/generate_video', methods=['POST'])
def generate_video():
    # Check if audio and image files are present in the request
    if 'audio' not in request.files or 'image' not in request.files:
        return jsonify({'error': 'Audio and image files are required.'}), 400

    # Get the audio and image files from the request
    audio_file = request.files['audio']
    image_file = request.files['image']

    # Save the audio and image files to disk
    audio_path = 'audio.wav'
    image_path = 'image.jpg'
    audio_file.save(audio_path)
    image_file.save(image_path)

    # Load the audio and image files into AudioFileClip and ImageClip objects
    audio = AudioFileClip(audio_path)
    image = ImageClip(image_path)

    # Set the duration of the video clip to match the audio duration, set the frames per second (fps), and set the audio of the video clip
    video = image.set_duration(audio.duration)
    video = video.set_fps(24)
    video = video.set_audio(audio)

    # Save the generated video to disk
    output_path = 'output.mp4'
    video.write_videofile(output_path, codec='libx264')

    # Remove the temporary audio and image files
    os.remove(audio_path)
    os.remove(image_path)

    # Return the video file itself
    return send_file(output_path, as_attachment=True)

# Function to combine multiple audio and image files into a single video


def combine_audio_and_images(audio_files, image_files, output_file):
    # Create an empty list for storing the clips
    clips = []
    # Initialize a variable to hold the target size of the image clips
    target_size = None

    # Iterate over audio and image files
    for audio_file, image_file in zip(audio_files, image_files):
        # Load the audio and image files into AudioFileClip and ImageClip objects
        audio_clip = AudioFileClip(audio_file)
        image_clip = ImageClip(image_file)

        # Set target_size to the dimensions of the first image clip
        if target_size is None:
            target_size = image_clip.size

        # Resize image clip to the target_size if necessary
        if image_clip.size != target_size:
            image_clip = image_clip.resize(target_size)

        # Set the duration and audio of the image clip to match the audio clip
        image_clip = image_clip.set_duration(audio_clip.duration)
        image_clip = image_clip.set_audio(audio_clip)

        # Add the prepared image clip to the list of clips
        clips.append(image_clip)

    # Concatenate all clips into a final clip
    final_clip = concatenate_videoclips(clips)

    # Write the final clip into a video file
    final_clip.write_videofile(output_file, fps=24, codec='libx264')


@app.route('/generate_video_combined', methods=['POST'])
def generate_video_combined():
    # Check if audio and image files are present in the request
    if 'audio' not in request.files or 'image' not in request.files:
        return jsonify({'error': 'Audio and image files are required.'}), 400

    # Get the audio and image files from the request
    audio_files = request.files.getlist('audio')
    image_files = request.files.getlist('image')

    # Initialize lists to hold the paths of the audio and image files
    audio_paths = []
    image_paths = []

    # Initialize counters for audio and image files
    audio_counter = 0
    image_counter = 0

    # Save the audio files to disk and append their paths to the audio_paths list
    for audio_file in audio_files:
        audio_path = f"audio_{audio_counter}.wav"
        audio_file.save(audio_path)
        audio_paths.append(audio_path)
        audio_counter += 1

    # Save the image files to disk and append their paths to the image_paths list
    for image_file in image_files:
        image_path = f"image_{image_counter}.png"
        image_file.save(image_path)
        image_paths.append(image_path)
        image_counter += 1

    # Combine audio and image files into a video
    output_file = 'output.mp4'
    combine_audio_and_images(audio_paths, image_paths, output_file)

    # Return the video file itself
    return send_file(output_file, as_attachment=True)


@app.route('/uploadImages', methods=['POST'])
def uploadImages():
    # Get the image files and descriptions from the request
    files = request.files.getlist('image')
    descriptions = request.form.getlist('description')

    # Check if the number of files matches the number of descriptions
    if len(files) != len(descriptions):
        return jsonify({'error': 'Number of files and descriptions does not match.'}), 400

    # Save each image file along with its description
    for file, description in zip(files, descriptions):
        save_image(file, description)

    return "Images uploaded successfully."


# returns all images in image repository in base64
@app.route('/downloadAllImages', methods=['GET'])
def downloadAllImages():
    try:
        image_data = {}
        for image_name in os.listdir('./ImageList'):
            # reads all images from ImageList folder and encodes them into base64
            with open(os.path.join('./ImageList', image_name), 'rb') as f:
                encoded_string = base64.b64encode(f.read()).decode('utf-8')
                image_data[image_name] = encoded_string

        return jsonify(image_data)
    except Exception as e:
        return jsonify({'error': f"Error fetching images: {e}"}), 400


@app.route('/getImages', methods=['POST'])
def getImages():
    # Check if the 'text' parameter is present in the request
    if 'text' not in request.form:
        return 'Error: Text parameter is missing', 400

    # Get the 'text' parameter value
    text = request.form['text']
    query = "List the image paths of the images that could be used a visuals in this script: " + text

    # Load the CSV data
    loader = CSVLoader(file_path='./Images.csv')
    # Create a vector index for the data
    index = VectorstoreIndexCreator().from_loaders([loader])
    # Initialize a retrieval QA chain
    chain = RetrievalQA.from_chain_type(llm=OpenAI(
    ), chain_type="stuff", retriever=index.vectorstore.as_retriever(), input_key="question")
    # Get the images for the text
    response = chain({"question": query})

    # Return the images
    return response['result']


if __name__ == '__main__':
    # Start the Flask application
    app.run(debug=True, port=8080)
