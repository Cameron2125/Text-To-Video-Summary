// Importing necessary hooks and components from packages
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { Context } from './Context/promptContext';
import Link from 'next/link';

// A component to manage the prompt page where users can submit text describing updates
const PromptPage: React.FC = () => {
  
  // Use the application context for global state
  const vals = useContext(Context);

  // Access values from the context
  const script = vals.items.script;
  const prompt = vals.items.prompt;


  // Use React hooks for local state management
  const [response, setResponse] = useState(script);
  const [description, setDescription] = useState(prompt);
  const [loading, setLoading] = useState(false);
  const [videoLength, setVideoLength] = useState<number>(30);

  // Router instance to navigate between pages
  const router = useRouter();

  //function to update the video length
  const handleVideoLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoLength(Number(e.target.value)); 
  };

  // Function to update the prompt in the global context
  const updatePrompt = (value: string) => {
    const updatedVals = { ...vals };
    updatedVals.items.prompt = value;
    vals.setItems(updatedVals.items);
    setDescription(value);
  };

  // Function to update the response in the global context
  const updateResponse = (value: string) => {
    const updatedVals = { ...vals };
    updatedVals.items.generatedScript = value;
    updatedVals.items.script = value;
    vals.setItems(updatedVals.items);
    setResponse(value); 
  };

  // Function to navigate to the previous page
  const goToPreviousPage = () => {
    router.back();
  };

  // Function to navigate to the next page
  const goToNextPage = () => {
    router.push('/ServerImagesPage');
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Show loading state
    setLoading(true);
    setResponse('');
  
    try {
      const promptValue = ('Write a script for a ${videoLength} second corperate summary video about the information below: \n' + prompt).trim();

      // Make an API call to get the completion
      const res = await fetch('/api/completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: promptValue }),
      }).then((res) => res.json());
  
      // Log the API response
      console.log(res);
      
      // Update the response in the global context
      updateResponse(res.completionText.text);
      
      // Hide loading state
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 bg-white">
        Make any Technical Doc into a Video!!
      </h1>
      <form className="bg-white shadow-md rounded p-8" onSubmit={handleSubmit}>
        <div className="mb-4">
          <h1 className="text-2xl font-bold mt-4">Submit text describing updates</h1>
          <input
            id="prompt"
            type="text"
            name="prompt"
            value={description}
            onChange={(e) => updatePrompt(e.target.value)}
            placeholder="How to ask a question?"
            autoComplete="off"
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        {script && (
          <div className="mb-4">
            <h2 className="font-bold">Response</h2>
            <p className="pl-2 text-gray-700 whitespace-pre-line">{response}</p>
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="videoLength" className="block text-sm font-bold mb-2">
            Desired Video Length (seconds):
          </label>
          <input
            id="videoLength"
            type="number"
            name="videoLength"
            value={videoLength || ''}
            onChange={handleVideoLengthChange}
            placeholder="Enter length in seconds"
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div className="flex justify-center mb-4">
          {response ? (
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded" type="submit">
              Regenerate
            </button>
          ) : (
            <button
              className="bg-blue-500 text-white font-bold text-xl py-2 px-4 rounded disabled:opacity-50 h-24 w-48"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Creating Script...' : 'Generate Script'}
            </button>
          )}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={goToPreviousPage}
            className="bg-blue-500 text-white py-2 px-4 rounded  w-24"
          >
            Previous
          </button>
          <Link href="/ServerImagesPage">
            <button className="bg-blue-500 text-white py-2 px-4 rounded w-24" onClick={goToNextPage}>
              Next
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default PromptPage;
