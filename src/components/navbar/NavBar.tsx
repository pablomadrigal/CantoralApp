import { AppBar, IconButton, Toolbar } from "@mui/material";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import ModeMenu from "../menus/ModeMenu";
import FullScreenButton from "./FullScreenButton";
import SettingsMenu from "../menus/SettingsMenu";
import LetterSizeMenu from "../menus/LetterSizeMenu";
import {
  cantoralModeSelector,
  setShowPresenterModal,
} from "../../store/slices/generalConfigSlice";
import { useDispatch, useSelector } from "../../hooks/useRedux";
import { CantoralModeConstants } from "../../constants/SettingsConstants";
import SearchSongButton from "./SearchSongButton";
import MusicButton from "../music/MusicButton";

const NavBar = () => {
  const dispatch = useDispatch();
  const cantoralMode = useSelector(cantoralModeSelector);

  return (
    <AppBar position="fixed" style={{ backgroundColor: "#395479" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        Cantoral App
        <div style={{ display: "flex" }}>
          <SearchSongButton />
          {cantoralMode === CantoralModeConstants.PRESENTATION && (
            <LetterSizeMenu />
          )}
          {cantoralMode === CantoralModeConstants.PRESENTATION && (
            <IconButton
              size="large"
              aria-label="menu for changing mode"
              aria-controls="menu-mode-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={() => dispatch(setShowPresenterModal())}
              sx={[{ "&:focus": { outline: "none" } }]}
            >
              <CoPresentIcon />
            </IconButton>
          )}
          <ModeMenu />
          <MusicButton />
          <FullScreenButton />
          <SettingsMenu />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
