import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Proveedores from './pages/Proveedores';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Mapa de navegación de la aplicación
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Todas las rutas aquí dentro requieren autenticación */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/proveedores" element={<Proveedores />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/proveedores" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
