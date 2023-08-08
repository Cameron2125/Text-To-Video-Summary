import React, { useState } from 'react';
import { Image } from './Props/MainProp';

interface ImageMapperProps {
  images: Image[];
  script: string;
  saveImages: (newImages: Image[]) => void;
}

const ImageMapper: React.FC<ImageMapperProps> = ({ images, script, saveImages }) => {
  const [mappedText, setMappedText] = useState<string[]>([]);
  const [updatedImages, setUpdatedImages] = useState<Image[]>(images);

  const handleTextChange = (index: number, img: Image, event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;
    img.description = newText;
    setMappedText((prevText) => {
      const updatedText = [...prevText];
      updatedText[index] = newText;
      return updatedText;
    });
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      const updatedImagesCopy = [...updatedImages];
      [updatedImagesCopy[index - 1], updatedImagesCopy[index]] = [updatedImagesCopy[index], updatedImagesCopy[index - 1]];
      setUpdatedImages(updatedImagesCopy);
      saveImages(updatedImagesCopy)
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < updatedImages.length - 1) {
      const updatedImagesCopy = [...updatedImages];
      [updatedImagesCopy[index], updatedImagesCopy[index + 1]] = [updatedImagesCopy[index + 1], updatedImagesCopy[index]];
      setUpdatedImages(updatedImagesCopy);
      saveImages(updatedImagesCopy)
    }
  };
  const handleDuplicate = (index: number) => {
    const imageToDuplicate = updatedImages[index];
    const duplicatedImage = { ...imageToDuplicate };
    const updatedImagesCopy = [...updatedImages];
    updatedImagesCopy.splice(index + 1, 0, duplicatedImage);
    setUpdatedImages(updatedImagesCopy);
    saveImages(updatedImagesCopy)
  };
  const handleDelete = (index: number) => {
    let updatedImagesCopy = [...updatedImages];
    updatedImagesCopy.splice(index, 1);
    setUpdatedImages(updatedImagesCopy);
    //images = updatedImagesCopy;
    saveImages(updatedImagesCopy)
  };

  const getHighlightedScript = () => {
    let highlightedScript = script;

    updatedImages.forEach((imageWithText, index) => {
      const usedText = mappedText[index] || '';
      highlightedScript = highlightedScript.replace(usedText, `<span class="text-red-500">${usedText}</span>`);
    });

    return { __html: highlightedScript };
  };

  const renderKey = () => {
    return (
      <div className="text-sm mb-4">
        <span className="text-red-500">Red Text:</span> Assigned to an image&nbsp;&nbsp;&nbsp;&nbsp;
        <span className="text-black">Black Text:</span> Unused
      </div>
    );
  };

  return (
    <div className="flex">
      <div className="w-2/3 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          {updatedImages.map((imageWithText, index) => (
            <div key={index} className="card bg-white rounded-md shadow-md p-4">
              <img src={imageWithText.imageUrl} alt={`Image ${index + 1}`} className="w-full h-64 object-cover mb-4" />
              <input
                type="text"
                value={imageWithText.description || ''}
                onChange={(event) => handleTextChange(index, imageWithText, event)}
                className="p-2 border border-gray-300 rounded-md w-full"
                placeholder="Enter text..."
              />
              <div className="flex justify-center mt-2 grid grid-cols-2 gap-4">
                <button onClick={() => handleMoveUp(index)} disabled={index === 0} className="mr-2 px-2 py-1 bg-gray-200 rounded-md">
                  Up
                </button>
                <button onClick={() => handleMoveDown(index)} disabled={index === updatedImages.length - 1} className="mr-2 px-2 py-1 bg-gray-200 rounded-md">
                  Down
                </button>
                <button onClick={() => handleDuplicate(index)} className="mr-2 px-2 py-1 bg-gray-200 rounded-md">
                  Duplicate
                </button>
                <button onClick={() => handleDelete(index)} className="px-2 py-1 bg-gray-200 rounded-md">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/3 ml-4 bg-gray-100 p-4 rounded-md" style={{ position: 'sticky', top: '20px' }}>
        {renderKey()}
        <div dangerouslySetInnerHTML={getHighlightedScript()} />
      </div>
    </div>
  );
};

export default ImageMapper;
