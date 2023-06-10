import React from 'react';
import VideoPlayer from 'react-background-video-player';

const BackgroundVideo = ({ size }) => {
  const videoAspectRatio = 1920 / 1080; // Set the aspect ratio of the video

  const calculateVideoSize = () => {
    const cardWidth = size.width;
    const cardHeight = size.height;
    const cardAspectRatio = cardWidth / cardHeight;

    let videoWidth, videoHeight;

    if (cardAspectRatio > videoAspectRatio) {
      // Card is wider, adjust height
      videoWidth = cardHeight * videoAspectRatio;
      videoHeight = cardHeight;
    } else {
      // Card is taller or has the same aspect ratio, adjust width
      videoWidth = cardWidth;
      videoHeight = cardWidth / videoAspectRatio;
    }

    return { width: videoWidth, height: videoHeight };
  };

  const videoSize = calculateVideoSize();

  return (
    <VideoPlayer
      className="video"
      src="https://player.vimeo.com/external/395445056.hd.mp4?s=4e97eeb64de222d60330a6f0454ac643cae56c5f&profile_id=172&oauth2_token_id=57447761"
      autoPlay
      muted
      playsInline
      style={{ width: `${videoSize.width}px`, height: `${videoSize.height}px` }}
    />
  );
};

export default BackgroundVideo;
