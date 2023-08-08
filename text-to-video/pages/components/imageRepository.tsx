import React, { useEffect, useState } from 'react';
import {Image} from './Props/MainProp'

interface ImageUploaderProps {
    onImageUpload: (image: Image) => void;
  }

const DisplayImages: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
    const [imageUrls, setImageUrls] = useState<Image[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                // Fetch the JSON data with base64 encoded images from the API endpoint
                const response = await fetch('http://localhost:8080/downloadAllImages');
                const data = await response.json();

                const urls = (Object.values(data) as string[]).map((base64String: string) => {
                    // Convert the base64 string into a Blob
                    const byteCharacters = atob(base64String);
                    const byteNumbers = Array.prototype.slice.call(new Uint8Array(byteCharacters.length));
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], { type: "image/*" });
                    const newImage: Image = {
                                            id: Date.now(),
                                            imageUrl: URL.createObjectURL(blob),
                                            description: "",
                                            };
                    return newImage;
                });

                setImageUrls(urls);

            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    function onSubmit(image: Image){

        const newImages = imageUrls.filter(img => img.id !== image.id);
        onImageUpload(image);
        setImageUrls(newImages)
    }
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Recomended Repository Pictures</h1>
        <div className="grid grid-cols-2 gap-4">
            {imageUrls.map((image, index) => (
                <div key={index} className="card bg-white rounded-md shadow-md p-4">
                    <img src={image.imageUrl} alt={`Image ${index + 1}`} className="w-full h-64 object-cover mb-4" />
                    <button
                    onClick={ () => onSubmit(image)}
                    type="submit"
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50 mt-4"
            >
              Use Picture
      </button>
                </div>
            ))}
        </div>
        </div>
    );
};

export default DisplayImages;
