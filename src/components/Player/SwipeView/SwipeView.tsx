import { SVDesktop } from "./SVDesktop";
import { SVMobile } from "./SVMobile";

export const SwipeView = () => {
  return (
    <div className="h-full w-full fixed z-[1000] top-0 left-0 bg-_black">
      <SVMobile />
      <SVDesktop />
    </div>
  );
};
