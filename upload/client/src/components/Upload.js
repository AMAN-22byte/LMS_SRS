import React, { useState } from "react";
import axios from 'axios';
import './Upload.css';

function Upload() {
  const [title, setTitle] = useState('');
  const [instructor, setInstructor] = useState('');
  const [courseName, setCourseName] = useState('');
  const [subject, setSubject] = useState('');
  const [file, setFile] = useState(null);

  const upload = () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('instructor', instructor);
    formData.append('courseName', courseName);
    formData.append('subject', subject);
    axios.post('http://localhost:3001/upload', formData)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="upload-container">
      <div className="upload-box">
        <h2>Upload Video</h2>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="instructor">Instructor</label>
            <input
              type="text"
              id="instructor"
              className="form-control"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="courseName">Course Name</label>
            <input
              type="text"
              id="courseName"
              className="form-control"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              className="form-control"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="file">Choose File</label>
            <input
              type="file"
              id="file"
              className="form-control"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <button type="button" className="upload-button" onClick={upload}>Upload</button>
        </form>
      </div>
    </div>
  );
}

export default Upload;
