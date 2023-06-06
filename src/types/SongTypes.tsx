export interface SongBookInterface {
  id: string;
  name: string;
  createdAt?: string;
}

export interface SongBookItemInterface {
  songBook: SongBookInterface;
  songBookName: string;
  number: string;
}

// eslint-disable-next-line no-shadow
export enum ChordsEnum {
  DO = "DO",
  DO_SOSTENIDO = "DO#",
  RE = "RE",
  RE_SOSTENIDO = "RE#",
  MI = "MI",
  FA = "FA",
  FA_SOSTENIDO = "FA#",
  SOL = "SOL",
  SOL_SOSTENIDO = "SOL#",
  LA = "LA",
  LA_SOSTENIDO = "LA#",
  SI = "SI",
}

// eslint-disable-next-line no-shadow
export enum ChordDecorationEnum {
  MENOR = "m",
  SUS = "sus",
  SIENTE = "7",
  NUEVE = "9",
  SUS4 = "sus4",
  SUS2 = "sus2",
}

export interface ChorInterface {
  beginning: number;
  end: number;
  type: ChordsEnum;
  decoration?: ChordDecorationEnum[];
}

export interface AuthorInterface {
  id: string;
  name: string;
  lastName: string;
}

export interface AuthorTypeInterface {
  id: string;
  type: string;
}

export interface AuthorItemInterface {
  author: AuthorInterface;
  authorType: AuthorTypeInterface;
}

export interface SongThemeInterface {
  id: string;
  name: string;
}

export interface LineInterface {
  id?: string;
  lineNumber: number;
  letter: string;
  chords: ChorInterface[];
}

export interface VerseInterface {
  id?: string;
  type: string;
  title: string;
  lines: LineInterface[];
}

export interface VerseOrderInterface {
  verseTitle: string;
  order: number;
}

export interface SongInterface {
  id: string;
  title: string;
  subtitles: string[];
  basedOn: string[];
  songBooks: SongBookItemInterface[];
  authors: AuthorItemInterface[];
  songTheme: string[];
  capo: number;
  baseChord?: ChorInterface;
  musicURL: string;
  verses: VerseInterface[];
  lyricsVerseOrder: VerseOrderInterface[];
  presenterVerseOrder: VerseOrderInterface[];
  chordsVerseOrder: VerseOrderInterface[];
  version: number;
  active: boolean;
  approved: boolean;
}

export interface SliceSchema {
  slideNumber: number;
  lines: LineInterface[];
}
