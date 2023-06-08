import { FC, ReactNode } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "../navbar/NavBar";
import { useSelector } from "../../hooks/useRedux";
import MusicControl from "../music/MusicControl";
import { showAudioControlSelector } from "../../store/slices/musicSlice";
import { CircularProgress } from "@mui/material";

interface BasicLayoutProps {
  children: ReactNode;
  loading?: boolean;
}

type StyledMainProps = {
  musicPlayer: boolean;
};

const Main = styled("main")<StyledMainProps>(({ musicPlayer, theme }) => ({
  width: "100vw",
  height: "100vh",
  flexGrow: 1,
  paddingBottom: theme.spacing(12),
  paddingTop: theme.spacing(8),
  marginBottom: musicPlayer ? theme.spacing(25) : 0,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const BasicLayout: FC<BasicLayoutProps> = ({ children, loading = true }) => {
  const showAudioControl = useSelector(showAudioControlSelector);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <CssBaseline />
      <NavBar />
      {loading ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            color: "#395479",
          }}
        >
          <CircularProgress />
          Se estan cargando las canciones...
        </div>
      ) : (
        <>
          <Main musicPlayer={showAudioControl}>{children}</Main>
          {showAudioControl && <MusicControl />}
        </>
      )}
    </Box>
  );
};

export default BasicLayout;
