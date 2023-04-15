import { SongBookSchema } from "./SongTypes";

export interface SearchSchema {
  _id: string;
  title: string;
  subTitle: string;
  text: string;
  songBook: SongBookSchema[];
}
