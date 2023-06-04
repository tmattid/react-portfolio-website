import React, { useRef, useState, useEffect } from 'react'
import { useSpring, animated, to } from '@react-spring/web'
import Box from '@mui/material/Box'
import VideoPlayer from 'react-background-video-player'
import Fade from '@mui/material/Fade'
import { useGesture } from 'react-use-gesture'
import img from './data'
import styles from '../FloatingVertSlider/styles.module.css'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import '../../../styles.module.css' // Import the CSS file for transition styles

const calcX = (y, ly) => -(y - ly - window.innerHeight / 2) / 40
const calcY = (x, lx) => (x - lx - window.innerWidth / 2) / 40
const image = img

interface FunctionComponentProps {
  size: {
    width: number
    height: number
  }
}

const FunctionComponent: React.FC<FunctionComponentProps> = ({ size }) => {
  return (
    <VideoPlayer
      className="video"
      src="https://player.vimeo.com/external/395445056.hd.mp4?s=4e97eeb64de222d60330a6f0454ac643cae56c5f&profile_id=172&oauth2_token_id=57447761"
      autoPlay={true}
      muted={true}
      style={{ width: `${size.width/2}px`, height: `${size.height/2}px`, }}
      
    />
  )
}

export default function Logo() {
  const domTarget = useRef(null)
  const [{ x, y, rotateX, rotateY, rotateZ, zoom, scale }, api] = useSpring(
    () => ({
      rotateX: 0,
      rotateY: -20,
      rotateZ: 0,
      scale: 1,
      zoom: 0,
      x: 0,
      y: 0,
      config: { mass: 5, tension: 100, friction: 50 },
    })
  )

  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const resizeHandler = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      setSize({
        width: width,
        height: height,
      })
    }

    window.addEventListener('resize', resizeHandler)

    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  const [, setChecked] = useState(true)

  const handleChange = () => {
    setChecked((prev) => !prev)
  }

  useEffect(() => {
    const preventDefault = (e) => e.preventDefault()
    document.addEventListener('gesturestart', preventDefault)
    document.addEventListener('gesturechange', preventDefault)

    return () => {
      document.removeEventListener('gesturestart', preventDefault)
      document.removeEventListener('gesturechange', preventDefault)
    }
  }, [])

  const visibleImages = 1 // Number of visible images at a time
  const totalImages = image.length

  const [visibleImageIndices, setVisibleImageIndices] = useState(
    Array.from({ length: visibleImages }, (_, i) => i)
  )

  useEffect(() => {
    const autoScroll = setInterval(() => {
      setVisibleImageIndices(
        visibleImageIndices.map((imageIndex) => (imageIndex + 1) % totalImages)
      )
    }, 10000)

    return () => clearInterval(autoScroll)
  }, [visibleImageIndices])

  useGesture(
    {
      onDrag: ({ active, offset: [x, y] }) =>
        api({ x, y, rotateX: 0, rotateY: 0, scale: active ? 1 : 1.1 }),
      onPinch: ({ offset: [d, a] }) => api({ zoom: d / 200, rotateZ: a }),
      onMove: ({ xy: [px, py], dragging }) =>
        !dragging &&
        api({
          rotateX: calcX(py, y.get()),
          rotateY: calcY(px, x.get()),
          scale: 1.2,
        }),
      onHover: ({ hovering }) =>
        !hovering && api({ rotateX: 0, rotateY: -10, scale: 1 }),
    },
    { domTarget, eventOptions: { passive: false } }
  )

  return (
    <div className="">
      <animated.div
        ref={domTarget}
        //add bootstrap class
        
        style={{
          transform: 'perspective(600px)',
          x,
          y,
          scale: to([scale, zoom], (s, z) => s + z),
          rotateX,
          rotateY,
          rotateZ,
        }}
      >
        <div>
          {image.map((img, i) => (
            <p style={{ color: 'white' }} key={img.id}>
              {img.image}
            </p>
          ))}
        </div>
        <FunctionComponent size={size} />
        <animated.div>
          {visibleImageIndices.map((imageIndex, i) => {
            const imgStyle = {
              backgroundImage: `url(${image[imageIndex].image})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: '100%',
              height: '100%',
              opacity: 1, // Initially set opacity to 1 for fade-in effect
              transition: 'opacity 0.5s ease-out', // Add transition for opacity

              // Add any additional styling properties here
            }

            return (
              <Box
                key={imageIndex}
                className={styles.scrollUp}
                style={imgStyle}
                onChange={handleChange}
                sx={{
                  opacity: visibleImageIndices.includes(imageIndex) ? 1 : 0, // Set opacity to 0 for fade-out effect
                }}
              />
            )
          })}
        </animated.div>
      </animated.div>
    </div>
  )
}
