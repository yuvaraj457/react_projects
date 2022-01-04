import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './assets/styles/style.css';
import AppRouter from './routes/routes';
import { store } from './store';

import {theme} from './muiCustomTheme'
import { NavBar } from './shared/navBar';

function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
    <Provider store={store}>
        <BrowserRouter>
        <NavBar/>
          <AppRouter />
        </BrowserRouter>
    </Provider>
    </ThemeProvider>
    </>
  )
}

export default App;
