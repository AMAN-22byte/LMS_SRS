import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Upload from './components/Upload.jsx';

function App() {
  return (
    <div className="App">
      <h1>Upload Section</h1>
      <Link to="/upload">Upload</Link>
      <Routes>
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </div>
  );
}

export default App;
