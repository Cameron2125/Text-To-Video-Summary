// Import necessary components and objects from 'next' and 'openai' libraries
import {NextApiRequest, NextApiResponse} from 'next'; // Next.js API route handling
import openai from '../../libs/openai'; // OpenAI SDK
import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum, CreateCompletionRequest } from 'openai'; // OpenAI API models


//CALL TO OPENAI NEEDS TO BE MODIFIIED TO COUNT TOKENS,SO THAT NO ERRORS HAPPEN
//max_tokens should  = models_max_tokens - token_size_of_prompt
// Define the default export, an async function that handles the request and response
export default async function handler(
  req: NextApiRequest, // The request object
  res: NextApiResponse, // The response object
) {
  
  // Extract 'text' from the request body. Assuming that 'text' field is sent in the request body.
  const { text } = req.body; 

  // Calls OpenAI's createCompletion method with specific parameters
  // model: The ID of the model to use for the text generation
  // prompt: The text to base the completion on
  // max_tokens: The maximum length of the generated text
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: text,
    max_tokens: 2800,
  });

  // Extracts the completion text from the first choice in the data array in the response
  const completionText = response.data.choices[0]; 

  // Sends a success (200) status code and the completion text in the response
  res.status(200).json({ completionText });
}
