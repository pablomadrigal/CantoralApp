import { createSelector, createSlice } from "@reduxjs/toolkit";
import CantoralModeConstants from "../../constants/SettingsConstants";
import { SearchSchema } from "../../types/SearchTypes";

interface generalConfigStateInferface {
  cantoralMode: string;
  showChores: boolean;
  selectedSong: string | null;
  selectedSongBook: string;
  searchText: SearchSchema[] | null;
  textSize: number;
}

const initialState: generalConfigStateInferface = {
  cantoralMode: CantoralModeConstants.TEXT,
  showChores: false,
  selectedSong: null,
  selectedSongBook: "CADV2019",
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
    setShowChores: (state) => {
      state.showChores = true;
    },
    setHideChores: (state) => {
      state.showChores = false;
    },
    setSearchText: (
      state,
      action: {
        payload: SearchSchema[];
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
    setMoreTextSize: (state) => {
      state.textSize = state.textSize + 1;
    },
    setLessTextSize: (state) => {
      state.textSize = state.textSize - 1;
    },
  },
});

export const {
  setShowChores,
  setHideChores,
  setTextMode,
  setPresentationMode,
  setSearchText,
  setSelectedSongId,
  resetSelectedSongId,
  setSelectedSongBook,
  setMoreTextSize,
  setLessTextSize,
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

export const searchTextSelector = createSelector(
  [generalConfigState],
  (state: generalConfigStateInferface) => state.searchText
);

export const selectedSongBookSelector = createSelector(
  [generalConfigState],
  (state: generalConfigStateInferface) => state.selectedSongBook
);

export default generalConfigSlice.reducer;
