import { useState, useEffect } from "react";

export default function useWindowSize () {
  const getSize = () => {
    let width = 0;
    let height = 0;

    if (window) {
      width = window.innerWidth
      height = window.innerHeight
    }
    return {
      width,
      height
    };
  };

  const [ windowSize, setWindowSize ] = useState(getSize);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getSize());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}