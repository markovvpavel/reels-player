import clsx from "clsx";
import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Player } from "src/components/Player/Player";
import { useLenisScroll } from "src/hooks/useLenisScroll";
import { useAppDispatch } from "src/app/store";
import { setPlayerView, setReelsIndex } from "src/features/playerSlice";
import { videos } from "src/app/data";
import { NextSeo } from "next-seo";

export default function HomePage() {
  const scrollRef = useLenisScroll();

  return (
    <article className="h-full w-full overflow-y-scroll" ref={scrollRef}>
      <NextSeo title="ReelsPlayer" />
      <Hero />
      <Player />
    </article>
  );
}

const Hero = () => {
  return (
    <section className="h-full w-full py-[20px]">
      <div className="h-1/6 w-full flex justify-center space-x-2 items-center">
        <Image
          alt="logo"
          className="h-[70px] w-auto"
          src={`/web-app-manifest-512x512.png`}
          height={0}
          width={0}
        />
        <span className="font-medium text-[24px] text-_white">ReelsPlayer</span>
      </div>
      <div className="h-4/6 w-full relative overflow-hidden">
        <Carousel ids={[1, 7, 11, 13, 14, 18]} />

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={clsx(
            "h-[80%] aspect-[9/16] rounded-[3px] bg-zinc-500/20 backdrop-blur-xl absolute inset-0 m-auto left-[-55%] top-[5%] md:left-[-35%] xl:left-[-20%] z-[2]"
          )}
        />
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={clsx(
            "h-[80%] aspect-[9/16] rounded-[3px] bg-zinc-500/20 backdrop-blur-xl absolute inset-0 m-auto right-[-55%] top-[5%] md:right-[-35%] xl:right-[-20%] z-[2]"
          )}
        />
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className={clsx(
            "h-[80%] aspect-[9/16] rounded-[3px] bg-zinc-500/10 blur-sm backdrop-blur-xl absolute inset-0 m-auto left-[-75%] top-[10%] md:left-[-50%] xl:left-[-35%] z-[1]"
          )}
        />
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className={clsx(
            "h-[80%] aspect-[9/16] rounded-[3px] bg-zinc-500/10 blur-sm backdrop-blur-xl absolute inset-0 m-auto right-[-75%] top-[10%] md:right-[-50%] xl:right-[-35%] z-[1]"
          )}
        />
      </div>
      <div className="h-1/6 w-full flex flex-col justify-evenly items-center">
        <span className="text-sm lg:text-md w-full px-[20px] max-w-[275px] lg:max-w-[420px] uppercase text-center font-light">
          Scroll down to begin
        </span>
        <div className="h-[40px] aspect-[9/16] border-[2px] border-zinc-200 rounded-[10px] flex justify-center items-center">
          <motion.div
            animate={{ y: [-8, 8, -8], opacity: [1, 1, 0, 1] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 0.5,
              duration: 1.5,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            className="h-[6px] aspect-square rounded-full bg-zinc-200"
          />
        </div>
      </div>
    </section>
  );
};

const Carousel: React.FC<{ ids: number[] }> = ({ ids }) => {
  const slides = [ids[ids.length - 1], ...ids, ids[0]];
  const [offset, setOffset] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(1);

  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const interval = setInterval(() => {
      setCurrentIdx((pv) => {
        if (pv === slides.length - 1) {
          ref.current!.style.transition = `transform 0s`;
          return 1;
        }

        if (pv === 0) {
          ref.current!.style.transition = `transform 0s`;
          return slides.length - 1;
        }

        ref.current!.style.transition = `transform 1s cubic-bezier(0.85, 0, 0, 1)`;
        return pv + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [ref, slides]);

  useEffect(() => {
    if (!ref.current) return;
    const handler = () => setOffset(ref.current!.offsetWidth / slides.length);

    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [ref, slides]);

  useEffect(() => {
    if (!ref.current) return;
    const next = -offset * currentIdx;
    ref.current.style.transform = `translateX(${next}px)`;
  }, [ref, offset, currentIdx]);

  const dispatch = useAppDispatch();

  return (
    <div className="h-full w-full relative z-[3]">
      <main
        className="h-full w-fit flex transition-opacity duration-500"
        style={{
          transform: `translateX(${-offset}px)`,
          opacity: offset === 0 ? 0 : 1,
        }}
        ref={ref}
      >
        {slides.map((x, i) => {
          const thumbnail = `/content/thumbnails/${x}.jpg`;
          const video = `/content/videos/${x}.mp4`;

          const videoIdx = videos.findIndex((x) => x.video === video);

          return (
            <motion.div
              className={clsx("h-full w-screen grid place-items-center")}
              key={i}
            >
              <div
                className="h-[80%] aspect-[9/16] rounded-[3px] overflow-hidden cursor-pointer"
                onClick={() => {
                  dispatch(setReelsIndex(videoIdx));
                  dispatch(setPlayerView("swipe"));
                }}
              >
                <video
                  autoPlay
                  className="h-full w-full object-cover"
                  loop
                  playsInline
                  muted
                  poster={thumbnail}
                  src={video}
                />
              </div>
            </motion.div>
          );
        })}
      </main>
    </div>
  );
};
