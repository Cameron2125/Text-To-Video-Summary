// Import necessary libraries and components
import React, { useContext, useEffect, useRef, useState } from 'react'; // React and its hooks
import ImageMapper from './components/imageMapper'; // Custom ImageMapper component
import { useRouter } from 'next/router'; // Next.js Router for navigation
import { Context } from './Context/promptContext'; // Global context for application
import {Image} from './components/Props/MainProp' // Image type definition
import Link from 'next/link'; // Next.js Link component for navigation

// Define ImageMapPage component
const ImageMapPage: React.FC = () => {
  // Hook into the global context
  const vals = useContext(Context)

  // Extract necessary values from the context
  const script = vals.items.generatedScript
  const prompt = vals.items.prompt
  const images = vals.items.images
  
  // Create a router instance for navigation
  const router = useRouter();

  // Define a function to save new image data
  const saveImages = (newImages: Image[]) => {
    const updatedVals = { ...vals.items };
    console.log("new images")
    console.log(images)
    updatedVals.images = newImages;

    vals.setItems(updatedVals);
  };

  // Define a function to go to the previous page
  const goToPreviousPage = () => {
    router.back();
  };

  // Define a function to go to the next page
  const goToNextPage = () => {

    const updatedVals = { ...vals.items };
    var newScript = ""
    const newImages = vals.items.images

    for (const images of newImages) {
      
      newScript += images.description;
    }

    updatedVals.script = newScript

    vals.setItems(updatedVals);
    console.log(updatedVals)
    router.push('/summary');
  };

  return (
    <div>
     
     <ImageMapper script={script} images={images} saveImages={saveImages}></ImageMapper>
     <div className="flex justify-center space-x-4">
          <button
            onClick={goToPreviousPage}
            className="bg-blue-500 text-white py-2 px-4 rounded  w-24"
          >
            Previous
          </button>
          <Link href="/summary">
            <button className="bg-blue-500 text-white py-2 px-4 rounded w-24" onClick={goToNextPage}>
              Next
            </button>
          </Link>
    </div>
    </div>
  );
};

export default ImageMapPage;

// {false && <VideoComponent audioFile={audioFile} imageFile={imageFile} />}