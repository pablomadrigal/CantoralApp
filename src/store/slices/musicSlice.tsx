import { createSelector, createSlice } from "@reduxjs/toolkit";
import { setSelectedSong } from "./selectedSongSlice";
import { SongInterface } from "../../types/SongTypes";

interface generalConfigStateInferface {
  showAudioControl: boolean;
  musicURL: string | null;
  playMusic: boolean;
  currentTime: number;
  seekTime: number;
  duration: number;
  volume: number;
}

const initialState: generalConfigStateInferface = {
  showAudioControl: false,
  musicURL: null,
  playMusic: false,
  currentTime: 0,
  seekTime: 0,
  duration: 0,
  volume: 100,
};

const musicSlice = createSlice({
  name: "musicConfig",
  initialState,
  reducers: {
    toggleAudioControl: (state) => {
      state.showAudioControl = !state.showAudioControl;
    },
    hideAudioControl: (state) => {
      state.showAudioControl = false;
    },
    setMusicURL: (
      state,
      action: {
        payload: string;
        type: string;
      }
    ) => {
      state.musicURL = action.payload;
    },
    setPlayPause: (state) => {
      state.playMusic = !state.playMusic;
    },
    setCurrentTime: (
      state,
      action: {
        payload: number;
        type: string;
      }
    ) => {
      state.currentTime = action.payload;
    },
    setSeekTime: (
      state,
      action: {
        payload: number;
        type: string;
      }
    ) => {
      state.seekTime = action.payload;
    },
    setDuration: (
      state,
      action: {
        payload: number;
        type: string;
      }
    ) => {
      state.duration = action.payload;
    },
    setVolume: (
      state,
      action: {
        payload: number;
        type: string;
      }
    ) => {
      state.volume = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      setSelectedSong,
      (
        state,
        action: {
          payload: SongInterface;
          type: string;
        }
      ) => {
        state.musicURL = action.payload.musicURL || null;
      }
    );
  },
});

export const {
  toggleAudioControl,
  hideAudioControl,
  setMusicURL,
  setPlayPause,
  setCurrentTime,
  setSeekTime,
  setDuration,
  setVolume,
} = musicSlice.actions;

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
const musicConfigState = (state: any) => state.musicConfig;

export const showAudioControlSelector = createSelector(
  [musicConfigState],
  (state: generalConfigStateInferface) => state.showAudioControl
);

export const musicURLSelector = createSelector(
  [musicConfigState],
  (state: generalConfigStateInferface) => state.musicURL
);

export const playMusicSelector = createSelector(
  [musicConfigState],
  (state: generalConfigStateInferface) => state.playMusic
);

export const currentTimeSelector = createSelector(
  [musicConfigState],
  (state: generalConfigStateInferface) => state.currentTime
);

export const seekTimeSelector = createSelector(
  [musicConfigState],
  (state: generalConfigStateInferface) => state.seekTime
);

export const durationSelector = createSelector(
  [musicConfigState],
  (state: generalConfigStateInferface) => state.duration
);

export const volumeSelector = createSelector(
  [musicConfigState],
  (state: generalConfigStateInferface) => state.volume
);

export default musicSlice.reducer;
