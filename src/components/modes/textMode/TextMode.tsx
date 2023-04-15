import { useState, useEffect } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useSelector } from "../../../hooks/useRedux";
import { selectedSongSelector } from "../../../store/slices/selectedSongSlice";
import { selectedSongBookSelector } from "../../../store/slices/generalConfigSlice";

const TextMode = () => {
  const selectedSong = useSelector(selectedSongSelector);
  const selectedSongBook = useSelector(selectedSongBookSelector);
  const [songBookNumber, setSongBookNumber] = useState<string>("");

  useEffect(() => {
    if (selectedSong) {
      const selectedSongBookNumber = selectedSong.SongBooks.find(
        (songBook) => songBook.BookName === selectedSongBook
      );
      if (selectedSongBookNumber?.Number) {
        setSongBookNumber(selectedSongBookNumber?.Number);
      }
    } else {
      setSongBookNumber("");
    }
  }, [selectedSong, selectedSongBook]);

  if (selectedSong)
    return (
      <Box>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" align="center">
            {songBookNumber} - {selectedSong.Title}
          </Typography>
          <div
            style={{
              fontFamily: "Cochin",
              fontSize: 13,
              textAlign: "right",
              color: "#57585b",
            }}
          >
            {selectedSong.Authors.map((author) => (
              <li key={author.Author}>{author.Author}</li>
            ))}
          </div>
          <br />
          {selectedSong.Verses.map((verse) => {
            if (!verse.OnlyPresenter)
              return (
                <Typography
                  key={verse.Type}
                  noWrap
                  component="div"
                  textAlign="left"
                >
                  <br />
                  {verse.Type.includes("E") && (
                    <span style={{ fontWeight: "bold" }}>Estribillo</span>
                  )}
                  {verse.Type.includes("F") && (
                    <span style={{ fontWeight: "bold" }}>Final</span>
                  )}
                  {verse.Lines.map((line) => (
                    <div key={line.LineNumber}>{line.Letter}</div>
                  ))}
                </Typography>
              );
          })}
        </Paper>
      </Box>
    );
  else return <div />;
};

export default TextMode;
