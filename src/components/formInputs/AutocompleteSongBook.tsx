import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "../../hooks/useRedux";
import {
  selectedSongBookSelector,
  setSelectedSongBook,
} from "../../store/slices/generalConfigSlice";
import { FC, SyntheticEvent, useState } from "react";

export interface autoCompleteSongBookProps {
  onSelectedSong?: (arg0: string) => void;
}

const AutocompleteSongBook: FC<autoCompleteSongBookProps> = ({
  onSelectedSong,
  ...props
}) => {
  const dispatch = useDispatch();
  const selectedSongBook = useSelector(selectedSongBookSelector);
  const initialValue: {
    id: string;
    label: string;
  } =
    songBooks.find((option) => option.id === selectedSongBook) || songBooks[0];
  const [value, setValue] = useState<{
    id: string;
    label: string;
  }>(initialValue);

  const handleSelectSongBook = (
    event: SyntheticEvent<Element, Event>,
    value: {
      id: string;
      label: string;
    } | null
  ) => {
    if (value) {
      dispatch(setSelectedSongBook(value.id));
      setValue(value);
      onSelectedSong ? onSelectedSong(value.id) : null;
    }
  };
  return (
    <Autocomplete
      id="autocomplete-songbook"
      autoSelect
      fullWidth
      disableClearable
      forcePopupIcon={false}
      options={songBooks}
      renderInput={(params) => <TextField {...params} />}
      onChange={handleSelectSongBook}
      value={value}
      {...props}
    />
  );
};

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const songBooks = [
  { id: "2009", label: "2009" },
  { id: "2016", label: "2016" },
  { id: "2023", label: "2023" },
];

export default AutocompleteSongBook;
