import { useEffect, useRef } from "react";
import Lenis, { LenisOptions } from "@studio-freight/lenis";

export const useLenisScroll = (enabled: boolean = true) => {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const lenis = new Lenis({
      duration: 1.2, // Adjust duration for smoothness
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // Ease out cubic easing
      wrapper: containerRef.current, // Element to apply Lenis to
      gestureDirection: "vertical", // Optional: Configure scroll direction
    } as LenisOptions); // Ensure TypeScript recognizes the options

    const animate = (time: number) => {
      lenis.resize();
      lenis.raf(time);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      lenis.destroy();
    };
  }, [enabled, containerRef.current]);

  return containerRef;
};
