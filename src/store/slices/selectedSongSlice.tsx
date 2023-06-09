/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSelector, createSlice } from '@reduxjs/toolkit';
import {
  VerseSchema,
  SongInterface,
  VerseInterface,
  VerseOrderInterface,
} from '../../types/SongTypes';
import {
  AlignTextConstants,
  CantoralModeConstants,
} from '../../constants/SettingsConstants';
import { getRandomString } from '../../utils/stringUtils';

interface selectedSongStateInferface {
  selectedSong: SongInterface | null;
  slides: VerseSchema[] | null;
  lyrics: VerseSchema[] | null;
  choresVerses: VerseSchema[] | null;
  currentIdx: number;
  alignText: string;
}

interface updateIndexInterface {
  currentIdx: number;
  totalSlides: number;
}

const returnOrderForMode = (
  song: SongInterface,
  type: CantoralModeConstants
) => {
  switch (type) {
    case CantoralModeConstants.CHORDS:
      return song.chordsVerseOrder;
    case CantoralModeConstants.PRESENTATION:
      return song.presenterVerseOrder;
    default:
      return song.lyricsVerseOrder;
  }
};

const songToVerseArray = (song: SongInterface, type: CantoralModeConstants) => {
  const orderedVerses: VerseInterface[] = [];
  const order: VerseOrderInterface[] = returnOrderForMode(song, type);
  order.sort((a, b) => a.order - b.order);
  order.forEach((verse) => {
    const verseFound = song.verses.find(
      (originalVerse) => originalVerse.title === verse.verseTitle
    );
    if (verseFound) orderedVerses.push(verseFound);
  });

  const temporalSlides: VerseSchema[] = [];
  orderedVerses.forEach((verse) => {
    if (type === CantoralModeConstants.PRESENTATION && verse.lines.length > 8) {
      const middle = verse.lines.length / 2;
      const firstSlide: VerseSchema = {
        id: `${verse?.id ?? getRandomString(6)}-1`,
        lines: [],
        verseNumber: temporalSlides.length,
        type: verse.type,
      };
      for (let i = 0; i < middle; i++) {
        firstSlide.lines.push(verse.lines[i]);
      }
      temporalSlides.push(firstSlide);

      const secondSlide: VerseSchema = {
        id: `${verse?.id ?? getRandomString(6)}-2`,
        lines: [],
        verseNumber: temporalSlides.length,
        type: verse.type,
      };
      for (let i = middle; i < verse.lines.length; i++) {
        secondSlide.lines.push(verse.lines[i]);
      }
      temporalSlides.push(secondSlide);
    } else {
      temporalSlides.push({
        id: verse?.id ?? getRandomString(6),
        lines: verse.lines,
        verseNumber: temporalSlides.length,
        type: verse.type,
      });
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
  alignText: AlignTextConstants.CENTER,
  slides: null,
  lyrics: null,
  choresVerses: null,
};

const selectedSongSlice = createSlice({
  name: 'selectedSong',
  initialState,
  reducers: {
    setSelectedSong: (
      state,
      action: {
        payload: SongInterface;
        type: string;
      }
    ) => {
      state.selectedSong = action.payload;
      state.slides = songToVerseArray(
        action.payload,
        CantoralModeConstants.PRESENTATION
      );
      state.lyrics = songToVerseArray(
        action.payload,
        CantoralModeConstants.TEXT
      );
      state.choresVerses = songToVerseArray(
        action.payload,
        CantoralModeConstants.CHORDS
      );
      state.currentIdx = 0;
    },
    setAlignTextCenter: (state) => {
      state.alignText = AlignTextConstants.CENTER;
    },
    setAlignTextStart: (state) => {
      state.alignText = AlignTextConstants.FLEX_START;
    },
    setAlignTextEnd: (state) => {
      state.alignText = AlignTextConstants.FLEX_END;
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
  setAlignTextCenter,
  setAlignTextStart,
  setAlignTextEnd,
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

export const lyricsSelector = createSelector(
  [selectedSongState],
  (state: selectedSongStateInferface) => state.lyrics
);

export const choresVersesSelector = createSelector(
  [selectedSongState],
  (state: selectedSongStateInferface) => state.choresVerses
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
