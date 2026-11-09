import { Navigate, Outlet } from 'react-router-dom';
import { estaAutenticado } from '../services/authService';

// Envoltorio de rutas privadas: sin token, al login.
const ProtectedRoute = () => {
  if (!estaAutenticado()) return <Navigate to="/login" replace />;
  return <Outlet />;
};

export default ProtectedRoute;
