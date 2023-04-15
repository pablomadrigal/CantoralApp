import { IconButton, Menu, MenuItem } from "@mui/material";
import { AutoAwesomeMosaic as AutoAwesomeMosaicIcon } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "../../hooks/useRedux";
import {
  setPresentationMode,
  setTextMode,
} from "../../store/slices/generalConfigSlice";

const ModeMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTextMode = () => {
    dispatch(setTextMode());
    setAnchorEl(null);
  };

  const handlePresentationMode = () => {
    dispatch(setPresentationMode());
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="menu for changing mode"
        aria-controls="menu-mode-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={handleClick}
        sx={[
          {
            "&:focus": {
              outline: "none",
            },
          },
        ]}
      >
        <AutoAwesomeMosaicIcon />
      </IconButton>
      <Menu
        id="menu-mode"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleTextMode}>Texto Completo</MenuItem>
        <MenuItem onClick={handlePresentationMode}>Presentación</MenuItem>
      </Menu>
    </>
  );
};

export default ModeMenu;
