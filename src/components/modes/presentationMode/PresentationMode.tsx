import { useState, useEffect } from "react";
import { Box, Button, Grid, styled } from "@mui/material";
import { useDispatch, useSelector } from "../../../hooks/useRedux";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Replay as ReplayIcon,
} from "@mui/icons-material";
import {
  alignTextSelector,
  currentIdxSelector,
  goToSlide,
  nextSlide,
  prevSlide,
  selectedSongSelector,
  slidesSelector,
} from "../../../store/slices/selectedSongSlice";
import {
  selectedSongBookSelector,
  textSizeSelector,
} from "../../../store/slices/generalConfigSlice";

type StyledDotProps = {
  selected: boolean;
};

const StyledDot = styled("button")<StyledDotProps>(({ selected }) => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  position: "relative",
  padding: 0,
  border: 0,
  backgroundColor: "#395479",
  width: selected ? "1rem" : "2rem",
  marginRight: selected ? "0.75rem" : "0.5rem",
  marginLeft: selected ? "0.75rem" : "0.5rem",
  marginTop: "5px",
  height: "0.5rem",
}));

const PresentationMode = () => {
  const selectedSong = useSelector(selectedSongSelector);
  const selectedSongBook = useSelector(selectedSongBookSelector);
  const slides = useSelector(slidesSelector);
  const currentIdx = useSelector(currentIdxSelector);
  const alignText = useSelector(alignTextSelector);
  const textSize = useSelector(textSizeSelector);
  const dispatch = useDispatch();
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

  if (selectedSong && slides)
    return (
      <>
        <Grid container spacing={0} direction="row" alignItems="stretch">
          <Grid item md={1}>
            <Button
              sx={{ height: "100%" }}
              onClick={() => dispatch(prevSlide())}
              size="large"
            >
              {currentIdx > 0 && <ChevronLeftIcon />}
            </Button>
          </Grid>
          <Grid item xs md={10}>
            <Box
              sx={{
                display: "flex",
                fontSize: 40 + textSize,
                textAlign: "center",
                flexDirection: "column",
                margin: 3,
                justifyContent: "center",
                alignItems: alignText,
                height: "69vh",
              }}
            >
              {slides[currentIdx] &&
                slides[currentIdx].Lines.map((item) => {
                  return (
                    <div
                      key={`${item.Letter.substring(0, 5)} - ${
                        item.LineNumber
                      }`}
                    >
                      {item.Letter}
                    </div>
                  );
                })}
            </Box>
            <Grid
              container
              spacing={0}
              direction="row"
              alignItems="stretch"
              justifyContent="center"
            >
              <Grid item xs zeroMinWidth>
                <div
                  style={{
                    fontFamily: "Cochin",
                    fontSize: 30,
                    textAlign: "left",
                    color: "#57585b",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    lineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {songBookNumber} {selectedSong.Title}
                  <br />
                </div>
              </Grid>
              <Grid item xs={6} zeroMinWidth>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    marginTop: "1rem",
                  }}
                >
                  {slides?.map((slide, idx) => {
                    return (
                      <StyledDot
                        key={slide.SlideNumber}
                        selected={idx === currentIdx}
                        onClick={() => dispatch(goToSlide(idx))}
                      />
                    );
                  })}
                </div>
              </Grid>
              <Grid item xs zeroMinWidth></Grid>
            </Grid>
          </Grid>
          <Grid item md={1}>
            <Button
              sx={{ height: "100%" }}
              onClick={() => dispatch(nextSlide())}
              size="large"
            >
              {currentIdx < (slides?.length || 1) - 1 ? (
                <ChevronRightIcon />
              ) : (
                <ReplayIcon />
              )}
            </Button>
          </Grid>
        </Grid>
      </>
    );
  else return <div />;
};

export default PresentationMode;
