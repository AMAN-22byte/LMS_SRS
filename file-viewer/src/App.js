import React from 'react';
import VideoPlayer from './components/VideoPlayer';

function App() {
  const videoUrl = 'http://localhost:3001/dash/manifest.mpd'; // Adjust this URL to your DASH manifest file

  return (
    <div className="App">
      <h1>DASH Video Streaming</h1>
      <VideoPlayer url={videoUrl} />
    </div>
  );
}

export default App;
