// Importing necessary hooks and components from packages
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import ImageUploader from './components/imageuploader'; // A component to handle image upload
import { Context } from './Context/promptContext'; // Application context for global state
import {Image} from './components/Props/MainProp' // Image type from main properties

// A component to manage the image upload page
function ImageUploadPage() {
  // Use the application context for global state
  const vals = useContext(Context);
  // Router instance to navigate between pages
  const router = useRouter();

  // Function to update the images array in the global context
  const updateImages = (add: Image) => {
    const updatedVals = { ...vals };
    updatedVals.items.images.push(add);
    vals.setItems(updatedVals.items);
  }

  // Function to navigate to the previous page
  const goToPreviousPage = () => {
    router.back();
  };

  // Function to navigate to the next page
  const goToNextPage = () => {
    router.push('/GenerateImages');
  };

  // Render the ImageUploadPage component
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Upload Your Images</h1>

      {/* Use the ImageUploader component, passing the current images and the updateImages function as props */}
      <ImageUploader images={vals.items.images} onImageUpload={updateImages}></ImageUploader>

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

export default ImageUploadPage; // Export the ImageUploadPage component for use in other files
