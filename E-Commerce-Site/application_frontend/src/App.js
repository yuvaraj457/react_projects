import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './assets/styles/style.css';
import AppRouter from './routes/routes';
import { store } from './store';

function App() {
  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App;
