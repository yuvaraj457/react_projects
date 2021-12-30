import { BrowserRouter } from 'react-router-dom';
import './assets/styles/style.css';
import AppRouter from './routes/routes';

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  )
}

export default App;
