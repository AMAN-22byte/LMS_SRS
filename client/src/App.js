// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import './App.css';
// import Upload from './components/Upload';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <h1>Upload Section</h1>
//         <Link to="/upload">Upload</Link>
//         <Routes>
//           <Route path="/upload" element={<Upload />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Upload from './components/Upload';

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
