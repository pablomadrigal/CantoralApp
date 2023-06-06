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
      const selectedSongBookNumber = selectedSong.songBooks.find(
        (songBook) => songBook.songBook.name === selectedSongBook
      );
      if (selectedSongBookNumber?.number) {
        setSongBookNumber(selectedSongBookNumber?.number);
      }
    } else {
      setSongBookNumber("");
    }
  }, [selectedSong, selectedSongBook]);

  if (selectedSong)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" align="center">
            {songBookNumber} - {selectedSong.title}
          </Typography>
          <div
            style={{
              fontFamily: "Cochin",
              fontSize: 13,
              textAlign: "right",
              color: "#57585b",
            }}
          >
            {selectedSong.authors.map((author) => (
              <li key={author.author.id}>
                {author.author.name} {author.author.lastName}
              </li>
            ))}
          </div>
          <br />
          {selectedSong.verses.map((verse) => {
            return (
              <Typography key={verse.title} component="div" textAlign="left">
                <br />
                {verse.type.includes("E") && (
                  <span style={{ fontWeight: "bold" }}>Estribillo</span>
                )}
                {verse.type.includes("F") && (
                  <span style={{ fontWeight: "bold" }}>Final</span>
                )}
                {verse.lines.map((line) => (
                  <div key={line.lineNumber}>{line.letter}</div>
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
