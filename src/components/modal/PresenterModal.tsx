import { ReactElement } from 'react';
import { Button, Grid, Paper, Stack } from '@mui/material';
import {
  VerticalAlignTop as VerticalAlignTopIcon,
  VerticalAlignCenter as VerticalAlignCenterIcon,
  VerticalAlignBottom as VerticalAlignBottomIcon,
  TextIncrease as TextIncreaseIcon,
  TextDecrease as TextDecreaseIcon,
  DesktopAccessDisabled as DesktopAccessDisabledIcon,
  DesktopMac as DesktopMacIcon,
  Monitor as MonitorIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from '../../hooks/useRedux';
import {
  screenModeSelector,
  setBlackMode,
  setLessTextSize,
  setMoreTextSize,
  setNormalMode,
  setWhiteMode,
} from '../../store/slices/generalConfigSlice';
import PresentationMode from '../modes/presentationMode/PresentationMode';
import {
  currentIdxSelector,
  goToSlide,
  setAlignTextCenter,
  setAlignTextEnd,
  setAlignTextStart,
  slidesSelector,
} from '../../store/slices/selectedSongSlice';
import AutocompleteSong from '../formInputs/AutocompleteSong';
import { ScreenModeConstants } from '../../constants/SettingsConstants';

interface menuButtonsInterface {
  id: number;
  icon: ReactElement;
  onClick: () => void;
}

const PresenterModal = () => {
  const dispatch = useDispatch();
  const slides = useSelector(slidesSelector);
  const currentIdx = useSelector(currentIdxSelector);
  const screenMode = useSelector(screenModeSelector);

  const setScreen = (white: boolean) => {
    if (screenMode === ScreenModeConstants.NORMAL) {
      if (white) {
        dispatch(setWhiteMode());
      } else {
        dispatch(setBlackMode());
      }
    } else {
      dispatch(setNormalMode());
    }
  };

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
    {
      id: 6,
      icon:
        screenMode === ScreenModeConstants.NORMAL ? (
          <DesktopAccessDisabledIcon />
        ) : (
          <MonitorIcon />
        ),
      onClick: () => setScreen(true),
    },
    {
      id: 7,
      icon:
        screenMode === ScreenModeConstants.NORMAL ? (
          <DesktopMacIcon />
        ) : (
          <MonitorIcon />
        ),
      onClick: () => setScreen(false),
    },
  ];

  return (
    <Stack style={{ backgroundColor: '#828281' }}>
      <Grid container spacing={2} style={{ padding: '15px' }}>
        {menuButtons.map((button) => (
          <Grid item key={button.id}>
            <Button
              onClick={button.onClick}
              style={{ backgroundColor: 'white' }}
            >
              {button.icon}
            </Button>
          </Grid>
        ))}
        <Grid item>
          <AutocompleteSong />
        </Grid>
      </Grid>
      <div
        style={{
          maxWidth: '1300px',
          backgroundColor: 'white',
          marginLeft: '15px',
          marginRight: '15px',
        }}
      >
        <PresentationMode isPresenter />
      </div>
      <Grid
        container
        spacing={2}
        style={{
          height: '25%',
          maxWidth: '1300px',
          overflowX: 'scroll',
          padding: '15px',
          marginLeft: '15px',
          marginRight: '15px',
        }}
        wrap="nowrap"
      >
        {slides
          ? slides.map((slide, index) => (
              <Grid
                item
                key={slide.verseNumber}
                onClick={() => dispatch(goToSlide(index))}
              >
                <Paper
                  style={{
                    minWidth: '300px',
                    height: '100%',
                    fontSize: '0.75rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    border:
                      index === currentIdx
                        ? '1px solid black'
                        : '2px solid black',
                    margin: '5px',
                    backgroundColor:
                      index === currentIdx ? 'cornsilk' : 'white',
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
