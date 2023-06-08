import { useState, useRef, SyntheticEvent } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Headset as HeadsetIcon } from "@mui/icons-material";

export interface MusicPlayerProps {
  url?: string;
}
const MusicPlayer = ({ url }: MusicPlayerProps) => {
  const audioElement = useRef<HTMLAudioElement>(null);
  const [error, setError] = useState(true);

  const tooglePlay = () => {
    if (audioElement.current) {
      if (audioElement.current.paused) {
        void audioElement.current.play();
      } else {
        audioElement.current.pause();
      }
    }
  };

  const onEventListener = (event: SyntheticEvent<HTMLAudioElement>) => {
    if (event.type === "error") {
      setError(true);
    } else {
      setError(false);
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
            onClick={tooglePlay}
            sx={[{ "&:focus": { outline: "none" } }]}
            disabled={error}
          >
            <HeadsetIcon />
          </IconButton>
        </span>
      </Tooltip>
      <audio
        ref={audioElement}
        src={url}
        onLoadedData={onEventListener}
        onError={onEventListener}
      >
        Your browser does not support the
        <code>audio</code> element.
      </audio>
      {audioElement.current?.duration}
    </>
  );
};

export default MusicPlayer;
