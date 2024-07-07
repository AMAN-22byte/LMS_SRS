import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Upload from '../../../../client/src/components/Upload.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </Router>
  );
}

export default App;
