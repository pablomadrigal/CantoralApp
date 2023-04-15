export interface SongSchema {
  Title: string;
  Subtitles: string[];
  BasedOn: string[];
  SongBooks: SongBookSchema[];
  Authors: AuthorSchema[];
  VerseOrder: string[];
  SongTheme: string[];
  ChoresIntro: ChorSchema[];
  Verses: VerseSchema[];
  MusicURL?: string;
  _id: string;
}

export interface SongBookSchema {
  BookName: string;
  Number: string;
}

interface AuthorSchema {
  Author: string;
  Type: string;
}

interface ChorSchema {
  Beginning: number;
  End: number;
  Type: string;
}

export interface LineSchema {
  LineNumber: number;
  Letter: string;
  Chores: ChorSchema[];
}

export interface VerseSchema {
  Type: string;
  OnlyPresenter?: boolean;
  Lines: LineSchema[];
}

export interface SliceSchema {
  SlideNumber: number;
  Lines: LineSchema[];
}
