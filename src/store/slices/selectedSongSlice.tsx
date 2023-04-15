/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { SliceSchema, SongSchema, VerseSchema } from "../../types/SongTypes";

interface selectedSongStateInferface {
  selectedSong: SongSchema | null;
  slides: SliceSchema[] | null;
  currentIdx: number;
  alignText: string;
}

interface updateIndexInterface {
  currentIdx: number;
  totalSlides: number;
}

const songToSlide = (song: SongSchema) => {
  const orderedVerses: VerseSchema[] = [];

  song.VerseOrder.forEach((verse) => {
    const verseFound = song.Verses.find(
      (originalVerse) => originalVerse.Type === verse
    );
    if (verseFound) orderedVerses.push(verseFound);
  });

  const temporalSlides: SliceSchema[] = [];
  orderedVerses.forEach((verse) => {
    if (verse.Lines.length > 8) {
      const middle = verse.Lines.length / 2;
      const firstSlide: SliceSchema = { Lines: [] };
      for (let i = 0; i < middle; i++) {
        firstSlide.Lines.push(verse.Lines[i]);
      }
      temporalSlides.push(firstSlide);

      const secondSlide: SliceSchema = { Lines: [] };
      for (let i = middle; i < verse.Lines.length; i++) {
        secondSlide.Lines.push(verse.Lines[i]);
      }
      temporalSlides.push(secondSlide);
    } else {
      temporalSlides.push({ Lines: verse.Lines });
    }
  });

  return temporalSlides;
};

const goToNextSlide = ({ currentIdx, totalSlides }: updateIndexInterface) => {
  if (currentIdx === totalSlides - 1) {
    return 0;
  } else {
    return currentIdx + 1;
  }
};

const goToPrevSlide = ({ currentIdx, totalSlides }: updateIndexInterface) => {
  if (currentIdx === 0) {
    return 0;
  } else {
    return currentIdx - 1;
  }
};

const initialState: selectedSongStateInferface = {
  selectedSong: null,
  currentIdx: 0,
  alignText: "center",
  slides: null,
};

const selectedSongSlice = createSlice({
  name: "selectedSong",
  initialState,
  reducers: {
    setSelectedSong: (
      state,
      action: {
        payload: SongSchema;
        type: string;
      }
    ) => {
      state.selectedSong = action.payload;
      state.slides = songToSlide(action.payload);
    },
    resetSelectedSong: () => initialState,
    nextSlide: (state) => {
      state.currentIdx = goToNextSlide({
        currentIdx: state.currentIdx,
        totalSlides: state.slides?.length || 0,
      });
    },
    prevSlide: (state) => {
      state.currentIdx = goToPrevSlide({
        currentIdx: state.currentIdx,
        totalSlides: state.slides?.length || 0,
      });
    },
    goToSlide: (
      state,
      action: {
        payload: number;
        type: string;
      }
    ) => {
      if (action.payload < (state.slides?.length || 0))
        state.currentIdx = action.payload;
    },
  },
});

export const {
  setSelectedSong,
  resetSelectedSong,
  nextSlide,
  prevSlide,
  goToSlide,
} = selectedSongSlice.actions;

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
const selectedSongState = (state: any) => state.selectedSong;

export const selectedSongSelector = createSelector(
  [selectedSongState],
  (state: selectedSongStateInferface) => state.selectedSong
);

export const slidesSelector = createSelector(
  [selectedSongState],
  (state: selectedSongStateInferface) => state.slides
);

export const currentIdxSelector = createSelector(
  [selectedSongState],
  (state: selectedSongStateInferface) => state.currentIdx
);

export const alignTextSelector = createSelector(
  [selectedSongState],
  (state: selectedSongStateInferface) => state.alignText
);

export default selectedSongSlice.reducer;
