import React, { useRef, useEffect, useState } from 'react';
import { useSpring, animated, to } from '@react-spring/web';
import { useGesture } from 'react-use-gesture';
import imgs from './data';
import Experience from './Experience/Experience';
import BackgroundVideo from './Background Video/BackgroundVideo'; // import new component

import styles from './styles.module.css';

const calcX = (y, ly) => -(y - ly - window.innerHeight / 2) / 40;
const calcY = (x, lx) => (x - lx - window.innerWidth / 2) / 40;

const wheel = (y) => {
  const imgHeight = window.innerWidth * 0.3 - 20;
  const scrollOffset = y % (imgHeight * 5);
  const totalScrollHeight = imgHeight * 5;
  const translateY =
    -imgHeight * (y < 0 ? 6 : 1) - scrollOffset + totalScrollHeight / 2; // Adjust the scroll offset to center the component

  // Add logic to control the scroll behavior
  const maxScrollOffset = totalScrollHeight / 2;
  const minScrollOffset = -totalScrollHeight * 5.5;
  const clampedY = Math.max(minScrollOffset, Math.min(maxScrollOffset, translateY)) - 100; // Adjust the starting position by subtracting 100

  return `translateY(${clampedY}px)`;
};

export default function App() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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
        api({ x, y, rotateX: 0, rotateY: 0, scale: active ? 1 : 1.1 }),
      onPinch: ({ offset: [d, a] }) => api({ zoom: d / 200, rotateZ: a }),
      onMove: ({ xy: [px, py], dragging }) =>
        !dragging &&
        api({
          rotateX: calcX(py, y.get()) / 2,
          rotateY: -calcY(px, x.get()) / 2,
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

  return (
    <div className={styles.container} style={{ height: '100vh' }}>
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
    }}
  >
    <BackgroundVideo size={size} />
    <animated.div
      style={{
        transform: wheelY.to(wheel),
        marginTop: '-100px', // Add marginTop: '-100px' to move the Experience data up
      }}
    >
      <div style={{ zIndex: 1000 }}>
        {Array.from({ length: 1}).map((_, index) => (
          <Experience key={index} />
        ))}
      </div>
    </animated.div>
  </animated.div>
</div>

  );
}
