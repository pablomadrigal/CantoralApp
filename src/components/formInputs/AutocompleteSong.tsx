/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/display-name */
import {
  Box,
  TextField,
  Autocomplete,
  createFilterOptions,
  Stack,
  styled,
} from "@mui/material";
import { SearchSchema } from "../../types/SearchTypes";
import { useDispatch, useSelector } from "../../hooks/useRedux";
import {
  searchTextSelector,
  selectedSongBookSelector,
  setSelectedSongId,
} from "../../store/slices/generalConfigSlice";
import { SyntheticEvent, forwardRef } from "react";
import { data_idb } from "../../store/idb";
import { setSelectedSong } from "../../store/slices/selectedSongSlice";

export interface autoCompleteSongProps {
  onSelectedSong: (arg0: string) => void;
}

const StyledTextField = styled(TextField)(() => ({
  backgroundColor: "white",
}));

const AutocompleteSong = forwardRef<HTMLInputElement, autoCompleteSongProps>(
  ({ onSelectedSong, ...props }, ref) => {
    const searchText = useSelector(searchTextSelector);
    const selectedSongBook = useSelector(selectedSongBookSelector);
    const dispatch = useDispatch();

    const filterOptions = createFilterOptions({
      matchFrom: "any",
      stringify: (option: SearchSchema) => {
        const selectedSongBookNumber = option.songBook.find(
          (songBook) => songBook.BookName === selectedSongBook
        );
        if (selectedSongBookNumber?.Number)
          return `${selectedSongBookNumber?.Number} ${option.title} ${option.subTitle} ${option.text}`;
        else return option.title + option.subTitle + option.text;
      },
    });

    const handleSelectSong = (
      _event: SyntheticEvent<Element, Event>,
      value: SearchSchema | null
    ) => {
      if (value) {
        dispatch(setSelectedSongId(value._id));
        void data_idb.then((db) => {
          void db.get("songs", value._id).then((song) => {
            if (song) dispatch(setSelectedSong(song));
          });
        });
        onSelectedSong(value._id);
      }
    };

    return (
      <Autocomplete
        sx={{ width: 300 }}
        id="song-select"
        options={searchText || []}
        autoHighlight
        openOnFocus
        fullWidth
        filterOptions={filterOptions}
        onChange={handleSelectSong}
        getOptionLabel={(option) => {
          const selectedSongBookNumber = option.songBook.find(
            (songBook: { BookName: string }) =>
              songBook.BookName === selectedSongBook
          );
          if (selectedSongBookNumber?.Number)
            return `${selectedSongBookNumber?.Number} - ${option.title}`;
          else return option.title;
        }}
        renderOption={(props, option, { inputValue }) => {
          const searchValue = inputValue.toUpperCase();
          const selectedSongBookNumber = option.songBook.find(
            (songBook) => songBook.BookName === selectedSongBook
          );
          const indexSelectedInText = option.text.indexOf(searchValue);
          const textLength = searchValue.length < 24 ? searchValue.length : 24;
          return (
            <Box component="li" {...props}>
              <Stack>
                <div>
                  {selectedSongBookNumber &&
                    `${selectedSongBookNumber?.Number} -`}{" "}
                  {option.title}
                </div>
                {indexSelectedInText > -1 && !!inputValue && (
                  <div style={{ fontSize: "0.7rem" }}>
                    {indexSelectedInText > 10 && "..."}
                    {option.text.substring(
                      indexSelectedInText - 10,
                      indexSelectedInText - 1
                    )}
                    <span style={{ fontWeight: "bold" }}>
                      {option.text.substring(
                        indexSelectedInText - 1,
                        indexSelectedInText + textLength
                      )}
                    </span>
                    {option.text.substring(
                      indexSelectedInText + textLength,
                      indexSelectedInText + textLength + 10
                    )}
                    ...
                  </div>
                )}
              </Stack>
            </Box>
          );
        }}
        renderInput={(params) => (
          <StyledTextField
            {...params}
            size="small"
            placeholder="Escribir número, titulo o texto"
            inputRef={ref}
            inputProps={{
              ...params.inputProps,
            }}
          />
        )}
        {...props}
      />
    );
  }
);

export default AutocompleteSong;
