import { SongSchema } from "../types/SongTypes";
import { TApiResponse, get } from "./api";

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const SERVER_URL: string = import.meta.env.VITE_CANTORAL_SERVER_URL as string;

export const fetchAllSongs = () =>
  get<TApiResponse<SongSchema[]>>(`${SERVER_URL}/v1/song`);
