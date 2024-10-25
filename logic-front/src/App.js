import './App.css';
import { ToastContainer } from "react-toastify";
import RoutesApp from "./routes";
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="App">
      <ToastContainer onClose={500}></ToastContainer>
      <RoutesApp/>
    </div>
  );
}

export default App;
