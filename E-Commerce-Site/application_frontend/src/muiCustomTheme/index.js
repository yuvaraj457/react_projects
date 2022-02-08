import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  typography: {
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    idText : {
      fontStyle: 'italic',
      fontWeight: 600,
      fontSize: 13,
      color : 'green',
      cursor : 'pointer',
      backgroundColor : '#e3f2fd'
    }
    // button: {
    //   fontStyle: 'italic',
    // },
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
