import { useRouter } from 'next/router';
import React from 'react';

const StartPage: React.FC = () => {
  const router = useRouter();
  const goToNextPage = () => {
    // Logic to navigate to the next page
    router.push({ pathname: '/PromptPage' });
  };

  const goToAnimations = () => {
    // Logic to navigate to the animations page
    router.push({ pathname: '/test2' });
  };
  //C:\Users\camer\Downloads\textToVideo\text-to-video\pages\imageServerUpload.tsx

  const goToImageRepo = () => {
    // Logic to navigate to the server upload page
    router.push({ pathname: '/imageServerUpload' });
  };

  return (
    <div className="flex flex-col items-center">
    <h1 className="text-3xl font-bold py-10">Create your Custom Documentation Video Today</h1>
    
    <div className="flex flex-col items-center space-y-12 justify-center h-screen">
      <button
        onClick={goToNextPage}
        className="bg-blue-500 text-white w-80 h-12 rounded-lg text-lg"
      >
        Next
      </button>
      <button
        onClick={goToImageRepo}
        className="bg-blue-500 text-white w-80 h-12 rounded-lg text-lg"
      >
        Add to Image Repository
      </button>
      <button
        onClick={goToAnimations}
        className="bg-blue-500 text-white w-80 h-12 rounded-lg text-lg"
      >
        Create Animations
      </button>
    </div>
  </div>
  );
};

export default StartPage;
