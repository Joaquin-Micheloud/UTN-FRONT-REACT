import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { login, estaAutenticado } from '../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const [credenciales, setCredenciales] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  if (estaAutenticado()) return <Navigate to="/proveedores" replace />;

  const handleChange = (e) =>
    setCredenciales({ ...credenciales, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');
    try {
      await login(credenciales.email, credenciales.password);
      navigate('/proveedores');
    } catch (err) {
      setError(err.response?.data?.mensaje || 'No se pudo iniciar sesión');
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="shadow-sm p-4" style={{ width: '100%', maxWidth: 400 }}>
        <h3 className="mb-4 text-center">Iniciar sesión</h3>
        {error && <Alert variant="danger" className="py-2">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={credenciales.email}
              onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" name="password" value={credenciales.password}
              onChange={handleChange} required />
          </Form.Group>
          <Button type="submit" className="w-100" disabled={cargando}>
            {cargando ? 'Ingresando...' : 'Ingresar'}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
