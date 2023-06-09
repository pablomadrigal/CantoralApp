import { SongInterface } from '../types/SongTypes';
import { TApiResponse, get } from './api';
interface SongVersionInterface {
  id: string;
  version: number;
}

const SERVER_URL: string = import.meta.env.VITE_CANTORAL_SERVER_URL as string;

export const fetchAllSongs = () =>
  get<TApiResponse<SongInterface[]>>(`${SERVER_URL}/v1/song`);

export const fetchSongById = (id: string) =>
  get<TApiResponse<SongInterface>>(`${SERVER_URL}/v1/song/${id}`);

export const fetchAllSongsVersions = () =>
  get<TApiResponse<SongVersionInterface[]>>(`${SERVER_URL}/v1/song/version`);
