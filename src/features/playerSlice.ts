import { createSlice } from "@reduxjs/toolkit";

interface State {
  playerView: "grid" | "swipe";
  reelsIndex: number | null;
  muted: boolean;
  showTips: boolean;
  scrollToGrid: boolean;
}

const initialState: State = {
  playerView: "grid",
  reelsIndex: null,
  muted: true,
  showTips: true,
  scrollToGrid: false,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayerView: (
      state,
      { payload }: { payload: typeof state.playerView }
    ) => {
      state.playerView = payload;
    },

    setScrollToGrid: (state, { payload }: { payload: boolean }) => {
      state.scrollToGrid = payload;
    },

    setReelsIndex: (state, { payload }: { payload: number }) => {
      state.reelsIndex = payload;
    },

    setMuted: (state, { payload }: { payload: boolean }) => {
      state.muted = payload;
    },

    setShowTips: (state, { payload }: { payload: boolean }) => {
      state.showTips = payload;
    },
  },
});

export const {
  setMuted,
  setPlayerView,
  setReelsIndex,
  setShowTips,
  setScrollToGrid,
} = playerSlice.actions;
export default playerSlice.reducer;
