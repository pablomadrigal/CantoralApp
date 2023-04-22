import {
  AppBar,
  Fab,
  IconButton,
  Paper,
  Popover,
  Slider,
  Stack,
  Toolbar,
  styled,
} from "@mui/material";
import {
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  VolumeDown as VolumeDownIcon,
  VolumeUp as VolumeUpIcon,
  VolumeOff as VolumeOffIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "../../hooks/useRedux";
import {
  playMusicSelector,
  currentTimeSelector,
  durationSelector,
  volumeSelector,
  setSeekTime,
  setPlayPause,
  setVolume,
} from "../../store/slices/musicSlice";
import { useState } from "react";

const StyledFab = styled(Fab)({
  position: "absolute",
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
  backgroundColor: "#395479",
  "&:hover, &.Mui-focusVisible": {
    backgroundColor: "#2a3e59",
  },
  color: "white",
  "&:focus": { outline: "none" },
});

const StyledTimeLabel = styled("span")({
  marginRight: 20,
  marginLeft: 20,
  color: "#395479",
});

const StyledIconButton = styled(IconButton)({
  "&:focus": { outline: "none" },
});

const StyledSlider = styled(Slider)({
  color: "#395479",
  height: 4,
  "& .MuiSlider-thumb": {
    width: 12,
    height: 12,
    transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
    "&:before": {
      boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
    },
    "&:hover, &.Mui-focusVisible": {
      boxShadow: "0px 0px 0px 8px rgb(0 0 0 / 16%)",
    },
    "&.Mui-active": {
      width: 20,
      height: 20,
    },
  },
  "& .MuiSlider-rail": {
    opacity: 0.28,
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "rgb(57, 84, 121,  0.72)",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const formatTime = (time: number) => {
  if (!isNaN(time)) {
    return (
      `0${Math.floor(time / 60)}`.slice(-2) +
      ":" +
      `0${Math.floor(time % 60)}`.slice(-2)
    );
  }
};

const MusicControl = () => {
  const dispatch = useDispatch();
  const playMusic = useSelector(playMusicSelector);
  const currentTime = useSelector(currentTimeSelector);
  const duration = useSelector(durationSelector);
  const volume = useSelector(volumeSelector);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openVolume = Boolean(anchorEl);

  const ChangeSliderSeekTime = (event: Event, value: number | number[]) => {
    dispatch(setSeekTime(value as number));
  };

  const handleClickVolume = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseVolume = () => {
    setAnchorEl(null);
  };

  const handleChangeVolume = (event: Event, value: number | number[]) => {
    dispatch(setVolume(value as number));
  };

  return (
    <AppBar
      position="fixed"
      sx={{ top: "auto", bottom: 0, backgroundColor: "#dddddd" }}
    >
      <Toolbar>
        <StyledTimeLabel>{formatTime(currentTime)}</StyledTimeLabel>
        <StyledFab aria-label="add" onClick={() => dispatch(setPlayPause())}>
          {playMusic ? <PauseIcon /> : <PlayArrowIcon />}
        </StyledFab>
        <StyledSlider
          aria-label="custom thumb label"
          valueLabelDisplay="auto"
          max={duration}
          valueLabelFormat={formatTime}
          value={currentTime}
          onChange={ChangeSliderSeekTime}
        />
        <StyledTimeLabel>{formatTime(duration)}</StyledTimeLabel>
        <StyledIconButton onClick={handleClickVolume}>
          <VolumeDownIcon />
        </StyledIconButton>
        <Popover
          open={openVolume}
          anchorEl={anchorEl}
          onClose={handleCloseVolume}
        >
          <Paper>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <StyledIconButton onClick={() => dispatch(setVolume(100))}>
                <VolumeUpIcon />
              </StyledIconButton>
              <Slider
                aria-label="Volume"
                orientation="vertical"
                value={volume}
                onChange={handleChangeVolume}
                max={100}
                min={0}
                sx={{ height: 150 }}
              />
              <StyledIconButton onClick={() => dispatch(setVolume(0))}>
                <VolumeOffIcon />
              </StyledIconButton>
            </Stack>
          </Paper>
        </Popover>
      </Toolbar>
    </AppBar>
  );
};

export default MusicControl;
