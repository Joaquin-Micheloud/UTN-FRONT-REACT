import { useState } from 'react';
import { calificarProveedor } from '../services/proveedorService';

// Componente independiente y reutilizable: muestra 5 estrellas,
// envía la calificación a la API y avisa al padre con el proveedor actualizado.
const CalificarProveedor = ({ proveedorId, calificacionActual, onCalificado }) => {
  const [hover, setHover] = useState(0);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');

  const handleCalificar = async (valor) => {
    if (guardando || valor === calificacionActual) return;
    setGuardando(true);
    setError('');
    try {
      const actualizado = await calificarProveedor(proveedorId, valor);
      onCalificado?.(actualizado);
    } catch (err) {
      setError(err.response?.data?.mensaje || 'No se pudo calificar');
    } finally {
      setGuardando(false);
    }
  };

  const valorMostrado = hover || calificacionActual;

  return (
    <div>
      <div onMouseLeave={() => setHover(0)} aria-label="Calificar proveedor">
        {[1, 2, 3, 4, 5].map((valor) => (
          <button
            key={valor}
            type="button"
            className="btn btn-link p-0 me-1 text-decoration-none"
            style={{ fontSize: '1.4rem', color: valor <= valorMostrado ? '#f5b301' : '#ccc' }}
            onMouseEnter={() => setHover(valor)}
            onClick={() => handleCalificar(valor)}
            disabled={guardando}
            title={`Calificar con ${valor}`}
          >
            ★
          </button>
        ))}
      </div>
      {error && <small className="text-danger">{error}</small>}
    </div>
  );
};

export default CalificarProveedor;
