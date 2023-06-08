import { FC, useState, useEffect } from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export interface ChordsControlProps {
  capo: number;
  tono: string;
  onchange: (newCapo: number, newTono: string) => void;
}

const ChordsControl: FC<ChordsControlProps> = ({ capo, tono, onchange }) => {
  const [currentTono, setCurrentTono] = useState(tono);
  const [currentCapo, setCurrentCapo] = useState(capo);

  const handleLessCapo = () => {
    if (currentCapo > 0) setCurrentCapo(currentCapo - 1);
  };

  const handleMoreCapo = () => {
    if (currentCapo < 11) setCurrentCapo(currentCapo + 1);
  };

  const handleChangeChord = (modifier: number) => {
    setCurrentTono(
      modificaTonoCancion({ tonoCancion: currentTono, modificador: modifier })
    );
  };

  useEffect(() => {
    if (onchange) onchange(currentCapo, currentTono);
  }, [currentCapo, currentTono]);

  const getTonosPosiblesCacion = (tonoCancion: string) => {
    //Crear listados de tonos
    const tonosMayores = [
      "DO",
      "DO#",
      "RE",
      "RE#",
      "MI",
      "FA",
      "FA#",
      "SOL",
      "SOL#",
      "LA",
      "LA#",
      "SI",
    ];
    const tonosMayoresSeptimos = [
      "DO7",
      "DO#7",
      "RE7",
      "RE#7",
      "MI7",
      "FA7",
      "FA#7",
      "SOL7",
      "SOL#7",
      "LA7",
      "LA#7",
      "SI7",
    ];
    const tonosMenores = [
      "Dom",
      "Do#m",
      "Rem",
      "Re#m",
      "Mim",
      "Fam",
      "Fa#m",
      "Solm",
      "Sol#m",
      "Lam",
      "La#m",
      "Sim",
    ];
    const tonosMenoresSeptimos = [
      "Dom7",
      "Do#m7",
      "Rem7",
      "Re#m7",
      "Mim7",
      "Fam7",
      "Fa#m7",
      "Solm7",
      "Sol#m7",
      "Lam7",
      "La#m7",
      "Sim7",
    ];

    //Verificar a que escala pertenece el tono y devolverla
    if (tonosMayores.includes(tonoCancion)) return tonosMayores;
    if (tonosMayoresSeptimos.includes(tonoCancion)) return tonosMayoresSeptimos;
    if (tonosMenores.includes(tonoCancion)) return tonosMenores;
    if (tonosMenoresSeptimos.includes(tonoCancion)) return tonosMenoresSeptimos;
  };

  //Función que modifica una canción en base a un modificador
  //El modificador determina que tanto baja o sube el tono de la canción
  const modificaTonoCancion = ({
    tonoCancion,
    modificador,
  }: {
    tonoCancion: string;
    modificador: number;
  }) => {
    const escalaTono = getTonosPosiblesCacion(tonoCancion) ?? []; //Buscar escala del tono recibido
    const posicionTono = escalaTono.indexOf(tonoCancion);

    //Si el calculo sobrepasa el limite de los 12 tonos
    if (escalaTono.length <= posicionTono + modificador)
      return escalaTono[posicionTono + modificador - escalaTono.length];
    //Si el calculo da menos que el primer tono de la escala
    else if (posicionTono + modificador < 0)
      return escalaTono[escalaTono.length + posicionTono + modificador];
    //Si no se da ninguna condición anterior
    else return escalaTono[posicionTono + modificador];
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      sx={{ py: 3, width: "100%", position: "fixed", backgroundColor: "#fff" }}
    >
      <IconButton onClick={handleLessCapo}>
        <RemoveCircleIcon />
      </IconButton>
      <IconButton onClick={handleMoreCapo}>
        <AddCircleIcon />
      </IconButton>
      <Typography>
        Esta en capo <b>{currentCapo}</b>
      </Typography>
      <Typography>
        Esta en tono <b>{currentTono}</b>
      </Typography>
      <IconButton onClick={() => handleChangeChord(-1)}>
        <RemoveCircleIcon />
      </IconButton>
      <IconButton onClick={() => handleChangeChord(1)}>
        <AddCircleIcon />
      </IconButton>
    </Stack>
  );
};

export default ChordsControl;
