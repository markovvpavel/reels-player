import { useState } from "react";
import { videos } from "src/app/data";
import { useAppSelector } from "src/app/store";
import { useSwipeVertical } from "src/hooks/useSwipeVertical";
import { SVItem } from "./SVItem";

export const SVMobile = () => {
  const { reelsIndex } = useAppSelector((s) => s.player);
  const [currentIndex, setCurrentIndex] = useState(reelsIndex ? reelsIndex : 0);

  const handleSwipe = (direction: "up" | "down") => {
    if (direction === "up") {
      setCurrentIndex((prevIndex) =>
        prevIndex === videos.length - 1 ? 0 : prevIndex + 1
      );
    } else if (direction === "down") {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? videos.length - 1 : prevIndex - 1
      );
    }
  };

  useSwipeVertical(handleSwipe);

  return (
    <div className="block md:hidden h-full w-full relative">
      {videos.map((videoItem, index) => (
        <div
          key={index}
          className={`absolute h-full w-full transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            currentIndex === index
              ? "translate-y-0"
              : index > currentIndex
              ? "translate-y-full"
              : "translate-y-[-100%]"
          }`}
        >
          <SVItem videoItem={videoItem} isActive={currentIndex === index} />
        </div>
      ))}
    </div>
  );
};
