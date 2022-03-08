import React, { useEffect, useState} from 'react'
import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './assets/styles/style.css';
import AppRouter from './routes/routes';
import { store } from './store';

import {theme} from './muiCustomTheme'
import { refreshToken } from './core/apiCalls/user';
import tokenManger from './services/authService'
function App() {
  const [tokenLoaded, setTokenLoaded] = useState(false)

  useEffect(() => {
    refreshToken()
    .then((data) =>{ 
      console.log(data)
      tokenManger.setAccessToken(data.accessToken)
      setTokenLoaded(true)
    })
    .catch(() => setTokenLoaded(true))
    
  },[])

  return (
    tokenLoaded?
    <>
    <ThemeProvider theme={theme}>
    <Provider store={store}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
    </Provider>
    </ThemeProvider>
    </>
    :
    <h2>Loading...</h2>
  )
}

export default App;
