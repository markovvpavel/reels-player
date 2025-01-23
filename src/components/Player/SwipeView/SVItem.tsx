import { useEffect, useRef, useState } from "react";
import { useKeyHandler } from "src/hooks/useKeyHandler";
import { Interaction, VideoItem } from "types";
import { Backward, Forward, Mute, Pause, Play, Unmute } from "../Icons";
import { useAppDispatch, useAppSelector } from "src/app/store";
import { setMuted } from "src/features/playerSlice";
import { motion } from "motion/react";
import Image from "next/image";
import clsx from "clsx";

export const SVItem = ({
  isActive,
  videoItem,
}: {
  videoItem: VideoItem;
  isActive: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { showTips, muted } = useAppSelector((s) => s.player);

  const [interaction, setInteraction] = useState<Interaction>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isActive) return;

    const handleTimeUpdate = () => {
      const percentage = (video.currentTime / video.duration) * 100;
      setProgress(percentage);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [videoRef, isActive]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        setIsVideoLoading(true);

        videoRef.current
          .play()
          .catch((error) => {
            console.error("Error playing video:", error);
          })
          .then((_) => {
            setTimeout(() => {
              setIsVideoLoading(false);
            }, 1000);
          });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive]);

  useKeyHandler(" ", () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        setInteraction("play");
        videoRef.current.play();
      } else {
        setInteraction("pause");
        videoRef.current.pause();
      }
    }
  });

  const handleClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        setInteraction("play");
        videoRef.current.play();
      } else {
        setInteraction("pause");
        videoRef.current.pause();
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      dispatch(setMuted(!muted));
    }
  };

  const rewindVideo = () => {
    if (videoRef.current) {
      setInteraction("backward");
      videoRef.current.currentTime = Math.max(
        0,
        videoRef.current.currentTime - 5
      );
    }
  };

  const fastForwardVideo = () => {
    if (videoRef.current) {
      setInteraction("forward");
      videoRef.current.currentTime = Math.min(
        videoRef.current.duration,
        videoRef.current.currentTime + 5
      );
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (interaction !== "pause" && interaction !== null) {
      timer = setTimeout(() => {
        setInteraction(null);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [interaction]);

  const progressBarRef = useRef<HTMLDivElement>(null);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = progressBarRef.current;
    const video = videoRef.current;

    if (!progressBar || !video) return;

    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const newProgress = (clickPosition / rect.width) * 100;
    const newTime = (newProgress / 100) * video.duration;

    video.currentTime = newTime;
    setProgress(newProgress);
  };

  return (
    <div
      className={clsx(
        "h-full w-full absolute lg:w-auto lg:aspect-[9/16]",
        showTips
          ? "lg:top-[5dvh] lg:h-[80%]"
          : "lg:inset-0 lg:m-auto lg:h-[95%]"
      )}
    >
      <div className="h-full w-full relative">
        <div
          className="h-full w-full absolute z-[4] top-0 left-0 transition-all duration-300"
          style={{ visibility: isVideoLoading ? "visible" : "hidden" }}
        >
          <div className="h-full w-full relative">
            <div className="h-full w-full flex justify-center items-center absolute z-[1] backdrop-blur-xl bg-zinc-200/10">
              <div className="animate-spin h-[50px] aspect-square rounded-[50%] border-t-zinc-200 border-l-zinc-200 border-r-zinc-200 border-b-zinc-400 border-[3px]"></div>
            </div>
            <Image
              alt="thumbnail"
              className="object-cover"
              fill
              src={videoItem.thumbnail}
              priority
              quality={25}
            />
          </div>
        </div>

        <div
          className="absolute z-[3] cursor-pointer top-[25px] right-[25px]"
          style={{ visibility: isActive ? "visible" : "hidden" }}
          onClick={toggleMute}
        >
          {muted ? (
            <Unmute className="h-[30px] aspect-square" />
          ) : (
            <Mute className="h-[30px] aspect-square" />
          )}
        </div>

        <div className="absolute z-[2] pointer-events-none -translate-x-[50%] -translate-y-[50%] top-[50%] left-[50%]">
          {(interaction === "forward" && (
            <Forward className="h-[40px] aspect-square" />
          )) ||
            (interaction === "backward" && (
              <Backward className="h-[40px] aspect-square" />
            )) ||
            (interaction === "pause" && (
              <Pause className="h-[40px] aspect-square" />
            )) ||
            (interaction === "play" && (
              <Play className="h-[40px] aspect-square" />
            ))}
        </div>

        <div className="h-full w-full absolute z-[1]">
          <div className="h-[calc(100%-50px)] w-full flex">
            <section
              className="h-full w-[25%] select-none"
              onClick={rewindVideo}
            />
            <section
              className="h-full w-[50%] select-none"
              onClick={handleClick}
            />
            <section
              className="h-full w-[25%] select-none"
              onClick={fastForwardVideo}
            />
          </div>

          <div
            className="h-[50px] w-full cursor-pointer relative"
            ref={progressBarRef}
            style={{ visibility: isActive ? "visible" : "hidden" }}
            onClick={handleProgressClick}
          >
            <div className="absolute bottom-0 left-0 z-[1] h-[7.5px] bg-zinc-200/30" />
            <motion.div
              className="absolute bottom-0 left-0 z-[2] h-[7.5px] bg-zinc-200"
              animate={{ width: `${progress}%` }}
              transition={{
                ease: "linear",
                duration: 0.2,
              }}
            />
          </div>
        </div>

        {isActive && (
          <video
            ref={videoRef}
            className={`h-full w-full object-cover`}
            src={videoItem.video}
            muted={isActive && muted}
            loop
            playsInline
            controls={false}
            poster={videoItem.thumbnail}
          />
        )}
      </div>
    </div>
  );
};
