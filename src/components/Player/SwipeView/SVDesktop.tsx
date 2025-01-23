import { useCallback, useEffect, useState } from "react";
import { videos } from "src/app/data";
import { useAppDispatch, useAppSelector } from "src/app/store";
import { useDragHorizontal } from "src/hooks/useDragHorizontal";
import { useKeyHandler } from "src/hooks/useKeyHandler";
import { SVItem } from "./SVItem";
import { setPlayerView, setShowTips } from "src/features/playerSlice";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

export const SVDesktop = () => {
  const { reelsIndex } = useAppSelector((s) => s.player);
  const [currentIndex, setCurrentIndex] = useState(reelsIndex ? reelsIndex : 0);

  const handleDragHorizontal = (direction: "left" | "right") => {
    if (direction === "right") {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? videos.length - 1 : prevIndex - 1
      );
    } else if (direction === "left") {
      setCurrentIndex((prevIndex) =>
        prevIndex === videos.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const dispatch = useAppDispatch();

  useDragHorizontal(handleDragHorizontal);
  useKeyHandler("ArrowLeft", () => handleDragHorizontal("right"));
  useKeyHandler("ArrowRight", () => handleDragHorizontal("left"));
  useKeyHandler("Escape", () => dispatch(setPlayerView("grid")));

  return (
    <div className="hidden md:flex h-full w-screen items-center justify-center relative overflow-hidden">
      <Tips />
      {videos.map((videoItem, index) => (
        <motion.div
          key={index}
          className="absolute h-full w-full flex items-center justify-center"
          initial={{
            x: index > currentIndex ? "100%" : "-100%",
          }}
          animate={{
            x:
              currentIndex === index
                ? "0%"
                : index > currentIndex
                ? "100%"
                : "-100%",
          }}
          transition={{
            duration: 0.3,
            ease: [0.65, 0, 0.35, 1],
          }}
        >
          <SVItem isActive={currentIndex === index} videoItem={videoItem} />
        </motion.div>
      ))}
    </div>
  );
};

const Tips = () => {
  const [current, setCurrent] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      switch (current) {
        case 1:
          setCurrent(2);
          break;

        case 2:
          setCurrent(3);
          break;

        case 3:
          setCurrent(1);
          break;
      }
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [current]);

  const dispatch = useAppDispatch();

  const { showTips } = useAppSelector((s) => s.player);

  const handleClick = useCallback(
    () => dispatch(setShowTips(false)),
    [dispatch]
  );

  return (
    <div
      className="h-[50px] w-[420px] hidden md:flex absolute z-[5] bottom-[5dvh] right-0 left-0 m-auto bg-zinc-500/50 backdrop-blur-xl justify-center items-center overflow-hidden rounded-[3px] text-zinc-100"
      style={{ visibility: showTips ? "visible" : "hidden" }}
    >
      <div className="h-full w-full relative">
        <div
          className="h-[20px] aspect-square absolute z-[1] top-0 right-0"
          onClick={handleClick}
        >
          <div className="h-full w-full relative cursor-pointer select-none">
            <div className="bg-zinc-100 h-[70%] w-[2px] rotate-45 absolute inset-0 m-auto" />
            <div className="bg-zinc-100 h-[70%] w-[2px] -rotate-45 absolute inset-0 m-auto" />
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full"
            key={current}
          >
            {current === 1 && (
              <div className="h-full w-full text-md flex justify-center items-center py-4 space-x-3">
                <span className="font-light">Use</span>
                <Image
                  alt="mouse-left-click"
                  className="h-[24px] w-auto"
                  src="/content/mouse-left-click.svg"
                  height={0}
                  width={0}
                />
                <span className="font-light">
                  (hold and drag) mouse to swipe video
                </span>
              </div>
            )}
            {current === 2 && (
              <div className="h-full w-full text-lg font-light flex justify-center items-center py-2 space-x-3">
                <span>Use</span>
                <Image
                  alt="spacebar"
                  className="h-[24px] w-auto"
                  src="/content/spacebar.svg"
                  height={0}
                  width={0}
                />
                <span>to pause video</span>
              </div>
            )}
            {current === 3 && (
              <div className="h-full w-full text-lg font-light flex justify-center items-center py-2 space-x-3">
                <span>Use</span>
                <Image
                  alt="left-key"
                  className="h-[24px] w-auto"
                  src="/content/left-key.svg"
                  height={0}
                  width={0}
                />
                <span>and</span>
                <Image
                  alt="right-key"
                  className="h-[24px] w-auto"
                  src="/content/right-key.svg"
                  height={0}
                  width={0}
                />
                <span>to switch video</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
