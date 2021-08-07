import { useState, useEffect } from "react";

export default function useWindowSize () {

  const [ hasRan, setHasRan ] = useState(false)
  const [ windowSize, setWindowSize ] = useState({
    height: 0,
    width: 0,
  });

  useEffect(() => {

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    if (!hasRan) {
      setHasRan(true)
      handleResize()
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}