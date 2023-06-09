import { FC, ReactNode } from 'react';
import { Typography } from '@mui/material';

interface TextVerseProps {
  children: ReactNode;
  type: string;
}

const TextVerse: FC<TextVerseProps> = ({ children, type }) => {
  return (
    <Typography component="div" textAlign="left">
      <br />
      {type.includes('E') && (
        <span style={{ fontWeight: 'bold' }}>Estribillo</span>
      )}
      {type.includes('F') && <span style={{ fontWeight: 'bold' }}>Final</span>}
      {children}
    </Typography>
  );
};

export default TextVerse;
