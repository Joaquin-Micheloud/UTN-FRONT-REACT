import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { obtenerProveedores } from '../services/proveedorService';
import ProveedorForm from '../components/ProveedorForm';
import ProveedorCard from '../components/ProveedorCard';

// Página: maneja el estado de la lista y orquesta los componentes.
// No conoce URLs de la API ni la lógica del formulario o de la calificación.
const Proveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargar = async () => {
      try {
        const datos = await obtenerProveedores();
        setProveedores(datos);
      } catch (err) {
        setError(err.response?.data?.mensaje || 'Error al cargar los proveedores');
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  const agregarProveedor = (nuevo) => setProveedores((prev) => [...prev, nuevo]);

  const reemplazarProveedor = (actualizado) =>
    setProveedores((prev) => prev.map((p) => (p._id === actualizado._id ? actualizado : p)));

  return (
    <Container>
      <h1 className="mb-4">Gestión de Proveedores</h1>
      <Row>
        <Col lg={4} className="mb-4">
          <ProveedorForm onCreado={agregarProveedor} />
        </Col>

        <Col lg={8}>
          {cargando && <Spinner animation="border" />}
          {error && <Alert variant="danger">{error}</Alert>}
          {!cargando && !error && proveedores.length === 0 && (
            <p className="text-muted">No hay proveedores registrados.</p>
          )}
          <Row>
            {proveedores.map((proveedor) => (
              <Col md={6} key={proveedor._id} className="mb-3">
                <ProveedorCard proveedor={proveedor} onCalificado={reemplazarProveedor} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Proveedores;
