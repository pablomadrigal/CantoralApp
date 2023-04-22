import { FC, ReactNode } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "../navbar/NavBar";
import { useSelector } from "../../hooks/useRedux";
import MusicControl from "../music/MusicControl";
import { showAudioControlSelector } from "../../store/slices/musicSlice";

interface BasicLayoutProps {
  children: ReactNode;
}

type StyledMainProps = {
  musicPlayer: boolean;
};

const Main = styled("main")<StyledMainProps>(({ musicPlayer, theme }) => ({
  flexGrow: 1,
  paddingBottom: musicPlayer ? theme.spacing(12) : theme.spacing(5),
  paddingTop: theme.spacing(10),
  paddingLeft: theme.spacing(10),
  paddingRight: theme.spacing(10),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const BasicLayout: FC<BasicLayoutProps> = ({ children }) => {
  const showAudioControl = useSelector(showAudioControlSelector);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <CssBaseline />
      <NavBar />
      <Main musicPlayer={showAudioControl}>{children}</Main>
      {showAudioControl && <MusicControl />}
    </Box>
  );
};

export default BasicLayout;
