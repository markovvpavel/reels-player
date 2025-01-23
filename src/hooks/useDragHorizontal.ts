import { useEffect, useRef } from "react";

export const useDragHorizontal = (
  onDrag: (direction: "left" | "right") => void
) => {
  const isDragging = useRef(false);
  const startX = useRef(0);

  const handleMouseDown = (e: MouseEvent) => {
    startX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;

    const currentX = e.clientX;
    const distance = currentX - startX.current;
    const threshold = 50; // Drag threshold in pixels

    if (distance > threshold) {
      onDrag("right");
      isDragging.current = false; // Reset dragging state
    } else if (distance < -threshold) {
      onDrag("left");
      isDragging.current = false; // Reset dragging state
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false; // Reset dragging state
  };

  // Add event listeners for mouse actions
  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseUp); // Ensure dragging stops if mouse leaves the window

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseUp);
    };
  }, []);
};
