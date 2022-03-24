import { Provider } from "react-redux";
import Home from "./components/home";
import { store } from "./components/store";

function App() {
  return (
    <Provider store={store}>
      <Home/>
    </Provider>
  );
}

export default App;
