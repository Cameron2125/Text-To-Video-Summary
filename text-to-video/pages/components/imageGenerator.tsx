import React, {useContext, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Context } from '../Context/promptContext';
import { Readable } from 'stream';

interface Image {
  id: number;
  imageUrl: string;
  description: string;
}


const ImageGenerator: React.FC = () => {
  const vals = useContext(Context);
  const img = vals.items.images;
  const preset: Image = {id: 1, imageUrl: " ", description: " n"}
  const [images, setImages] = useState<Image[]>( img || []);
  const [description, setDescription] = useState('');
  const [curImage, setCurImage] = useState<Image | null>(null)


  useEffect(() => {
    updateImages(images);
  }, [images]);
  
  const updateImages = (value: Image[]) => {
    const updatedVals = { ...vals };
    updatedVals.items.images = value;
    vals.setItems(updatedVals.items);
    
  };
  const handleGeneration = async () => {

    try{

        const short =  "Generate an Image of: " + description;
        const shorts = short.trim()
        const res = await fetch('/api/completionImage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({prompt: shorts}),
        }).then(res => res.json());
        console.log("res")
        console.log(res)

        const imageBase64 = res.data[0].b64_json;
        const buffer = Buffer.from(imageBase64, 'base64');
        const readableStream = new Readable({
          read() {
            this.push(buffer);
            this.push(null);
          },
        });

        const blob = new Blob([readableStream.read()], { type: 'image/png' });
        const blobUrl = URL.createObjectURL(blob);
        console.log("blob url")
        console.log(blobUrl)
        

        const newImage: Image =  {
            id: Date.now(),
            imageUrl: blobUrl,
            description: description,

        }

        setCurImage(newImage)
        }
        catch(error){
          console.log(error)
        }


  }
  const handleImageUpload = () => {
    if (curImage && description) {
      curImage.description = description
      setImages((prevImages) => [...prevImages, curImage]);
      setDescription('');
      setCurImage(null);
    }
  };


  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Image Generator</h1>
     
      {curImage? (
          <div className="p-2 border border-gray-300 rounded">
          <img src={curImage.imageUrl} alt={curImage.description} className="w-full mb-2" />
          <p className="text-gray-700">{curImage.description}</p>
        </div>

      ): (
        <div></div>
      )}

        <div className="flex justify-center">
      <input
        
        type="text"
        placeholder="Description for Generated Image"
        className="w-full p-2 mt-4 border border-gray-300 rounded flex items-center"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      </div>
      <div className="flex justify-center">
      <button
              onClick={handleGeneration}
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50 mt-4"
            >
                {(curImage == null) ? 'Generate Picture' : 'Regenerate Picture'}
             
      </button>
      <button
              onClick={handleImageUpload}
              type="submit"
              disabled={curImage == null || description.length < 1}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50 mt-4"
            >
              Submit picture
      </button>
      </div>
     
      <h1 className="text-2xl font-bold mt-4 mb-4">Submitted Images</h1>
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

export default ImageGenerator;


