import React, { useEffect, useRef } from "react";

import classes from "../styles/smoothScroll.module.styl";

import useWindowSize from "./hooks/useWindowSize";

// from https://dev.to/holdmypotion/react-super-simple-smooth-scrolling-2l08

const SmoothScroll = ({ children }) => {
  // 1.
  const windowSize = useWindowSize();

  //2.
  const scrollingContainerRef = useRef();

  // 3.
  const data = {
    ease: 0.15,
    // ease: 1,
    current: 0,
    previous: 0,
    rounded: 0,
  };

  // 4.
  useEffect(() => {
    setBodyHeight();
  }, [ windowSize.height ]);

  const setBodyHeight = () => {
    document.body.style.height = `${scrollingContainerRef.current.getBoundingClientRect().height
      }px`;
  };

  // 5.
  useEffect(() => {
    requestAnimationFrame(() => smoothScrollingHandler());
  }, []);

  const smoothScrollingHandler = () => {
    data.current = window.scrollY;
    data.previous += (data.current - data.previous) * data.ease;
    data.rounded = Math.round(data.previous * 100) / 100;

    scrollingContainerRef.current.style.transform = `translateY(-${data.rounded}px)`;

    // Recursive call
    requestAnimationFrame(() => smoothScrollingHandler());
  };

  return (
    <div className={ classes.parent }>
      <div ref={ scrollingContainerRef }>{ children }</div>
    </div>
  );
};

export default SmoothScroll;