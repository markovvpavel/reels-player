import { useEffect, useRef } from "react";

export const useSwipeVertical = (
  onSwipe: (direction: "up" | "down") => void
) => {
  const isDragging = useRef(false);
  const startY = useRef(0);

  // Touch handling for mobile
  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    startY.current = e.touches[0].clientY;
    isDragging.current = true;
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();

    if (!isDragging.current) return;

    const touchEndY = e.touches[0].clientY;
    const distance = touchEndY - startY.current;
    const threshold = 50; // Swipe threshold in pixels

    if (distance > threshold) {
      onSwipe("down");
      isDragging.current = false; // Reset dragging state
    } else if (distance < -threshold) {
      onSwipe("up");
      isDragging.current = false; // Reset dragging state
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false; // Reset dragging state
  };

  // Add event listeners for touch actions
  useEffect(() => {
    const handleTouchStartWrapper = (e: TouchEvent) => handleTouchStart(e);
    const handleTouchMoveWrapper = (e: TouchEvent) => handleTouchMove(e);
    const handleTouchEndWrapper = () => handleTouchEnd();

    window.addEventListener("touchstart", handleTouchStartWrapper);
    window.addEventListener("touchmove", handleTouchMoveWrapper);
    window.addEventListener("touchend", handleTouchEndWrapper);

    return () => {
      window.removeEventListener("touchstart", handleTouchStartWrapper);
      window.removeEventListener("touchmove", handleTouchMoveWrapper);
      window.removeEventListener("touchend", handleTouchEndWrapper);
    };
  }, []);
};
