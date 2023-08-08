import { useState } from 'react';
import { getImages, ImageOptions } from './api/getImages';

const YourComponent: React.FC = () => {
  const [textInput, setTextInput] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const options: ImageOptions = { text: textInput };
      const response = await getImages(options);
      console.log(response)
      if (response) {
        const responseData = await response.text();
        console.log(responseData)
        setResponse(responseData);
      } else {
        throw new Error('Failed to get relevant images');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={textInput}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm"
          placeholder="Enter text"
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
        >
          Generate Audio File
        </button>
      </form>

      {response && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Response:</h2>
          <pre className="mt-2 p-2 border border-gray-300 rounded-md bg-gray-100">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default YourComponent;
