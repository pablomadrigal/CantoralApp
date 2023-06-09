// eslint-disable-next-line import/no-extraneous-dependencies
import { ChordDecorationEnum, LineInterface } from '../types/SongTypes';
import { insertSubStringAt } from './stringUtils';

const chordDecorationSort = (
  a: ChordDecorationEnum,
  b: ChordDecorationEnum
) => {
  const map = {
    [ChordDecorationEnum.MENOR]: 1,
    [ChordDecorationEnum.SUS]: 2,
    [ChordDecorationEnum.SIENTE]: 3,
    [ChordDecorationEnum.NUEVE]: 4,
    [ChordDecorationEnum.SUS2]: 5,
    [ChordDecorationEnum.SUS4]: 6,
  };

  if (map[a] < map[b]) {
    return -1;
  }

  if (map[a] > map[b]) {
    return 1;
  }

  return 0;
};

interface cantoralToHTMLProps {
  song: LineInterface[];
  currentTono: string;
  currentCapo: number;
  capoBase: number;
  tonoBaseCancion: string;
}

export const cantoralToHTML = ({
  song,
  currentTono,
  currentCapo,
  capoBase,
  tonoBaseCancion,
}: cantoralToHTMLProps) => {
  const htmlLine = song.map((line) => {
    let htmlText = `<div>${line.letter}<br/></div>`;
    let offset = 5;
    [...line.chords]
      .sort((a, b) => a.beginning - b.beginning)
      .forEach((chord) => {
        const chordHTML = `<span class='acorde'>${getModifiedTono(
          chord.type,
          currentTono,
          currentCapo,
          capoBase,
          tonoBaseCancion
        )}</span>`;
        htmlText = insertSubStringAt(
          htmlText,
          chord.beginning + offset,
          chordHTML
        );
        offset += chordHTML.length;
      });
    return htmlText;
  });
  return htmlLine.join('');
};

