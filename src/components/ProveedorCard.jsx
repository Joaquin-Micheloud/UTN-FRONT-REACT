import { Card, Badge } from 'react-bootstrap';
import CalificarProveedor from './CalificarProveedor';

// Componente visual: recibe el proveedor por props y lo muestra.
const ProveedorCard = ({ proveedor, onCalificado }) => {
  const { _id, razonSocial, cuit, contacto, direccion, calificacion, estadoActivo } = proveedor;

  return (
    <Card className="shadow-sm mb-3 h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <Card.Title className="mb-1">{razonSocial}</Card.Title>
          <Badge bg={estadoActivo ? 'success' : 'secondary'}>
            {estadoActivo ? 'Activo' : 'Inactivo'}
          </Badge>
        </div>
        <Card.Subtitle className="mb-3 text-muted">CUIT: {cuit}</Card.Subtitle>

        <ul className="list-unstyled small mb-3">
          <li>📧 {contacto?.email}</li>
          {contacto?.telefono && <li>📞 {contacto.telefono}</li>}
          {(direccion?.calle || direccion?.ciudad) && (
            <li>
              📍 {[direccion.calle, direccion.ciudad, direccion.pais].filter(Boolean).join(', ')}
            </li>
          )}
        </ul>

        <small className="text-muted d-block">Calificación</small>
        <CalificarProveedor
          proveedorId={_id}
          calificacionActual={calificacion}
          onCalificado={onCalificado}
        />
      </Card.Body>
    </Card>
  );
};

export default ProveedorCard;
