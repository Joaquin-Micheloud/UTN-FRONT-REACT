import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

// Estructura común de las pantallas privadas: navbar + contenido de la ruta.
const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export default Layout;
