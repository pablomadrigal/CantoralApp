import { useState, useEffect, useRef, SyntheticEvent } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Headset as HeadsetIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "../../hooks/useRedux";
import {
  hideAudioControl,
  musicURLSelector,
  playMusicSelector,
  seekTimeSelector,
  setCurrentTime,
  setDuration,
  toggleAudioControl,
  volumeSelector,
} from "../../store/slices/musicSlice";

const MusicButton = () => {
  const [error, setError] = useState(true);
  const dispatch = useDispatch();
  const musicURL = useSelector(musicURLSelector);
  const audioElement = useRef<HTMLAudioElement>(null);
  const playMusic = useSelector(playMusicSelector);
  const seekTime = useSelector(seekTimeSelector);
  const volume = useSelector(volumeSelector);

  useEffect(() => {
    if (audioElement.current) {
      if (playMusic) {
        void audioElement.current.play();
      } else {
        audioElement.current.pause();
      }
    }
  }, [playMusic]);

  useEffect(() => {
    if (audioElement.current) {
      audioElement.current.currentTime = seekTime;
    }
  }, [seekTime]);

  useEffect(() => {
    if (audioElement.current) {
      audioElement.current.volume = volume / 100;
    }
  }, [volume]);

  const onEventListener = (event: SyntheticEvent<HTMLAudioElement>) => {
    if (event.type === "error") {
      setError(true);
      dispatch(hideAudioControl());
    } else {
      setError(false);
      if (event.type === "loadeddata" && audioElement.current) {
        dispatch(setDuration(audioElement.current.duration));
      }
      if (event.type === "timeupdate" && audioElement.current)
        dispatch(setCurrentTime(audioElement.current.currentTime));
    }
  };

  return (
    <>
      <Tooltip title={error ? "No hay audio disponible" : "Reproducir musica"}>
        <span>
          <IconButton
            size="large"
            aria-label="toogle music"
            color="inherit"
            onClick={() => {
              dispatch(toggleAudioControl());
            }}
            sx={[{ "&:focus": { outline: "none" } }]}
            disabled={error}
          >
            <HeadsetIcon />
          </IconButton>
        </span>
      </Tooltip>
      <audio
        ref={audioElement}
        src={musicURL || ""}
        onLoadedData={onEventListener}
        onError={onEventListener}
        onTimeUpdate={onEventListener}
      >
        Your browser does not support the
        <code>audio</code> element.
      </audio>
    </>
  );
};

export default MusicButton;
