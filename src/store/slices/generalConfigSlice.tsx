import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  CantoralModeConstants,
  ScreenModeConstants,
} from "../../constants/SettingsConstants";
import { SearchInterface } from "../../types/SearchTypes";
import { nullableStringCompare } from "../../utils/stringUtils";

interface generalConfigStateInferface {
  cantoralMode: string;
  screenMode: string;
  showChores: boolean;
  showPresenterModal: boolean;
  selectedSong: string | null;
  selectedSongBook: string;
  searchText: SearchInterface[] | null;
  textSize: number;
}

const initialState: generalConfigStateInferface = {
  cantoralMode: CantoralModeConstants.TEXT,
  screenMode: ScreenModeConstants.NORMAL,
  showChores: false,
  showPresenterModal: false,
  selectedSong: null,
  selectedSongBook: "2023",
  searchText: null,
  textSize: 0,
};

const generalConfigSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setTextMode: (state) => {
      state.cantoralMode = CantoralModeConstants.TEXT;
    },
    setPresentationMode: (state) => {
      state.cantoralMode = CantoralModeConstants.PRESENTATION;
    },
    setChordsMode: (state) => {
      state.cantoralMode = CantoralModeConstants.CHORDS;
    },
    setBlackMode: (state) => {
      state.screenMode = ScreenModeConstants.BLACK;
    },
    setWhiteMode: (state) => {
      state.screenMode = ScreenModeConstants.WHITE;
    },
    setNormalMode: (state) => {
      state.screenMode = ScreenModeConstants.NORMAL;
    },
    setShowPresenterModal: (state) => {
      state.showPresenterModal = !state.showPresenterModal;
      state.screenMode = ScreenModeConstants.NORMAL;
    },
    setShowChores: (state) => {
      state.showChores = true;
    },
    setHideChores: (state) => {
      state.showChores = false;
    },
    setSearchText: (
      state,
      action: {
        payload: SearchInterface[];
        type: string;
      }
    ) => {
      state.searchText =
        action.payload?.sort((a, b) =>
          nullableStringCompare(
            a.songBook.find(
              (book) => book.songBookName === state.selectedSongBook
            )?.number,
            b.songBook.find(
              (book) => book.songBookName === state.selectedSongBook
            )?.number
          )
        ) || null;
    },
    setSelectedSongId: (
      state,
      action: {
        payload: string;
        type: string;
      }
    ) => {
      state.selectedSong = action.payload;
    },
    resetSelectedSongId: (state) => {
      state.selectedSong = null;
    },
    setSelectedSongBook: (
      state,
      action: {
        payload: string;
        type: string;
      }
    ) => {
      state.selectedSongBook = action.payload;
      state.searchText =
        state.searchText?.sort((a, b) =>
          nullableStringCompare(
            a.songBook.find((book) => book.songBookName === action.payload)
              ?.number,
            b.songBook.find((book) => book.songBookName === action.payload)
              ?.number
          )
        ) || null;
    },
    setLessTextSize: (state) => {
      state.textSize = state.textSize - 1;
    },
    setMoreTextSize: (state) => {
      state.textSize = state.textSize + 1;
    },
  },
});

export const {
  setShowChores,
  setHideChores,
  setTextMode,
  setPresentationMode,
  setChordsMode,
  setBlackMode,
  setWhiteMode,
  setNormalMode,
  setShowPresenterModal,
  setSearchText,
  setSelectedSongId,
  resetSelectedSongId,
  setSelectedSongBook,
  setLessTextSize,
  setMoreTextSize,
} = generalConfigSlice.actions;

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
const generalConfigState = (state: any) => state.config;

export const textSizeSelector = createSelector(
  [generalConfigState],
  (state: generalConfigStateInferface) => state.textSize
);

export const cantoralModeSelector = createSelector(
  [generalConfigState],
  (state: generalConfigStateInferface) => state.cantoralMode
);

export const screenModeSelector = createSelector(
  [generalConfigState],
  (state: generalConfigStateInferface) => state.screenMode
);

export const showPresenterModalSelector = createSelector(
  [generalConfigState],
  (state: generalConfigStateInferface) => state.showPresenterModal
);

export const searchTextSelector = createSelector(
  [generalConfigState],
  (state: generalConfigStateInferface) => state.searchText
);

export const selectedSongBookSelector = createSelector(
  [generalConfigState],
  (state: generalConfigStateInferface) => state.selectedSongBook
);

export default generalConfigSlice.reducer;
