import { useEffect, useRef, useState } from "react";
import { videos } from "src/app/data";
import { GVItem } from "./GVItem";
import { LoadMoreBtn } from "./LoadMoreBtn";
import { useAppDispatch, useAppSelector } from "src/app/store";
import { setScrollToGrid } from "src/features/playerSlice";

const VIDEOS_PER_PAGE = 12;

export const GridView = () => {
  const [visibleCount, setVisibleCount] = useState(VIDEOS_PER_PAGE);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + VIDEOS_PER_PAGE);
  };

  const { playerView, scrollToGrid } = useAppSelector((s) => s.player);
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!ref.current) return;
    if (scrollToGrid) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      dispatch(setScrollToGrid(false));
    }
  }, [playerView, ref]);

  return (
    <div className="w-full p-[20px] md:p-[40px]" ref={ref}>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[20px] md:gap-[40px]">
        {videos.slice(0, visibleCount).map((videoItem, i) => (
          <GVItem key={i} videoItem={videoItem} index={i} />
        ))}
      </div>
      {visibleCount < videos.length && <LoadMoreBtn onClick={handleLoadMore} />}
    </div>
  );
};
