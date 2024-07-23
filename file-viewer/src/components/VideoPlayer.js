import React, { useEffect, useRef } from 'react';
import dashjs from 'dashjs';
import './style.css';

const VideoPlayer = ({ url }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const player = dashjs.MediaPlayer().create();
    player.initialize(videoRef.current, url, true);

    return () => {
      player.reset();
    };
  }, [url]);

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        controls
        className="video-player"
      />
    </div>
  );
};

export default VideoPlayer;
