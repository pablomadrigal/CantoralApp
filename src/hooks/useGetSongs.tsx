import { useEffect, useState } from 'react';
import { data_idb } from '../store/idb';
import {
  fetchAllSongs,
  fetchAllSongsVersions,
  fetchSongById,
} from '../services/songServices';
import { SongInterface } from '../types/SongTypes';
import { useDispatch, useSelector } from './useRedux';
import { SearchInterface } from '../types/SearchTypes';
import {
  searchTextSelector,
  setSearchText,
  setUpdatedDataFromServer,
  updatedDataFromServerSelector,
} from '../store/slices/generalConfigSlice';

function useGetSongs() {
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<SongInterface[] | null>(null);
  const updatedDataFromServer = useSelector(updatedDataFromServerSelector);
  const searchText = useSelector(searchTextSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const db = await data_idb;
      const songCount = await db.count('songs');
      if (songCount > 0) {
        setLoading(false);
      } else {
        const dataResponse = await fetchAllSongs();
        if (dataResponse.status === 1 && dataResponse?.data?.length > 0) {
          const tx = db.transaction(['songs'], 'readwrite');
          dataResponse.data.forEach((song) => {
            void tx.objectStore('songs').add(song);
          });
          tx.oncomplete = function () {
            setLoading(false);
          };
        } else {
          setError(
            dataResponse?.data?.length === 0
              ? 'No se encontraron canciones'
              : dataResponse?.message
          );
        }
      }
    };
    fetchData().catch((er) => setError(er as string));
  }, []);

  useEffect(() => {
    const getDataFromDB = async () => {
      const db = await data_idb;
      const songArray = await db.getAll('songs');
      setData(songArray);
      const searchSongArray: SearchInterface[] = songArray.map((song) => {
        const songText = song.verses
          .map((verse) => {
            return verse.lines
              .map((line) => line.letter)
              .join(' ')
              .toUpperCase()
              .replace(/_/g, ' ')
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/[^a-zA-Z0-9 ]/g, '');
          })
          .join(' ');
        const subTitleText = song.subtitles
          .concat(song.basedOn)
          .join(' ')
          .toUpperCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-zA-Z0-9 ]/g, '');
        return {
          id: song.id,
          title: song.title
            .toUpperCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9 ]/g, ''),
          subTitle: subTitleText,
          text: songText,
          songBook: song.songBooks,
        };
      });
      dispatch(setSearchText(searchSongArray));
    };
    if (!loading) {
      getDataFromDB().catch((er) => setError(er as string));
    }
  }, [loading]);

  useEffect(() => {
    const updateDataFromServer = async () => {
      const db = await data_idb;
      const songArray = await db.getAll('songs');
      const versionList = await fetchAllSongsVersions();
      const { data: onlineSongList } = versionList;
      const modifiedSongs = await Promise.all(
        onlineSongList
          .filter((onlineSong) => {
            const localSong = songArray.find(
              (song) => song.id === onlineSong.id
            );
            if (!localSong || localSong.version !== onlineSong.version) {
              return true;
            }
          })
          .map(async (onlineSong) => await fetchSongById(onlineSong.id))
      );
      const transaction = db.transaction(['songs'], 'readwrite');
      modifiedSongs.forEach((item) => {
        if (item.status === 1) {
          const { data } = item;
          void transaction.objectStore('songs').put(data);
        }
      });
      void transaction.done.then(() => {
        dispatch(setUpdatedDataFromServer(true));
      });
    };
    if (!updatedDataFromServer && !updating) {
      setUpdating(true);
      void updateDataFromServer();
    }
  }, [searchText, updatedDataFromServer]);

  return { data, loading, error };
}

export default useGetSongs;
