import { AppBar, Box, Fab, IconButton, Toolbar, styled } from "@mui/material";

import {
  Menu as MenuIcon,
  PlayArrow as PlayArrowIcon,
  Search as SearchIcon,
  MoreVert as MoreIcon,
} from "@mui/icons-material";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 2,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
  backgroundColor: "#395479",
  color: "white",
});

const StyledFabClose = styled(Fab)(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(5),
  right: theme.spacing(3),
  backgroundColor: "#dddddd",
  color: "black",
  zIndex: 0,
  "&:focus": {
    outline: "none",
  },
}));

const MusicPlayer = () => {
  return (
    <div>
      <StyledFabClose aria-label="close" size="small">
        x
      </StyledFabClose>
      <AppBar
        position="fixed"
        sx={{ top: "auto", bottom: 0, backgroundColor: "#dddddd" }}
      >
        <Toolbar sx={{ zIndex: 1 }}>
          <IconButton color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          <StyledFab aria-label="add">
            <PlayArrowIcon />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MusicPlayer;
