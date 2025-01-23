import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/app/store";
import { setPlayerView, setScrollToGrid } from "src/features/playerSlice";

import { randomizeKey } from "src/utils";

export const SwitchBtn = () => {
  const { playerView } = useAppSelector((s) => s.player);
  const dispatch = useAppDispatch();

  const handleSwitch = useCallback(() => {
    switch (playerView) {
      case "grid":
        dispatch(setPlayerView("swipe"));
        break;
      case "swipe":
        dispatch(setPlayerView("grid"));
        dispatch(setScrollToGrid(true));
        break;
    }
  }, [playerView, dispatch]);

  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className="fixed z-[2000] bottom-[25px] right-[25px] md:bottom-[50px] md:right-[50px] h-[60px] aspect-square rounded-[50%] bg-zinc-500/30 backdrop-blur-xl cursor-pointer"
      onClick={handleSwitch}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="h-full w-full flex justify-center items-center">
        {(playerView === "swipe" && <GridIcon isHover={isHover} />) ||
          (playerView === "grid" && <SwipeIcon isHover={isHover} />)}
      </div>
    </div>
  );
};

const SwipeIcon = ({ isHover }: { isHover: boolean }) => {
  return (
    <div className="h-[65%] w-[50%] flex flex-col justify-around items-center">
      <div
        className={`h-[33%] w-[70%] rounded-[3px_3px_0_0] ${
          isHover ? `bg-zinc-200` : `bg-zinc-400`
        }`}
      />
      <div
        className={`h-[6%] w-[90%] ${isHover ? `bg-zinc-200` : `bg-zinc-400`}`}
      />
      <div
        className={`h-[33%] w-[70%] rounded-[0_0_3px_3px] ${
          isHover ? `bg-zinc-200` : `bg-zinc-400`
        }`}
      />
    </div>
  );
};

const GridIcon = ({ isHover }: { isHover: boolean }) => (
  <div className="h-[65%] w-[65%] grid grid-cols-3 place-items-center p-[1px]">
    {Array(9)
      .fill(null)
      .map((_) => (
        <figure
          className={`h-[4.5px] aspect-square ${
            isHover ? `bg-zinc-200` : `bg-zinc-400`
          }`}
          key={randomizeKey()}
        />
      ))}
  </div>
);