export const getModifiedTono = (
  tonoAModificar: string,
  currentTono: string,
  currentCapo: number,
  capoBase: number,
  tonoBaseCancion: string
) => {
  let posicionTonoActual = 0;
  let cuadranteTonoActual = 0;
  let posicionTonoBaseCancion = 0;
  let posicionTonoActualCancion = 0;
  let cuadranteTonoBaseCancion = 0;
  let cuadranteTonoActualCancion = 0;
  let diferenciaTonoCancion = 0;
  const cuadrantesEscalasTonos = 4;
  const limiteEscalaTonos = 12;
  const matrizTonos = [
    [
      //Tonos mayores
      [
        'DO',
        'SI',
        'LA#',
        'LA',
        'SOL#',
        'SOL',
        'FA#',
        'FA',
        'MI',
        'RE#',
        'RE',
        'DO#',
      ],
      [
        'DO#',
        'DO',
        'SI',
        'LA#',
        'LA',
        'SOL#',
        'SOL',
        'FA#',
        'FA',
        'MI',
        'RE#',
        'RE',
      ],
      [
        'RE',
        'DO#',
        'DO',
        'SI',
        'LA#',
        'LA',
        'SOL#',
        'SOL',
        'FA#',
        'FA',
        'MI',
        'RE#',
      ],
      [
        'RE#',
        'RE',
        'DO#',
        'DO',
        'SI',
        'LA#',
        'LA',
        'SOL#',
        'SOL',
        'FA#',
        'FA',
        'MI',
      ],
      [
        'MI',
        'RE#',
        'RE',
        'DO#',
        'DO',
        'SI',
        'LA#',
        'LA',
        'SOL#',
        'SOL',
        'FA#',
        'FA',
      ],
      [
        'FA',
        'MI',
        'RE#',
        'RE',
        'DO#',
        'DO',
        'SI',
        'LA#',
        'LA',
        'SOL#',
        'SOL',
        'FA#',
      ],
      [
        'FA#',
        'FA',
        'MI',
        'RE#',
        'RE',
        'DO#',
        'DO',
        'SI',
        'LA#',
        'LA',
        'SOL#',
        'SOL',
      ],
      [
        'SOL',
        'FA#',
        'FA',
        'MI',
        'RE#',
        'RE',
        'DO#',
        'DO',
        'SI',
        'LA#',
        'LA',
        'SOL#',
      ],
      [
        'SOL#',
        'SOL',
        'FA#',
        'FA',
        'MI',
        'RE#',
        'RE',
        'DO#',
        'DO',
        'SI',
        'LA#',
        'LA',
      ],
      [
        'LA',
        'SOL#',
        'SOL',
        'FA#',
        'FA',
        'MI',
        'RE#',
        'RE',
        'DO#',
        'DO',
        'SI',
        'LA#',
      ],
      [
        'LA#',
        'LA',
        'SOL#',
        'SOL',
        'FA#',
        'FA',
        'MI',
        'RE#',
        'RE',
        'DO#',
        'DO',
        'SI',
      ],
      [
        'SI',
        'LA#',
        'LA',
        'SOL#',
        'SOL',
        'FA#',
        'FA',
        'MI',
        'RE#',
        'RE',
        'DO#',
        'DO',
      ],
    ],
    [
      //Tonos Mayores Septimos
      [
        'DO7',
        'SI7',
        'LA#7',
        'LA7',
        'SOL#7',
        'SOL7',
        'FA#7',
        'FA7',
        'MI7',
        'RE#7',
        'RE7',
        'DO#7',
      ],
      [
        'DO#7',
        'DO7',
        'SI7',
        'LA#7',
        'LA7',
        'SOL#7',
        'SOL7',
        'FA#7',
        'FA7',
        'MI7',
        'RE#7',
        'RE7',
      ],
      [
        'RE7',
        'DO#7',
        'DO7',
        'SI7',
        'LA#7',
        'LA7',
        'SOL#7',
        'SOL7',
        'FA#7',
        'FA7',
        'MI7',
        'RE#7',
      ],
      [
        'RE#7',
        'RE7',
        'DO#7',
        'DO7',
        'SI7',
        'LA#7',
        'LA7',
        'SOL#7',
        'SOL7',
        'FA#7',
        'FA7',
        'MI7',
      ],
      [
        'MI7',
        'RE#7',
        'RE7',
        'DO#7',
        'DO7',
        'SI7',
        'LA#7',
        'LA7',
        'SOL#7',
        'SOL7',
        'FA#7',
        'FA7',
      ],
      [
        'FA7',
        'MI7',
        'RE#7',
        'RE7',
        'DO#7',
        'DO7',
        'SI7',
        'LA#7',
        'LA7',
        'SOL#7',
        'SOL7',
        'FA#7',
      ],
      [
        'FA#7',
        'FA7',
        'MI7',
        'RE#7',
        'RE7',
        'DO#7',
        'DO7',
        'SI7',
        'LA#7',
        'LA7',
        'SOL#7',
        'SOL7',
      ],
      [
        'SOL7',
        'FA#7',
        'FA7',
        'MI7',
        'RE#7',
        'RE7',
        'DO#7',
        'DO7',
        'SI7',
        'LA#7',
        'LA7',
        'SOL#7',
      ],
      [
        'SOL#7',
        'SOL7',
        'FA#7',
        'FA7',
        'MI7',
        'RE#7',
        'RE7',
        'DO#7',
        'DO7',
        'SI7',
        'LA#7',
        'LA7',
      ],
      [
        'LA7',
        'SOL#7',
        'SOL7',
        'FA#7',
        'FA7',
        'MI7',
        'RE#7',
        'RE7',
        'DO#7',
        'DO7',
        'SI7',
        'LA#7',
      ],
      [
        'LA#7',
        'LA7',
        'SOL#7',
        'SOL7',
        'FA#7',
        'FA7',
        'MI7',
        'RE#7',
        'RE7',
        'DO#7',
        'DO7',
        'SI7',
      ],
      [
        'SI7',
        'LA#7',
        'LA7',
        'SOL#7',
        'SOL7',
        'FA#7',
        'FA7',
        'MI7',
        'RE#7',
        'RE7',
        'DO#7',
        'DO7',
      ],
    ],
    [
      //Tonos menores
      [
        'Dom',
        'Sim',
        'La#m',
        'Lam',
        'Sol#m',
        'Solm',
        'Fa#m',
        'Fam',
        'Mim',
        'Re#m',
        'Rem',
        'Do#m',
      ],
      [
        'Do#m',
        'Dom',
        'Sim',
        'La#m',
        'Lam',
        'Sol#m',
        'Solm',
        'Fa#m',
        'Fam',
        'Mim',
        'Re#m',
        'Rem',
      ],
      [
        'Rem',
        'Do#m',
        'Dom',
        'Sim',
        'La#m',
        'Lam',
        'Sol#m',
        'Solm',
        'Fa#m',
        'Fam',
        'Mim',
        'Re#m',
      ],
      [
        'Re#m',
        'Rem',
        'Do#m',
        'Dom',
        'Sim',
        'La#m',
        'Lam',
        'Sol#m',
        'Solm',
        'Fa#m',
        'Fam',
        'Mim',
      ],
      [
        'Mim',
        'Re#m',
        'Rem',
        'Do#m',
        'Dom',
        'Sim',
        'La#m',
        'Lam',
        'Sol#m',
        'Solm',
        'Fa#m',
        'Fam',
      ],
      [
        'Fam',
        'Mim',
        'Re#m',
        'Rem',
        'Do#m',
        'Dom',
        'Sim',
        'La#m',
        'Lam',
        'Sol#m',
        'Solm',
        'Fa#m',
      ],
      [
        'Fa#m',
        'Fam',
        'Mim',
        'Re#m',
        'Rem',
        'Do#m',
        'Dom',
        'Sim',
        'La#m',
        'Lam',
        'Sol#m',
        'Solm',
      ],
      [
        'Solm',
        'Fa#m',
        'Fam',
        'Mim',
        'Re#m',
        'Rem',
        'Do#m',
        'Dom',
        'Sim',
        'La#m',
        'Lam',
        'Sol#m',
      ],
      [
        'Sol#m',
        'Solm',
        'Fa#m',
        'Fam',
        'Mim',
        'Re#m',
        'Rem',
        'Do#m',
        'Dom',
        'Sim',
        'La#m',
        'Lam',
      ],
      [
        'Lam',
        'Sol#m',
        'Solm',
        'Fa#m',
        'Fam',
        'Mim',
        'Re#m',
        'Rem',
        'Do#m',
        'Dom',
        'Sim',
        'La#m',
      ],
      [
        'La#m',
        'Lam',
        'Sol#m',
        'Solm',
        'Fa#m',
        'Fam',
        'Mim',
        'Re#m',
        'Rem',
        'Do#m',
        'Dom',
        'Sim',
      ],
      [
        'Sim',
        'La#m',
        'Lam',
        'Sol#m',
        'Solm',
        'Fa#m',
        'Fam',
        'Mim',
        'Re#m',
        'Rem',
        'Do#m',
        'Dom',
      ],
    ],
    [
      //Tonos menores septimos
      [
        'Dom7',
        'Sim7',
        'La#m7',
        'Lam7',
        'Sol#m7',
        'Solm7',
        'Fa#m7',
        'Fam7',
        'Mim7',
        'Re#m7',
        'Rem7',
        'Do#m7',
      ],
      [
        'Do#m7',
        'Dom7',
        'Sim7',
        'La#m7',
        'Lam7',
        'Sol#m7',
        'Solm7',
        'Fa#m7',
        'Fam7',
        'Mim7',
        'Re#m7',
        'Rem7',
      ],
      [
        'Rem7',
        'Do#m7',
        'Dom7',
        'Sim7',
        'La#m7',
        'Lam7',
        'Sol#m7',
        'Solm7',
        'Fa#m7',
        'Fam7',
        'Mim7',
        'Re#m7',
      ],
      [
        'Re#m7',
        'Rem7',
        'Do#m7',
        'Dom7',
        'Sim7',
        'La#m7',
        'Lam7',
        'Sol#m7',
        'Solm7',
        'Fa#m7',
        'Fam7',
        'Mim7',
      ],
      [
        'Mim7',
        'Re#m7',
        'Rem7',
        'Do#m7',
        'Dom7',
        'Sim7',
        'La#m7',
        'Lam7',
        'Sol#m7',
        'Solm7',
        'Fa#m7',
        'Fam7',
      ],
      [
        'Fam7',
        'Mim7',
        'Re#m7',
        'Rem7',
        'Do#m7',
        'Dom7',
        'Sim7',
        'La#m7',
        'Lam7',
        'Sol#m7',
        'Solm7',
        'Fa#m7',
      ],
      [
        'Fa#m7',
        'Fam7',
        'Mim7',
        'Re#m7',
        'Rem7',
        'Do#m7',
        'Dom7',
        'Sim7',
        'La#m7',
        'Lam7',
        'Sol#m7',
        'Solm7',
      ],
      [
        'Solm7',
        'Fa#m7',
        'Fam7',
        'Mim7',
        'Re#m7',
        'Rem7',
        'Do#m7',
        'Dom7',
        'Sim7',
        'La#m7',
        'Lam7',
        'Sol#m7',
      ],
      [
        'Sol#m7',
        'Solm7',
        'Fa#m7',
        'Fam7',
        'Mim7',
        'Re#m7',
        'Rem7',
        'Do#m7',
        'Dom7',
        'Sim7',
        'La#m7',
        'Lam7',
      ],
      [
        'Lam7',
        'Sol#m7',
        'Solm7',
        'Fa#m7',
        'Fam7',
        'Mim7',
        'Re#m7',
        'Rem7',
        'Do#m7',
        'Dom7',
        'Sim7',
        'La#m7',
      ],
      [
        'La#m7',
        'Lam7',
        'Sol#m7',
        'Solm7',
        'Fa#m7',
        'Fam7',
        'Mim7',
        'Re#m7',
        'Rem7',
        'Do#m7',
        'Dom7',
        'Sim7',
      ],
      [
        'Sim7',
        'La#m7',
        'Lam7',
        'Sol#m7',
        'Solm7',
        'Fa#m7',
        'Fam7',
        'Mim7',
        'Re#m7',
        'Rem7',
        'Do#m7',
        'Dom7',
      ],
    ],
  ];

  //Buscar el tono base y tono actual de la cancion
  for (let i = 0; i < cuadrantesEscalasTonos; i++) {
    //Busca en cada cuadrante
    for (let j = 0; j < limiteEscalaTonos; j++) {
      if (matrizTonos[i][j][0] === tonoBaseCancion) {
        //Tono base de canción
        cuadranteTonoBaseCancion = i;
        posicionTonoBaseCancion = j;
      }
      if (matrizTonos[i][j][0] === currentTono) {
        //Tono actual de canción
        cuadranteTonoActualCancion = i;
        posicionTonoActualCancion = j;
      }
      if (matrizTonos[i][j][capoBase] === tonoAModificar) {
        //Tono actual
        cuadranteTonoActual = i;
        posicionTonoActual = j;
      }
    }
  }

  //La canción solo puede cambiar de tono dentro de su misma escala
  //Por tanto, ambos tonos deben pertenecer al mismo cuadrante
  if (cuadranteTonoBaseCancion === cuadranteTonoActualCancion) {
    //Diferencia entre tono base y actual de la canción
    diferenciaTonoCancion = posicionTonoActualCancion - posicionTonoBaseCancion;
  } else return 'error'; //Si no están en la misma escala, hay un error
  //Se manejan las posiciones para que la nueva posición del tono se quede dentro de la escala de 12 tonos
  //Este cambio se hace para llevar el tono recibido al nuevo tono de la canción antes de aplicar el currentCapo
  if (
    posicionTonoActual + diferenciaTonoCancion >= 0 &&
    posicionTonoActual + diferenciaTonoCancion < limiteEscalaTonos
  ) {
    posicionTonoActual = posicionTonoActual + diferenciaTonoCancion;
  } else if (posicionTonoActual + diferenciaTonoCancion < 0)
    posicionTonoActual =
      limiteEscalaTonos + (posicionTonoActual + diferenciaTonoCancion);
  else
    posicionTonoActual =
      posicionTonoActual + diferenciaTonoCancion - limiteEscalaTonos;

  //Mover el tono al currentCapo seleccionado
  return matrizTonos[cuadranteTonoActual][posicionTonoActual][currentCapo];
};
