import { Container, Navbar as BsNavbar, Nav, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <BsNavbar bg="dark" data-bs-theme="dark" className="mb-4">
      <Container>
        <BsNavbar.Brand>Panel de Administración</BsNavbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/proveedores">Proveedores</Nav.Link>
        </Nav>
        <Button variant="outline-light" size="sm" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;
