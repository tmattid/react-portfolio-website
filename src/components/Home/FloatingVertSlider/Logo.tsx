import React, { useRef, useState, useEffect } from 'react'
import { useSpring, animated, to } from '@react-spring/web'
import Box from '@mui/material/Box';
import VideoPlayer from "react-background-video-player";
import Fade from '@mui/material/Fade';


import { useGesture } from 'react-use-gesture'
import img from './data'

import styles from '../FloatingVertSlider/styles.module.css'

const calcX = (y: number, ly: number) => -(y - ly - window.innerHeight / 2) / 40
const calcY = (x: number, lx: number) => (x - lx - window.innerWidth / 2) / 40
console.log([img])

const image = img

const wheel = (y: number) => {
  const imgHeight = window.innerWidth * 0.4 - 200
  return `translateY(${-imgHeight * (y < 0 ? 6 : 1) - (y % (imgHeight * 6))}px`
}

export default function Logo() {



// Create an interface for the size of the window
interface Size {
  width: number;
  height: number;
}

const FunctionComponent = () => {
  // The size of the window
  const [, setSize] = useState<Size>();

  // This function updates the state thus re-render components
  const resizeHanlder = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    setSize({
      width: width,
      height: height,
    });
  };

  // Listening for the window resize event
  useEffect(() => {
    window.onresize = resizeHanlder;

    // You can also use:
    // window.addEventListener('resize', resizeHanlder);
  }, []);

  return (<VideoPlayer
    className="video"
    src={
      "https://assets.mixkit.co/videos/preview/mixkit-bubbles-of-water-rising-to-the-surface-186-large.mp4"
    }
    autoPlay={true}
    muted={true}
  ></VideoPlayer>)
  ;
};



  useEffect(() => {
    
    console.log(img)
    
    const preventDefault = (e: Event) => e.preventDefault()
    document.addEventListener('gesturestart', preventDefault)
    document.addEventListener('gesturechange', preventDefault)

    return () => {
      document.removeEventListener('gesturestart', preventDefault)
      document.removeEventListener('gesturechange', preventDefault)
    }
  }, [])

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

  const [, setChecked] = React.useState(true);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  

  const [{ wheelY }, wheelApi] = useSpring(() => ({ wheelY: 0 }))

  useGesture(
    {
      onDrag: ({ active, offset: [x, y] }) =>
        api({ x, y, rotateX: 0, rotateY: 0, scale: active ? 1 : 1.1 }),
      onPinch: ({ offset: [d, a] }) => api({ zoom: d / 1000, rotateZ: a }),
      onMove: ({ xy: [px, py], dragging }) =>
        !dragging &&
        api({
          rotateX: calcX(py, y.get()),
          rotateY: calcY(px, x.get()),
          scale: 1.4,
        }),
      onHover: ({ hovering }) =>
        !hovering && api({ rotateX: 0, rotateY: -10, scale: 1 }),
      onWheel: ({ event, offset: [, y] }) => {
        event.preventDefault()
        wheelApi.set({ wheelY: y })
      },
    },
    { domTarget, eventOptions: { passive: false } }
  )
  
  console.log(wheelY.to(wheel))


  return (
    <div className={styles.container}>
      
      <animated.div
        ref={domTarget}
        className={styles.card}
       
        style={{
          transform: 'perspective(600px)',
          x,
          y,
          scale: to([scale, zoom], (s, z) => s + z),
          rotateX,
          rotateY,
          rotateZ,
        }}>
          
          <div>
    {image.map((img, i) =>  <p style={{color: 'white'}} key={img.id}>{img.image}</p>)} </div>
  
    <FunctionComponent/>
        <animated.div style={{ transform: wheelY.to(wheel), }} >
          
          
          
       
          {image.map((img, i) => (
           
             <Fade key={img.id} in={img.id===0 || img.id>0 }>
             
            <Box  onChange={handleChange} key={img.id} style={{ backgroundImage: `url(${img.image})`,  }}>
          
            </Box>
            
            
            </Fade>
            
          ))}
          <Box height={1000}></Box>
                
   
 
  
        </animated.div>
      </animated.div>
    </div>
  )
}
