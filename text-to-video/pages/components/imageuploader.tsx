import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface Image {
  id: number;
  imageUrl: string;
  description: string;
}

interface ImageUploaderProps {
  images: Image[];
  onImageUpload: (image: Image) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ images, onImageUpload, }) => {
  const [description, setDescription] = useState(' ');
  const [curImage, setCurImage] = useState<Image | null>(null);

  const onDrop = (droppedFiles: File[]) => {
    droppedFiles.forEach((file) => {

      const parser = new FileReader();
      const imageUrl = URL.createObjectURL(file); 
      parser.onload = () => {
        const newImage: Image = {
          id: Date.now(),
          imageUrl: imageUrl,
          description,
        };
        setCurImage(newImage);
      };

      parser.readAsDataURL(file);
    });
  };

  const handleImageUpload = () => {
    if (curImage && description) {
      curImage.description = description;
      onImageUpload(curImage);
      setDescription('');
      setCurImage(null);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Image Uploader</h1>
      <div {...getRootProps()} className="border border-gray-300 rounded p-4 ">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500">Drop the files here...</p>
        ) : (
          <p className="text-gray-500 justif">
            Drag 'n' drop some files here, or click to select files
          </p>
        )}
      </div>
      {curImage ? (
        <div className="p-2 border border-gray-300 rounded">
          <img src={curImage.imageUrl} alt={curImage.description} className="w-full mb-2" />
          <p className="text-gray-700">{curImage.description}</p>
        </div>
      ) : (
        <div></div>
      )}

      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Description for Image above"
          className="w-full p-2 mt-4 border border-gray-300 rounded flex items-center"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleImageUpload}
          type="submit"
          disabled={curImage == null || description.length < 1}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50 mt-4"
        >
          Submit picture
        </button>
      </div>

      <h1 className="text-2xl font-bold mt-4 mb-4">Uploaded Images</h1>
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {images.map((image) => (
            <div key={image.id} className="p-2 border border-gray-300 rounded">
              <img src={image.imageUrl} alt={image.description} className="w-full mb-2" />
              <p className="text-gray-700">{image.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
