import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import {
  TextFields as TextFieldsIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  RemoveCircleOutline as RemoveCircleOutlineIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { useDispatch, useSelector } from "../../hooks/useRedux";
import {
  setMoreTextSize,
  setLessTextSize,
  textSizeSelector,
} from "../../store/slices/generalConfigSlice";

const LetterSizeMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const textSize = useSelector(textSizeSelector);

  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLessSize = () => {
    if (textSize > -10) {
      dispatch(setLessTextSize());
    }
    setAnchorEl(null);
  };

  const handleMoreSize = () => {
    if (textSize < 20) {
      dispatch(setMoreTextSize());
    }
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Cambiar tamaño de letra">
        <span>
          <IconButton
            size="large"
            aria-label="menu for changing mode"
            aria-controls="menu-mode-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={handleClick}
            sx={[{ "&:focus": { outline: "none" } }]}
          >
            <TextFieldsIcon />
          </IconButton>
        </span>
      </Tooltip>

      <Menu
        id="menu-mode"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleMoreSize}>
          <AddCircleOutlineIcon /> Aumentar
        </MenuItem>
        <MenuItem onClick={handleLessSize}>
          <RemoveCircleOutlineIcon /> Disminuir
        </MenuItem>
      </Menu>
    </>
  );
};

export default LetterSizeMenu;
