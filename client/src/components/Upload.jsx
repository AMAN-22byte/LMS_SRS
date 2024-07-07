import React, { useState } from 'react';
import axios from 'axios';
import { Grid } from 'react-loader-spinner';
import './Upload.css'; 

const Upload = () => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadFile = async (type) => {
    const data = new FormData();
    data.append('file', video);
    data.append('upload_preset', 'videos_preset');

    try {
      const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
      const resourceType = type === 'video' ? 'video' : 'image';
      const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      console.log(secure_url);
      return secure_url;
    } catch (error) {
      console.error('Error uploading the file:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!video) {
      alert('Please select a video to upload');
      return;
    }
    try {
      setLoading(true);
      const videoUrl = await uploadFile('video');
      if (videoUrl) {
        // await axios.post(`${process.env.REACT_APP_BACKEND_BASEURL}/api/videos`, { videoUrl });   //---> this is for backend
        console.log('Upload Success:', videoUrl);
      } else {
        console.error('Failed to get video URL');
      }
      setVideo(null);
      setLoading(false);
    } catch (error) {
      console.error('Error during form submission:', error);
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="video">Video:</label>
          <br />
          <input
            type="file"
            accept="video/*"
            id="video"
            onChange={(e) => setVideo(e.target.files[0])}
            className="file-input"
          />
        </div>
        <br />
        <button type="submit" className="submit-button">Upload</button>
      </form>
      {loading && (
        <div className="loader-container">
          <Grid
            height={50}
            width={50}
            color="#4fa94d"
            ariaLabel="grid-loading"
          />
          <p className="loader-text">Uploading...</p>
        </div>
      )}
    </div>
  );
};

export default Upload;
