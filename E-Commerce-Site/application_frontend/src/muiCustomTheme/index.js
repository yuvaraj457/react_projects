import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    badgeColor: {
      main : '#e53935',
      contrastText: '#fff',
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
    },
    bcolor : {
        main : '#9c27b0'
    }
  },
});
