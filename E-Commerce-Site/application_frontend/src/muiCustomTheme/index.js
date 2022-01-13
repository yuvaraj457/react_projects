import { createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
    cartButtonColor : {
        main : '#6a1b9a',
        contrastText: '#fff',
    },
    buyButtonColor : {
        main : '#9c27b0',
        contrastText: '#fff',
    }
  },
});
