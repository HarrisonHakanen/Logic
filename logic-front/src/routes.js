import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './pages/Header';
import DicomCadastro from './pages/Dicom/DicomCadastro';
import DicomHome from './pages/Dicom/DicomHome';
import Login from './pages/Login';
import CadastroUsuario from './pages/CadastroUsuario';


function RoutesApp() {
  return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastroUsuario" element={<CadastroUsuario />} />
          <Route path="/listagemDicom" element={<DicomHome />} />
          <Route path="/cadastroDicom" element={<DicomCadastro />} />
        </Routes>
      </BrowserRouter>
  );
}

export default RoutesApp;