import React, { useState } from 'react';

interface Image {
  id: number;
  imageUrl: string;
  description: string;
}

const RepositoryImages: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [descriptions, setDescriptions] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setSelectedFiles(fileArray);

      const fileUrls = fileArray.map((file) => URL.createObjectURL(file));
      setPreviewUrls(fileUrls);

      const initialDescriptions = fileArray.map(() => '');
      setDescriptions(initialDescriptions);
    }
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const updatedDescriptions = [...descriptions];
    updatedDescriptions[index] = value;
    setDescriptions(updatedDescriptions);
  };

  function submit(){

    handleSubmit();
    setSelectedFiles([]);
    setPreviewUrls([]);
    setDescriptions([]);
  }

  const handleSubmit = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file, index) => {
      formData.append('image', file);
      formData.append('description', descriptions[index]);
    });
    
    try {
      const response = await fetch(`http://localhost:8080/uploadImages`, {
        method: 'POST',
        body: formData,
      });

      console.log("test")
      if (response.ok) {
        console.log('Images uploaded successfully!');
        
      } else {
        console.error('Failed to upload images:', response.status);
        
      }

      

    } catch (error) {
      console.error('Error occurred during image upload:', error);
      // Handle error
    }
    console.log("test")
    
  };
  

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Image Upload</h2>
      <div className="border border-gray-300 rounded p-4 mb-4">
        <input type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" id="upload" />
        <label htmlFor="upload" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
          Select Images
        </label>
      </div>
      {previewUrls.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-4">
          {previewUrls.map((url, index) => (
            <div key={index} className="p-2 border border-gray-300 rounded">
              <img src={url} alt={`Preview ${index + 1}`} className="w-full mb-2" />
              <input
                type="text"
                value={descriptions[index]}
                onChange={(e) => handleDescriptionChange(index, e.target.value)}
                placeholder="Enter Description"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center">
        <button
          disabled={selectedFiles.length === 0}
          onClick={submit}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            selectedFiles.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Upload Images
        </button>
      </div>
    </div>
  );
};

export default RepositoryImages;
