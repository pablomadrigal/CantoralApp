import { useEffect, useRef, useState } from "react";
import { IconButton } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import AutocompleteSong from "../formInputs/AutocompleteSong";

const SearchSongButton = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    setShowSearchBar(true);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (showSearchBar && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearchBar]);

  if (showSearchBar)
    return (
      <AutocompleteSong
        onSelectedSong={() => setShowSearchBar(false)}
        ref={inputRef}
      />
    );
  else
    return (
      <IconButton
        size="large"
        aria-label="toogle fullscreen"
        aria-controls="toogle-fullscreen"
        aria-haspopup="false"
        color="inherit"
        sx={[
          {
            "&:focus": {
              outline: "none",
            },
          },
        ]}
        onClick={handleButtonClick}
      >
        <SearchIcon />
      </IconButton>
    );
};

export default SearchSongButton;
