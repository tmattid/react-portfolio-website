import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import placeholderImage from '../../../././../assets/./images/PlaceholderForVideo.png'

const BackgroundVideo = ({ size, onLoadedData }) => {
  const videoAspectRatio = 1920 / 1080 // Set the aspect ratio of the video
  const [videoLoaded, setVideoLoaded] = useState(false)

  const calculateVideoSize = () => {
    const cardWidth = size.width
    const cardHeight = size.height
    const cardAspectRatio = cardWidth / cardHeight

    let videoWidth, videoHeight

    if (cardAspectRatio > videoAspectRatio) {
      // Card is wider, adjust height
      videoWidth = cardWidth
      videoHeight = cardWidth / videoAspectRatio
    } else {
      // Card is taller or has the same aspect ratio, adjust width
      videoWidth = cardHeight * videoAspectRatio
      videoHeight = cardHeight
    }

    return { width: videoWidth, height: videoHeight }
  }

  const videoSize = calculateVideoSize()


  const handleVideoLoad = (event) => {
    setVideoLoaded(true)
    onLoadedData() // Call the provided callback when the video has loaded

    const videoElement = event.target
    videoElement.style.transition = 'opacity 1s ease-in-out'
    videoElement.style.opacity = 1
  }


  const handleVideoEnd = (event) => {
    // Implement fade-out logic here
    const videoElement = event.target
    videoElement.style.transition = 'opacity 1s ease-in-out'
    videoElement.style.opacity = 0
  }

  useEffect(() => {
    setVideoLoaded(false) // Reset the video loaded state when size changes
  }, [size])

  return (
    <div
      style={{ width: `${videoSize.width}px`, height: `${videoSize.height}px` }}
    >
      {!videoLoaded && (
        <img
          src={placeholderImage}
          alt="Loading..."
          style={{
            width: '100%',
            height: '100%',
            filter: 'blur(10px)',
            background: 'rgba(255, 255, 255, 0.91)',
            borderRadius: '8px',
            opacity: 0,
            transition: 'opacity 0.5s ease-in-out', // Add transition for opacity
          }}
          onLoad={() => {
            const imageElement = document.getElementById('placeholder-image')
            imageElement.style.opacity = 1
          }}
          id="placeholder-image"
        />
      )}
      <ReactPlayer
        className="video"
        url="https://player.vimeo.com/external/395445056.hd.mp4?s=4e97eeb64de222d60330a6f0454ac643cae56c5f&profile_id=172&oauth2_token_id=57447761"
        playing
        muted
        preload="auto"
        playsinline
        loop
        width="100%"
        height="100%"
        onLoadedData={handleVideoLoad}
        onEnded={handleVideoEnd}
      />
    </div>
  )
}

export default BackgroundVideo
