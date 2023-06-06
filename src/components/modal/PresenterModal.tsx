import { ReactElement } from "react";
import { Button, Grid, Paper, Stack } from "@mui/material";
import VerticalAlignTopIcon from "@mui/icons-material/VerticalAlignTop";
import VerticalAlignCenterIcon from "@mui/icons-material/VerticalAlignCenter";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import TextIncreaseIcon from "@mui/icons-material/TextIncrease";
import TextDecreaseIcon from "@mui/icons-material/TextDecrease";
import { useDispatch, useSelector } from "../../hooks/useRedux";
import {
  setLessTextSize,
  setMoreTextSize,
} from "../../store/slices/generalConfigSlice";
import PresentationMode from "../modes/presentationMode/PresentationMode";
import {
  currentIdxSelector,
  goToSlide,
  setAlignTextCenter,
  setAlignTextEnd,
  setAlignTextStart,
  slidesSelector,
} from "../../store/slices/selectedSongSlice";
import AutocompleteSong from "../formInputs/AutocompleteSong";

interface menuButtonsInterface {
  id: number;
  icon: ReactElement;
  onClick: () => void;
}

const PresenterModal = () => {
  const dispatch = useDispatch();
  const slides = useSelector(slidesSelector);
  const currentIdx = useSelector(currentIdxSelector);

  const menuButtons: menuButtonsInterface[] = [
    {
      id: 1,
      icon: <VerticalAlignTopIcon />,
      onClick: () => dispatch(setAlignTextStart()),
    },
    {
      id: 2,
      icon: <VerticalAlignCenterIcon />,
      onClick: () => dispatch(setAlignTextCenter()),
    },
    {
      id: 3,
      icon: <VerticalAlignBottomIcon />,
      onClick: () => dispatch(setAlignTextEnd()),
    },
    {
      id: 4,
      icon: <TextIncreaseIcon />,
      onClick: () => dispatch(setMoreTextSize()),
    },
    {
      id: 5,
      icon: <TextDecreaseIcon />,
      onClick: () => dispatch(setLessTextSize()),
    },
  ];

  return (
    <Stack style={{ backgroundColor: "#828281" }}>
      <Grid container spacing={2} style={{ padding: "15px" }}>
        {menuButtons.map((button) => (
          <Grid item key={button.id}>
            <Button
              onClick={button.onClick}
              style={{ backgroundColor: "white" }}
            >
              {button.icon}
            </Button>
          </Grid>
        ))}
        <Grid item>
          <AutocompleteSong />
        </Grid>
      </Grid>
      <div style={{ maxWidth: "1300px" }}>
        <PresentationMode />
      </div>
      <Grid
        container
        spacing={2}
        style={{ height: "25%", overflowX: "scroll", padding: "15px" }}
        wrap="nowrap"
      >
        {slides
          ? slides.map((slide, index) => (
              <Grid
                item
                key={slide.slideNumber}
                onClick={() => dispatch(goToSlide(index))}
              >
                <Paper
                  style={{
                    minWidth: "300px",
                    height: "100%",
                    fontSize: "0.75rem",
                    textAlign: "center",
                    cursor: "pointer",
                    border:
                      index === currentIdx
                        ? "1px solid black"
                        : "2px solid black",
                    margin: "5px",
                    backgroundColor:
                      index === currentIdx ? "cornsilk" : "white",
                  }}
                  elevation={index === currentIdx ? 5 : 0}
                >
                  {slide.lines.map((item) => {
                    return <div key={item.lineNumber}>{item.letter}</div>;
                  })}
                </Paper>
              </Grid>
            ))
          : null}
      </Grid>
    </Stack>
  );
};

export default PresenterModal;
