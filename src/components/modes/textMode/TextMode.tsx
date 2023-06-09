import { useState, useEffect } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useSelector } from '../../../hooks/useRedux';
import {
  choresVersesSelector,
  lyricsSelector,
  selectedSongSelector,
} from '../../../store/slices/selectedSongSlice';
import {
  cantoralModeSelector,
  selectedSongBookSelector,
} from '../../../store/slices/generalConfigSlice';
import { cantoralToHTML } from '../../../utils/parserUtils';
import { CantoralModeConstants } from '../../../constants/SettingsConstants';
import ChordsControl from '../../chordsControl/ChordsControl';
import './ChordView.css';
import TextVerse from '../../verses/TextVerse';

const TextMode = () => {
  const selectedSong = useSelector(selectedSongSelector);
  const lyrics = useSelector(lyricsSelector);
  const choresVerses = useSelector(choresVersesSelector);
  const selectedSongBook = useSelector(selectedSongBookSelector);
  const [songBookNumber, setSongBookNumber] = useState<string>('');
  const [currentTono, setCurrentTono] = useState(
    selectedSong?.baseChord?.type ?? 'DO'
  );
  const [currentCapo, setCurrentCapo] = useState(selectedSong?.capo ?? 0);
  const cantoralMode = useSelector(cantoralModeSelector);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedSong]);

  useEffect(() => {
    if (selectedSong) {
      const selectedSongBookNumber = selectedSong.songBooks.find(
        (songBook) => songBook.songBook.name === selectedSongBook
      );
      setSongBookNumber(selectedSongBookNumber?.number ?? '');
    } else {
      setSongBookNumber('');
    }
  }, [selectedSong, selectedSongBook]);

  const handleChange = (capo: number, tono: string) => {
    setCurrentTono(tono);
    setCurrentCapo(capo);
  };

  const chordsActivated = cantoralMode === CantoralModeConstants.CHORDS;

  if (selectedSong)
    return (
      <>
        {chordsActivated && (
          <ChordsControl
            capo={selectedSong.capo}
            tono={selectedSong.baseChord?.type ?? 'DO'}
            onchange={handleChange}
          />
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: chordsActivated ? 10 : 0,
          }}
        >
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" align="center" sx={{ mb: 3 }}>
              {songBookNumber && `${songBookNumber} - `} {selectedSong.title}
            </Typography>
            <div
              style={{
                fontFamily: 'Cochin',
                fontSize: 15,
                textAlign: 'right',
                color: '#57585b',
                fontStyle: 'italic',
              }}
            >
              {selectedSong.authors.map((author) => (
                <div key={author.author.id}>
                  {author.author.name} {author.author.lastName}
                </div>
              ))}
            </div>
            <br />
            {chordsActivated
              ? choresVerses?.map((verse) => {
                  const html = cantoralToHTML({
                    song: verse.lines,
                    capoBase: selectedSong?.capo,
                    tonoBaseCancion: selectedSong?.baseChord?.type ?? 'DO',
                    currentTono,
                    currentCapo,
                  });
                  return (
                    <TextVerse key={verse.id} type={verse.type}>
                      <div
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{ __html: html }}
                      />
                    </TextVerse>
                  );
                })
              : lyrics?.map((verse) => (
                  <TextVerse key={verse.id} type={verse.type}>
                    {verse.lines.map((line) => (
                      <div key={line.lineNumber}>{line.letter}</div>
                    ))}
                  </TextVerse>
                ))}
          </Paper>
        </Box>
      </>
    );
  else return <div />;
};

export default TextMode;
