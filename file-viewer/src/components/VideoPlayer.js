import React, { useEffect, useRef } from 'react';
import dashjs from 'dashjs';

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
    <div>
      <video
        ref={videoRef}
        controls
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  );
};

export default VideoPlayer;
