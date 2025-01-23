import { SwitchBtn } from "./SwitchBtn";
import { GridView } from "./GridView/GridView";
import { SwipeView } from "./SwipeView/SwipeView";
import { useAppSelector } from "src/app/store";
import { useMemo } from "react";

export const Player = () => {
  const { playerView } = useAppSelector((s) => s.player);

  const renderPlayerView = () =>
    useMemo(() => {
      switch (playerView) {
        case "grid":
          return <GridView />;
        case "swipe":
          return <SwipeView />;
        default:
          return null;
      }
    }, [playerView]);

  return (
    <div className="w-full relative">
      <SwitchBtn />
      {renderPlayerView()}
    </div>
  );
};
