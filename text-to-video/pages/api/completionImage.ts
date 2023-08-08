// Import necessary components and objects from 'next' and 'openai' libraries
import {NextApiRequest, NextApiResponse} from 'next'; // Next.js API route handling
import openai from '../../libs/openai'; // OpenAI SDK

// Define the default export, an async function that handles the request and response
export default async function handler(
  req: NextApiRequest, // The request object
  res: NextApiResponse, // The response object
) {
  // Extract 'prompt' from the request body
  const { prompt } = req.body;

  try {
    //must be in b64 format because if not cannot download image
    
    // Calls OpenAI's createImage method with specific parameters
    // prompt: The text to base the image creation on
    // n: The number of images to generate
    // size: The size of the image to generate
    // response_format: The format in which to return the response
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "512x512",
      response_format: 'b64_json'
    });

    // Sends a success (200) status code and the generated image data in the response
    res.status(200).json(response.data)
  } catch (err) {
    // If there's an error, send the error as the response
    res.send(err);
  }
}
