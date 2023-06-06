import { createSelector, createSlice } from "@reduxjs/toolkit";
import { CantoralModeConstants } from "../../constants/SettingsConstants";
import { SearchInterface } from "../../types/SearchTypes";

interface generalConfigStateInferface {
  cantoralMode: string;
  showChores: boolean;
  showPresenterModal: boolean;
  selectedSong: string | null;
  selectedSongBook: string;
  searchText: SearchInterface[] | null;
  textSize: number;
}

const initialState: generalConfigStateInferface = {
  cantoralMode: CantoralModeConstants.TEXT,
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
    setShowPresenterModal: (state) => {
      state.showPresenterModal = !state.showPresenterModal;
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
      state.searchText = action.payload;
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
