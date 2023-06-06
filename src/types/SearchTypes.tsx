import { SongBookItemInterface } from "./SongTypes";

export interface SearchInterface {
  id: string;
  title: string;
  subTitle: string;
  text: string;
  songBook: SongBookItemInterface[];
}
