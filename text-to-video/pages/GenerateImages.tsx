// Importing necessary hooks and components from packages
import { useRouter } from 'next/router';  // Router from Next.js for page navigation
import React, { useContext } from 'react'; // React hooks for component building
import ImageGenerator from './components/imageGenerator'; // Component for generating images
import { Context } from './Context/promptContext'; // Application context for global state

// Component to manage the image generation page
const GenerateImagesPage: React.FC = () => {
  // Router instance to navigate between pages
  const router = useRouter();

  // Function to navigate to the previous page
  const goToPreviousPage = () => {
    router.back();
  };

  // Function to navigate to the next page
  const goToNextPage = () => {
    router.push('/ImageMapping');
  };

  // Render the GenerateImagesPage component
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Generate Images</h1>
      
      {/* Use the ImageGenerator component */}
      <ImageGenerator></ImageGenerator>
      
      <div className="flex justify-between w-1/2">
        {/* Buttons to navigate to previous and next pages */}
        <button
          onClick={goToPreviousPage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <button
          onClick={goToNextPage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GenerateImagesPage; // Export the GenerateImagesPage component for use in other files
