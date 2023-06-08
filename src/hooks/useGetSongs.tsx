import { useEffect, useState } from "react";
import { data_idb } from "../store/idb";
import { fetchAllSongs } from "../services/songServices";
import { SongInterface } from "../types/SongTypes";
import { useDispatch } from "./useRedux";
import { SearchInterface } from "../types/SearchTypes";
import { setSearchText } from "../store/slices/generalConfigSlice";

function useGetSongs() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<SongInterface[] | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const db = await data_idb;
      const songCount = await db.count("songs");
      if (songCount > 0) {
        setLoading(false);
      } else {
        const dataResponse = await fetchAllSongs();
        if (dataResponse.status === 1 && dataResponse?.data?.length > 0) {
          const tx = db.transaction(["songs"], "readwrite");
          dataResponse.data.forEach((song) => {
            void tx.objectStore("songs").add(song);
          });
          tx.oncomplete = function () {
            setLoading(false);
          };
        } else {
          setError(
            dataResponse?.data?.length === 0
              ? "No se encontraron canciones"
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
      const songArray = await db.getAll("songs");
      setData(songArray);
      const searchSongArray: SearchInterface[] = songArray.map((song) => {
        const songText = song.verses
          .map((verse) => {
            return verse.lines
              .map((line) => line.letter)
              .join(" ")
              .toUpperCase()
              .replace(/_/g, " ")
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/[^a-zA-Z0-9 ]/g, "");
          })
          .join(" ");
        const subTitleText = song.subtitles
          .concat(song.basedOn)
          .join(" ")
          .toUpperCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-zA-Z0-9 ]/g, "");
        return {
          id: song.id,
          title: song.title
            .toUpperCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-zA-Z0-9 ]/g, ""),
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

  return { data, loading, error };
}

export default useGetSongs;
