import { AppBar, Toolbar } from "@mui/material";
import ModeMenu from "../menus/ModeMenu";
import FullScreenButton from "./FullScreenButton";
import SettingsMenu from "../menus/SettingsMenu";
import LetterSizeMenu from "../menus/LetterSizeMenu";
import { cantoralModeSelector } from "../../store/slices/generalConfigSlice";
import { useSelector } from "../../hooks/useRedux";
import CantoralModeConstants from "../../constants/SettingsConstants";
import SearchSongButton from "./SearchSongButton";
import MusicButton from "../music/MusicButton";

const NavBar = () => {
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
