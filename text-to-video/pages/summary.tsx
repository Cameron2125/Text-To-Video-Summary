// Imports necessary components and hooks from various libraries
import React, { SetStateAction, useContext, useState } from 'react';
import { Context } from './Context/promptContext';  // Imports application context
import {useRouter} from 'next/router';  // Allows for router manipulations
import { Image } from './components/Props/MainProp';  // Importing the Image component

// Declares the main functional component for the summary page
const SummaryPage: React.FC = () => {
  // Extracts required values from the application context
  const vals = useContext(Context);
  const script = vals.items.script;  // Extracts the script from the context
  const prompt = vals.items.prompt;  // Extracts the prompt from the context
  const images = vals.items.images;  // Extracts the images from the context
  const video = vals.items.videoURL;  // Extracts the video URL from the context

  // Initializes the router and state variables
  const router = useRouter();
  const [audios, setaudios] = useState<String[]>([]);  // State variable for audio URLs
  const [generatedVideoURL, setGeneratedVideoURL] = useState("");  // State variable for the generated video URL

  // Delay function, returns a promise that resolves after a given time
  function delay(ms: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }

  // Function to generate a combined video from a given set of audio and image URLs
  async function generateVideoCombined(audioUrls: string[], imageUrls: string[]) {
    // Initial setup
    const formData = new FormData();
  
    // Iterates through each audio URL, fetches the audio blob and appends it to the form data
    for (const audioUrl of audioUrls) {
      if (audioUrl.at(0) != 'b'){
      }
      else{
        const audioBlob = await fetch(audioUrl).then(response => response.blob());
        formData.append('audio', audioBlob);
      }
    }
  
    // Iterates through each image URL, fetches the image blob and appends it to the form data
    for (const imageUrl of imageUrls) {
      const imageBlob = await fetch(imageUrl).then(response => response.blob());
      formData.append('image', imageBlob);
    }
  
    // Sends the POST request to the API endpoint
    const response = await fetch('http://localhost:8080/generate_video_combined', {
      method: 'POST',
      body: formData,
    });
  
    // Checks if the response was successful
    if (!response.ok) {
      console.log(response);
      //throw new Error('Error generating video.');
    }

    // Retrieves the video URL from the response
    const videoBlob = await response.blob();

    // Creates a temporary URL for the video Blob
    const videoUrl = URL.createObjectURL(videoBlob);
    console.log(videoUrl);
    return videoUrl;
  }

  // Function to synthesize audio from text
  const handleSynthesize = async (text: string) => {
    try {
      // Sends a POST request to the synthesize endpoint with the text as form data
      const response = await fetch('http://localhost:8080/synthesize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `text=${encodeURIComponent(text)}`,
      });

      // Checks if the response was successful
      if (!response.ok) {
        throw new Error('Failed to synthesize audio');
      }

      // Gets the blob from the response and creates a URL for it
      const blob = await response.blob();
      const audioURL = URL.createObjectURL(blob);
      return audioURL;
    } catch (error) {
      console.error(error);
      return "";
    }
  };

  // Function to generate the summary video
  async function generateVideoHuman() {
    // Initial setup
    const imags: string[] = [];
    const audios: string[] = [];

    // Processes each image and generates an audio URL for it
    for (const picture of images) {
      if (picture.description.length > 1){
        imags.push(picture.imageUrl);
        const audio = await handleSynthesize(picture.description);
        audios.push(audio);
      } 
    }

    // Delays execution for 2 seconds
    await delay(2000);

    // Calls the generateVideoCombined function and sets the generated video URL
    const video = generateVideoCombined(audios,imags);
    setGeneratedVideoURL(await video as SetStateAction<string>);
  }

  // Function to navigate back to the previous page
  const goToPreviousPage = () => {
    router.back();
  };
  
  
  
  


  return (
    <div className="summary-page-container bg-gray-200 min-h-screen">
      <div className="summary-page-content">
        <h1 className="text-3xl font-bold mb-4">Summary Page</h1>

        <div className="prompt-container bg-white shadow-md rounded p-8 mb-4">
          <h2 className="text-2xl font-bold mb-4">Prompt</h2>
          <p className="text-gray-700">{prompt}</p>
        </div>

        {script && (
          <div className="script-container bg-white shadow-md rounded p-8 mb-4">
            <h2 className="text-2xl font-bold mb-4">Script</h2>
            <p className="text-gray-700">{script}</p>
          </div>
        )}

        <button className="generate-video-button" onClick={(e) => generateVideoHuman()}>
          Generate Video
        </button>

        {generatedVideoURL && (
          <div className="video-container bg-white shadow-md rounded p-8 mb-4">
            <h2 className="text-2xl font-bold mb-4">Video</h2>
            <video controls>
              <source src={generatedVideoURL} type="video/mp4" />
            </video>
          </div>
        )}

        {images.length > 0 && (
          <div className="images-container bg-white shadow-md rounded p-8">
            <h2 className="text-2xl font-bold mb-4">Images</h2>
            <div className="grid grid-cols-3 gap-4">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image.imageUrl}
                  alt={`Image ${index + 1}`}
                  className="object-cover w-full h-24 rounded"
                />
              ))}
            </div>
          </div>
        )}
        <button className="back-button" onClick={goToPreviousPage}>
          Back
        </button>
      </div>
    </div>
  );
};

export default SummaryPage;
