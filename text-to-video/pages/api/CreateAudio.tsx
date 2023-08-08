// Import necessary components from 'fs' and 'path' libraries
import fs from 'fs'; // Node.js File System module to interact with the file system
import path from 'path'; // Node.js Path module for handling and transforming file paths

// Define an interface for the options parameter in generateAudioFile function
interface TextToSpeechOptions {
  text: string; // The text to be converted to speech
}

// Define the async function 'generateAudioFile' to generate an audio file from text
export async function generateAudioFile(options: TextToSpeechOptions) {
  try {
    // Send a POST request to the '/synthesize' endpoint of the local server at 'localhost:8080' 
    //returns a audio blob
    // The body of the request contains the 'text' option URL-encoded
    const response = await fetch('http://localhost:8080/synthesize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `text=${encodeURIComponent(options.text)}`,
    });

    // If the response status is not ok (200), throw an error
    if (!response.ok) {
      throw new Error('Failed to synthesize audio');
    }

    // Get the response as a Blob object
    const blob = await response.blob();

    // Create a local object URL for the Blob object and return it
    const audioURL = URL.createObjectURL(blob);
    return audioURL;
  } catch (error) {
    // If there's an error, log it to the console and return null
    console.error(error);
    return null;
  }
}
