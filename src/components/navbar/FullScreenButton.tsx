import { useState } from "react";
import { IconButton } from "@mui/material";
import {
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
} from "@mui/icons-material";
import { closeFullscreen, openFullscreen } from "../../utils/fullScreen";

const FullScreenButton = () => {
  const [onFullScreen, setOnFullScreen] = useState(false);

  const handleSetFullScreen = () => {
    setOnFullScreen(true);
    openFullscreen();
  };

  const handleRemoveFullScreen = () => {
    setOnFullScreen(false);
    closeFullscreen();
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="toogle fullscreen"
        aria-controls="toogle-fullscreen"
        aria-haspopup="false"
        color="inherit"
        sx={[
          {
            "&:focus": {
              outline: "none",
            },
          },
        ]}
        onClick={onFullScreen ? handleRemoveFullScreen : handleSetFullScreen}
      >
        {onFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </IconButton>
    </>
  );
};

export default FullScreenButton;
