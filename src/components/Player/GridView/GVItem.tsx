import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "src/app/store";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { useInView, motion } from "motion/react";
import { setPlayerView, setReelsIndex } from "src/features/playerSlice";
import Image from "next/image";
import { VideoItem } from "types";

export const GVItem = memo(
  ({ videoItem, index }: { videoItem: VideoItem; index: number }) => {
    const [isHover, setIsHover] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const [isVideoLoading, setIsVideoLoading] = useState(true);

    useEffect(() => {
      if (videoRef.current && isHover) {
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
      }
      if (videoRef.current && !isHover) {
        videoRef.current.pause();
      }
    }, [videoRef, isHover]);

    const { isDesktop } = useMediaQuery();

    const handleHover = useCallback(
      (v: boolean) => {
        if (isDesktop) setIsHover(v);
      },
      [isDesktop]
    );

    const dispatch = useAppDispatch();

    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true });

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
        className="aspect-[9/16] w-full relative cursor-pointer"
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        onClick={() => {
          dispatch(setReelsIndex(index));
          dispatch(setPlayerView("swipe"));
        }}
        ref={ref}
      >
        <div
          className="h-full w-full absolute z-[4] top-0 left-0 transition-all duration-300"
          style={{
            visibility: isHover && isVideoLoading ? "visible" : "hidden",
          }}
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
            />
          </div>
        </div>

        <video
          className="hidden md:block absolute z-[1] h-full w-full object-cover"
          src={videoItem.video}
          loop
          playsInline
          muted
          ref={videoRef}
          poster={videoItem.thumbnail}
        />

        <div className="h-full w-full relative">
          <Image
            alt="thumbnail"
            className="object-cover"
            fill
            src={videoItem.thumbnail}
            priority
          />
        </div>
      </motion.div>
    );
  }
);
