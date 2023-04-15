import { AppBar, IconButton, Toolbar } from "@mui/material";
import { Headset as HeadsetIcon } from "@mui/icons-material";
import ModeMenu from "../menus/ModeMenu";
import FullScreenButton from "./FullScreenButton";
import SettingsMenu from "../menus/SettingsMenu";
import LetterSizeMenu from "../menus/LetterSizeMenu";
import {
  cantoralModeSelector,
  toggleAudioControl,
} from "../../store/slices/generalConfigSlice";
import { useDispatch, useSelector } from "../../hooks/useRedux";
import CantoralModeConstants from "../../constants/SettingsConstants";
import SearchSongButton from "./SearchSongButton";

const NavBar = () => {
  const cantoralMode = useSelector(cantoralModeSelector);
  const dispatch = useDispatch();

  return (
    <AppBar position="fixed" style={{ backgroundColor: "#395479" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        Cantoral App
        <div style={{ display: "flex" }}>
          <SearchSongButton />
          {cantoralMode === CantoralModeConstants.PRESENTATION && (
            <LetterSizeMenu />
          )}
          <ModeMenu />
          <IconButton
            size="large"
            aria-label="toogle music"
            color="inherit"
            onClick={() => dispatch(toggleAudioControl())}
            sx={[{ "&:focus": { outline: "none" } }]}
          >
            <HeadsetIcon />
          </IconButton>
          <FullScreenButton />
          <SettingsMenu />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
