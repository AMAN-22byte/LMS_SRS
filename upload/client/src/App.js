// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Upload from './components/Upload';

function App() {
  return (
    <Router>
      <div>
        {/* <h1>Upload section</h1> */}
        <Routes>
          <Route path="/admin-upload" element={<Upload />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
