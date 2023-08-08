import React, { useContext, useEffect, useRef, useState } from 'react';
import DisplayImages from './components/imageRepository';
import { useRouter } from 'next/router';
import { Context } from './Context/promptContext';
import {Image} from './components/Props/MainProp'
import Link from 'next/link';


const ServerImages: React.FC = () => {
  
 const vals = useContext(Context);
  // Router instance to navigate between pages
  const router = useRouter();

  // Function to update the images array in the global context
  const updateImages = (add: Image) => {
    const updatedVals = { ...vals };
    updatedVals.items.images.push(add);
    vals.setItems(updatedVals.items);
  }
  const goToPreviousPage = () => {
    router.back();
  };

  // Function to navigate to the next page
  const goToNextPage = () => {
    router.push('/ImageUploadPage');
  };

  return (
    <div>
      <DisplayImages onImageUpload={updateImages}></DisplayImages>

      <div className="flex justify-center space-x-4">
          <button
            onClick={goToPreviousPage}
            className="bg-blue-500 text-white py-2 px-4 rounded  w-24"
          >
            Previous
          </button>
          <Link href="/ImageUploadPage">
            <button className="bg-blue-500 text-white py-2 px-4 rounded w-24" onClick={goToNextPage}>
              Next
            </button>
          </Link>
        </div>
    </div>
  );
};

export default ServerImages;
