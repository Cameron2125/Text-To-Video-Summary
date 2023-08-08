import React, { useState, useRef, useEffect } from 'react';

const VideoOverlayUploader: React.FC = () => {
  const [bgVideo, setBgVideo] = useState<File | null>(null);
  const [overlayVideo, setOverlayVideo] = useState<File | null>(null);
  const [overlayVideoMov, setOverlayVideoMov] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [resultVideo, setResultVideo] = useState<string | null>(null);
  const [overlayX, setOverlayX] = useState<number>(100);
  const [overlayY, setOverlayY] = useState<number>(100);
  const [isDragging, setIsDragging] = useState(false);
  const [initialMousePosition, setInitialMousePosition] = useState<{x: number, y: number}>({x: 0, y: 0});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const overlayVideoRef = useRef<HTMLVideoElement>(null);
  const [showVideos, setShowVideos] = useState(true);
  const [scaleFactor, setScaleFactor] = useState<number>(1.0);

  const [canvasX, setcanvasX] = useState<number>(1.0);
  const [canvasY, setcanvasY] = useState<number>(1.0);
  const [videoWidth, setVideoWidth] = useState(640); // assuming initial width is 640
  const [videoHeight, setVideoHeight] = useState(360); // assuming initial height is 360

  



  const handleScaleFactorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const scale = parseFloat(event.target.value);
    if (scale) {
      setScaleFactor(scale);
    }
  };


  //overlay must be type .webm
  //other can be mp4 or anythhing else supported by browser
  const handleBgVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBgVideo(file);
    }
  };

  const handleOverlayVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOverlayVideo(file);
    }
  };
  const handleOverlayVideoChangeMov = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOverlayVideoMov(file);
    }
  };

  const handleUpload = async () => {
    if (!bgVideo || !overlayVideoMov) {
      alert('Please upload both background and overlay videos.');
      return;
    }

    setProcessing(true);

    console.log("processing")
    console.log(overlayX.toString())
    console.log(overlayY.toString())
    try {
      const formData = new FormData();
      formData.append('bg_video', bgVideo);
      formData.append('overlay_video', overlayVideoMov);
      formData.append('overlay_x', (overlayX).toString());
      formData.append('overlay_y', (overlayY).toString());
      formData.append('scale_factor', scaleFactor.toString());

      console.log(overlayVideoMov)
      const response = await fetch('http://localhost:8080/overlay_videos', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process videos');
      }

      const result = await response.json();
      setResultVideo(result.output_path);
    } catch (error) {
      console.error('Error processing videos:', error);
      alert('Error processing videos. Please try again later.');
    } finally {
      setProcessing(false);
    }
  };

  const drawVideos = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    console.log(ctx)
    console.log(bgVideoRef.current)
    console.log(overlayVideoRef.current)
    if (ctx && bgVideoRef.current && overlayVideoRef.current) {
      console.log(overlayVideoRef)
      console.log(scaleFactor)
      setcanvasX(canvas.width)
      setcanvasY(canvas.height)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bgVideoRef.current, 0, 0, canvas.width, canvas.height);
      /*
      console.log("Test")
      ctx.drawImage(
        overlayVideoRef.current,
        overlayX,
        overlayY,
        overlayVideoRef.current.width  * scaleFactor,
        overlayVideoRef.current.height  * scaleFactor,
      );
      console.log("Test")
      */ 
      
    }
  };

  useEffect(() => {
    drawVideos();
  }, [overlayX, overlayY]);

  useEffect(() => {
    // whenever scaleFactor changes, update video dimensions
    if (overlayVideoRef.current) {
      setVideoWidth(overlayVideoRef.current.videoWidth * scaleFactor);
      setVideoHeight(overlayVideoRef.current.videoHeight * scaleFactor);
    }
  }, [scaleFactor]);

  const handleMouseDown = (e: React.MouseEvent<HTMLVideoElement>) => {
    setIsDragging(true);
    setInitialMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLVideoElement>) => {
    if (!isDragging  || !canvasRef.current) return;

    const dx = e.clientX - initialMousePosition.x;
    const dy = e.clientY - initialMousePosition.y;

    const newOverlayX = Math.min(Math.max(0, overlayX + dx), canvasRef.current.width);
    const newOverlayY = Math.min(Math.max(0, overlayY + dy), canvasRef.current.height);

    setOverlayX(newOverlayX);
    setOverlayY(newOverlayY);

    console.log(overlayX.toString())
    console.log(overlayY.toString())

    setInitialMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Video Overlay Uploader</h2>

      <div>
        <label className="block font-semibold mb-1">Background Video:</label>
        <input type="file" accept="video/*" onChange={handleBgVideoChange} />
        {bgVideo && <p>{bgVideo.name}</p>}
      </div>

      <div>
        <label className="block font-semibold mb-1">Overlay Video:</label>
        <input type="file" accept="video/*" onChange={handleOverlayVideoChange} />
        {overlayVideo && <p>{overlayVideo.name}</p>}
      </div>
      <div>
        <label className="block font-semibold mb-1">Overlay Video "Mov formatt":</label>
        <input type="file" accept="video/*" onChange={handleOverlayVideoChangeMov} />
        {overlayVideoMov && <p>{overlayVideoMov.name}</p>}
      </div>
      <div>
        <label className="block font-semibold mb-1">Overlay Scale Factor:</label>
        <input type="number" min="0.1" max="3" step="0.1" value={scaleFactor} onChange={handleScaleFactorChange} />
      </div>

      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
        onClick={handleUpload}
        disabled={processing || !bgVideo || !overlayVideo}
      >
        {processing ? 'Processing...' : 'Upload and Process'}
      </button>
      <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4" onClick={() => setShowVideos(!showVideos)}>
        {showVideos ? "Hide Videos" : "Show Videos"}
        </button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4" onClick={() => drawVideos()}>
          Draw
        </button>


      <div style={{ position: 'relative' }}>
        <canvas
          ref={canvasRef}
          width="640"
          height="360"
          style={{ border: '1px solid #ccc', marginTop: '20px' }}
        />
        {showVideos && bgVideo && (
          <video
            ref={bgVideoRef}
            controls
            className="mt-4"
            width="640"
            style={{ position: 'absolute', top: '0', left: '0', display: 'block' }}
            onCanPlay={() => drawVideos()}
          >
            <source src={URL.createObjectURL(bgVideo)} type={bgVideo.type} />
            Your browser does not support the video tag.
          </video>
        )}
        {overlayVideo && (
          <video
              ref={overlayVideoRef}
              className="mt-4"
              width={videoWidth}
              height={videoHeight}
              style={{ position: 'absolute', top: `${overlayY}px`, left: `${overlayX}px` }}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onCanPlay={() => drawVideos()}
          >
              <source src={URL.createObjectURL(overlayVideo)} type={overlayVideo.type} />
              Your browser does not support the video tag.
          </video>
        )}
      </div>

      {resultVideo && (
        <video controls className="mt-4" width="640">
          <source src={resultVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default VideoOverlayUploader;
