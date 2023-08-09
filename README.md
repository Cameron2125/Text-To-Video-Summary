# Text-to-Video: React TypeScript Web App and Python Server

## Overview

This project is a Content Generation AI web app that interfaces with a Python server to provide a user-friendly platform for generating summarized videos with AI voiceovers based on user-provided content.

## Project Details

- **Name**: `text-to-video`
- **Version**: `0.1.0`

## Dependencies - Web App

### Core & Typings

- `@types/node`: `20.3.1`
- `@types/react`: `18.2.13`
- `@types/react-dom`: `18.2.6`
- `react`: `18.2.0`
- `react-dom`: `18.2.0`
- `typescript`: `5.1.3`

### Framework & Build

- `next`: `13.4.7`
- `autoprefixer`: `10.4.14`
- `postcss`: `8.4.24`
- `tailwindcss`: `3.3.2`

### Functionality & UI

- `react-player`: `^2.12.0`
- `react-dropzone`: `^14.2.3`
- `react-beautiful-dnd`: `^13.1.1`
- `react-dnd`: `^16.0.1`
- `react-dnd-html5-backend`: `^16.0.1`

### Linting

- `eslint`: `8.43.0`
- `eslint-config-next`: `13.4.7`

### API Interaction

- `openai`: `^3.3.0`

---

## Dependencies - Python Server

- Flask
- moviepy
- google-cloud-texttospeech
- Flask-CORS
- base64
- OpenAI
- And other standard libraries

---

## Server API Endpoints

### `/overlay_videos` (POST)

**Description:** Overlay a video over another.
**Parameters:**

- `background`: Video file
- `overlay`: Video file
- `position` (optional): Tuple representing overlay video position
- `scale` (optional): Float for overlay video scale factor

### `/synthesize` (POST)

**Description:** Converts a given text into speech.
**Parameters:**

- `text`: String

### `/generate_video` (POST)

**Description:** Generates a video using an image and an audio file.
**Parameters:**

- `image`: Image file
- `audio`: Audio file

### `/generate_video_combined` (POST)

**Description:** Generates a single video by combining multiple audio and image files.
**Parameters:**

- `audios`: List of audio files
- `images`: List of image files

### `/uploadImages` (POST)

**Description:** Uploads images and their descriptions to the server.
**Parameters:**

- `images`: List of image files
- `descriptions`: List of descriptions (strings)

### `/downloadAllImages` (GET)

**Description:** Downloads all the images from the image repository.

### `/getImages` (POST)

**Description:** Retrieves image paths for a given text.
**Parameters:**

- `text`: String

## Setup

### Environment Variables Web App

Ensure you set up the required OpenAI credentials for the web app by navigating to libs/openai.ts:

```bash
const configuration = new Configuration({
  apiKey: "[Your Key]",
});
```

### Environment Variables Server

Ensure you set up the required credentials for the python server by adding keys for the following:

```bash
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = './scrum-videos-135195b74aac.json' (your json credential file)
```

Instructions for setting this up https://cloud.google.com/text-to-speech/docs/before-you-begin

Now Enter OpenAI Key

```bash
os.environ["OPENAI_API_KEY"] = '[your key]'

```

### Running The App

1. **Clone the Repository**:

```bash
git clone [REPOSITORY_URL]
```

2. **Navigate to the Sever Directory and Start Sever**:

```bash
cd server
```

```bash
python server.py
```

3. **Navigate to the Web Directory**:

```bash
cd text-to-video
```

4. **Install Dependencies**:

```bash
npm install
```

4. **Start the Development Server**:

```bash
npm run dev
```

---

## User Guide

### 1. Create Summary Video

The primary feature of the web app:

#### 1.1 Prompt Page

Generate or regenerate a script from your summary and specify its duration.

#### 1.2 ServerImagesPage

View all images from the repository and select those to be used in the video. Future enhancements will include Azure Cognitive Search integration for more relevant image recommendations based on the script.

#### 1.3 ImageUploadPage

Upload personal images and provide a description for each.

#### 1.4 GenerateImages

Use DALL·E to generate images from textual descriptions.

#### 1.5 ImageMapping

Map the selected images to particular portions of your script. A side-key helps you track the used and unused sections of the script.

#### 1.6 Summary

Review your selected images and script, then generate and preview the final video.

### 2. Add to Image Repository

Contribute to the community's collection by uploading images to the repository, which can then be suggested to other users during their summary video creation.

### 3. Create Animations (In Progress)

Enhance your videos with animated overlays:

- **Current**: Upload a background and overlay image. Adjust the overlay's position and size dynamically.
- **Future**: Seamless integration into the summary video creation process, recommendations for overlays and backgrounds based on video content, and a dedicated repository for storing and recommending overlays and backgrounds.

---

## Contributing

For those interested in contributing, fork the repository and use a feature branch. Pull requests are always welcome.

## Issues

Encountered a problem or have a feature request? Raise an issue on the project's GitHub page.

## License

This project is under the MIT license. For more details, refer to the `LICENSE` file.

```

```
