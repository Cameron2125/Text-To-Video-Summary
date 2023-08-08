// Define an interface for the options parameter in getImages function
export interface ImageOptions {
  text: string; // The text to get relevant images for
}

// Define the async function 'getImages' to get images relevant to the provided text
export async function getImages(options: ImageOptions) {
  try {
    // Send a POST request to the '/getImages' endpoint of the local server at 'localhost:8080'
    // The body of the request contains the 'text' option URL-encoded
    const response = await fetch('http://localhost:8080/getImages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `text=${encodeURIComponent(options.text)}`,
    });

    // Log the response to the console
    console.log(response)

    // If the response status is not ok (200), throw an error
    if (!response.ok) {
      throw new Error('Failed to get relevant images');
    }
    
    // Return the response
    return response
  } catch (error) {
    // If there's an error, log it to the console and return null
    console.error(error);
    return null;
  }
}
