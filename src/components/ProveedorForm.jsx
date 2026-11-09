import { useState } from 'react';
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { crearProveedor } from '../services/proveedorService';

const ESTADO_INICIAL = {
  razonSocial: '',
  cuit: '',
  email: '',
  telefono: '',
  calle: '',
  ciudad: '',
};

// Validación del lado del cliente, alineada con el modelo Mongoose del backend.
const validar = (datos) => {
  const errores = {};
  if (!datos.razonSocial.trim()) errores.razonSocial = 'La razón social es obligatoria';
  if (!/^\d{11}$/.test(datos.cuit)) errores.cuit = 'El CUIT debe tener 11 números, sin guiones';
  if (!datos.email.trim()) errores.email = 'El email es obligatorio';
  else if (!/^\S+@\S+\.\S+$/.test(datos.email)) errores.email = 'Email inválido';
  return errores;
};

// Componente independiente: maneja su estado, valida y hace el POST.
// Cuando termina, avisa al padre con onCreado(nuevoProveedor).
const ProveedorForm = ({ onCreado }) => {
  const [datos, setDatos] = useState(ESTADO_INICIAL);
  const [errores, setErrores] = useState({});
  const [errorApi, setErrorApi] = useState('');
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
    if (errores[name]) setErrores({ ...errores, [name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevosErrores = validar(datos);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    // Armamos el objeto con la forma anidada que espera el backend
    const payload = {
      razonSocial: datos.razonSocial.trim(),
      cuit: datos.cuit,
      contacto: { email: datos.email.trim(), telefono: datos.telefono.trim() },
      direccion: { calle: datos.calle.trim(), ciudad: datos.ciudad.trim() },
    };

    setEnviando(true);
    setErrorApi('');
    try {
      const nuevo = await crearProveedor(payload);
      setDatos(ESTADO_INICIAL);
      onCreado?.(nuevo);
    } catch (err) {
      if (err.response?.status === 403) {
        setErrorApi('Solo un usuario ADMIN puede registrar proveedores');
      } else {
        setErrorApi(err.response?.data?.detalle || err.response?.data?.mensaje || 'Error al crear el proveedor');
      }
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Card className="shadow-sm p-3">
      <h5 className="mb-3">Nuevo proveedor</h5>
      {errorApi && <Alert variant="danger" className="py-2">{errorApi}</Alert>}

      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-2">
          <Form.Label>Razón social *</Form.Label>
          <Form.Control name="razonSocial" value={datos.razonSocial} onChange={handleChange}
            isInvalid={!!errores.razonSocial} />
          <Form.Control.Feedback type="invalid">{errores.razonSocial}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>CUIT *</Form.Label>
          <Form.Control name="cuit" value={datos.cuit} onChange={handleChange} maxLength={11}
            placeholder="20123456789" inputMode="numeric" isInvalid={!!errores.cuit} />
          <Form.Control.Feedback type="invalid">{errores.cuit}</Form.Control.Feedback>
        </Form.Group>

        <Row>
          <Col md={7}>
            <Form.Group className="mb-2">
              <Form.Label>Email *</Form.Label>
              <Form.Control type="email" name="email" value={datos.email} onChange={handleChange}
                isInvalid={!!errores.email} />
              <Form.Control.Feedback type="invalid">{errores.email}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={5}>
            <Form.Group className="mb-2">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control name="telefono" value={datos.telefono} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={7}>
            <Form.Group className="mb-3">
              <Form.Label>Calle</Form.Label>
              <Form.Control name="calle" value={datos.calle} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={5}>
            <Form.Group className="mb-3">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control name="ciudad" value={datos.ciudad} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="success" className="w-100" disabled={enviando}>
          {enviando ? 'Guardando...' : 'Registrar proveedor'}
        </Button>
      </Form>
    </Card>
  );
};

export default ProveedorForm;
