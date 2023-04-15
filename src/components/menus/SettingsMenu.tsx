import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { SettingsApplications as SettingsApplicationsIcon } from "@mui/icons-material";
import { useState } from "react";
import AutocompleteSongBook from "../formInputs/AutocompleteSongBook";

const SettingsMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openInfo, setOpenInfo] = useState(false);
  const [openError, setOpenError] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  function openInNewTab(url: string) {
    const win = window.open(url, "_blank");
    if (win) win.focus();
  }

  function handleNuevaCancion() {
    openInNewTab("http://riamusica.org/cantos-nuevos/");
    setAnchorEl(null);
  }

  function handleDonacion() {
    openInNewTab("http://riamusica.org/donaciones/");
    setAnchorEl(null);
  }

  function handleClickOpenError() {
    setOpenError(true);
    setAnchorEl(null);
  }

  function handleClickOpenInfo() {
    setOpenInfo(true);
    setAnchorEl(null);
  }

  return (
    <>
      <IconButton
        size="large"
        aria-label="settings menu"
        aria-controls="settings-menu"
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
        <SettingsApplicationsIcon />
      </IconButton>
      <Dialog
        open={openError}
        keepMounted
        onClose={() => setOpenError(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Reportar un error / sugerencia"}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-slide-description">
            Favor enviar un correo a pablomadrigalq@gmail.com con sus
            sugerencias
            <br />
            <br />
            Si tuvieron un error en el uso del app favor especificar el número y
            título de la canción y si estaba en modo presentación o texto. Asi
            como una descripción del error
          </DialogContentText>
        </DialogContent>
        <Button onClick={() => setOpenError(false)} color="primary">
          Cerrar
        </Button>
      </Dialog>
      <Dialog
        open={openInfo}
        keepMounted
        onClose={() => setOpenInfo(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Información de la aplicación"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Versión 2.0 <br />
            Fecha Marzo 2020 <br />
            Aplicación creada por Pablo Madrigal <br />
            Canciones transcritas por Brechistas <br />
            Supervición por Juan Carlos Aragón <br />
            Enviar comentarios a pablomadrigalq@gmail.com
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenInfo(false)} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
      <Menu
        id="menu-mode"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          <AutocompleteSongBook />
        </MenuItem>
        <MenuItem onClick={handleDonacion}>Donaciones</MenuItem>
        <MenuItem onClick={handleNuevaCancion}>Enviar canción nueva</MenuItem>
        <MenuItem onClick={handleClickOpenError}>Reportar un error</MenuItem>
        <MenuItem onClick={handleClickOpenInfo}>Ayuda</MenuItem>
      </Menu>
    </>
  );
};

export default SettingsMenu;
