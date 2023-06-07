import { useState, useEffect } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useSelector } from "../../../hooks/useRedux";
import { selectedSongSelector } from "../../../store/slices/selectedSongSlice";
import { selectedSongBookSelector } from "../../../store/slices/generalConfigSlice";
import ChordsControl from "../../chordsControl/ChordsControl";
import { cantoralToHTML } from "../../../utils/parserUtils";
import "./ChordView.css";

const ChordsMode = () => {
  const selectedSong = useSelector(selectedSongSelector);
  const selectedSongBook = useSelector(selectedSongBookSelector);
  const [songBookNumber, setSongBookNumber] = useState<string>("");
  const [currentTono, setCurrentTono] = useState(
    selectedSong?.baseChord?.type ?? "DO"
  );
  const [currentCapo, setCurrentCapo] = useState(selectedSong?.capo || 0);

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

  const handleChange = (capo: number, tono: string) => {
    setCurrentTono(tono);
    setCurrentCapo(capo);
  };

  if (selectedSong)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <ChordsControl capo={5} tono="DO" onchange={handleChange} />
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
            const html = cantoralToHTML({
              song: verse.lines,
              capoBase: selectedSong?.capo,
              tonoBaseCancion: selectedSong?.baseChord?.type || "DO",
              currentTono,
              currentCapo,
            });
            return (
              <Typography key={verse.title} component="div" textAlign="left">
                <br />
                {verse.type.includes("E") && (
                  <span style={{ fontWeight: "bold" }}>Estribillo</span>
                )}
                {verse.type.includes("F") && (
                  <span style={{ fontWeight: "bold" }}>Final</span>
                )}
                <div
                  className="editor"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </Typography>
            );
          })}
        </Paper>
      </Box>
    );
  else return <div />;
};

export default ChordsMode;
