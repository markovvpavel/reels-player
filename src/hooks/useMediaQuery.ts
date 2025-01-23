import { useEffect, useState } from "react";

export const useMediaQuery = () => {
  const [state, setState] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeScreen: false,
  });

  useEffect(() => {
    const updateState = () => {
      const width = window.innerWidth;

      setState({
        isMobile: width < 768,
        isTablet: width >= 768,
        isDesktop: width >= 1024,
        isLargeScreen: width >= 1440,
      });
    };

    updateState();

    document.body.addEventListener("resize", updateState);
    return () => document.body.removeEventListener("resize", updateState);
  }, []);

  return state;
};
