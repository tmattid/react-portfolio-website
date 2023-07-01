import React, { useRef, useEffect, useState } from 'react';
import { useSpring, animated, to } from '@react-spring/web';
import { useGesture } from 'react-use-gesture';
import imgs from './data';
import Experience from './Experience/Experience';
import BackgroundVideo from './Background Video/BackgroundVideo';

import styles from './styles.module.css';

const calcX = (y, ly, windowHeight) => -(y - ly - windowHeight / 2) / 40;
const calcY = (x, lx, windowWidth) => (x - lx - windowWidth / 2) / 40;

const wheel = (y, windowHeight) => {
  const imgHeight = window.innerWidth * 0.45 - 20;
  const scrollOffset = y % (imgHeight * 5);
  const totalScrollHeight = imgHeight * 5;
  const translateY =
    -imgHeight * (y < 0 ? 6 : 1) - scrollOffset + totalScrollHeight / 2;

  const maxScrollOffset = totalScrollHeight / 2;
  const minScrollOffset = -totalScrollHeight * 5.5;
  const clampedY = Math.max(minScrollOffset, Math.min(maxScrollOffset, translateY)) - 100;

  return `translateY(${clampedY}px) translateY(-50%)`;
};

export default function App() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();
    document.addEventListener('gesturestart', preventDefault);
    document.addEventListener('gesturechange', preventDefault);

    return () => {
      document.removeEventListener('gesturestart', preventDefault);
      document.removeEventListener('gesturechange', preventDefault);
    };
  }, []);

  const domTarget = useRef(null);
  const [{ x, y, rotateX, rotateY, rotateZ, zoom, scale }, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    zoom: 0,
    x: 0,
    y: 0,
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  const [{ wheelY }, wheelApi] = useSpring(() => ({ wheelY: 0 }));

  useGesture(
    {
      onDrag: ({ active, offset: [x, y] }) =>
        api({ x, y, rotateX: 0, rotateY: 0, scale: active ? 1 : 1.05 }),
      onPinch: ({ offset: [d, a] }) => api({ zoom: d / 200, rotateZ: a }),
      onMove: ({ xy: [px, py], dragging }) =>
        !dragging &&
        api({
          rotateX: calcX(py, y.get(), size.height) / 5,
          rotateY: -calcY(px, x.get(), size.width) / 5,
          scale: 1.05,
        }),
      onHover: ({ hovering }) =>
        !hovering && api({ rotateX: 0, rotateY: 0, scale: 1 }),
      onWheel: ({ event, offset: [, y] }) => {
        event.preventDefault();
        wheelApi.set({ wheelY: y });
      },
    },
    { domTarget, eventOptions: { passive: false } }
  );

  const marginTop = Math.floor((size.height * -2.0) / 2);

  const [scrollSpeed, setScrollSpeed] = useState(5); // Default speed is 1


  
  useEffect(() => {
      // Setup an interval to simulate wheel scroll
      const scrollInterval = setInterval(() => {
        wheelY.to(value => wheelApi.start({ wheelY: value + scrollSpeed }));
      }, 50);
  
      // Clear the interval when the component is unmounted or re-rendered
      return () => clearInterval(scrollInterval);
    }, [wheelApi, wheelY, scrollSpeed]); // Add scrollSpeed as a dependency
  

  
  useGesture(
      {
       
        onHover: ({ hovering }) => {
          !hovering ? setScrollSpeed(5) : setScrollSpeed(0); // If hovering, speed is 0, else 1
        },
       
      },
      { domTarget, eventOptions: { passive: false } }
    );





  return (
    <div className={styles.container} style={{ height: '100vh' }}>
      <animated.div
        ref={domTarget}
        className={styles.card}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '75%',
          transform: 'perspective(600px)',
          x,
          y,
          scale: to([scale, zoom], (s, z) => s + z),
          rotateX,
          rotateY,
          rotateZ,
        }}
      >
        <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1 }}>
          <BackgroundVideo size={size} onLoadedData={handleVideoLoad} />
        </div>

        {videoLoaded && (
          <animated.div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              zIndex: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transform: wheelY.to((y) => wheel(y, size.height)),
              marginTop: `${marginTop}px`,
              pointerEvents: 'none',
            }}
          >
            {Array.from({ length: 1 }).map((_, index) => (
              <Experience key={index} />
            ))}
          </animated.div>
        )}
      </animated.div>
    </div>
  );
}
