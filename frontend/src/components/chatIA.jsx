import { useState } from 'react';

const API_URL = 'http://localhost:3000';

export default function ChatIA({ datosCSV }) {
  const [pregunta, setPregunta] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [estado, setEstado] = useState('idle'); // idle | cargando | ok | error

  const handlePregunta = async () => {
    if (!pregunta.trim()) return;
    if (!datosCSV) {
      setRespuesta('Primero sube un archivo CSV.');
      return;
    }

    setEstado('cargando');
    setRespuesta('');

    try {
      const res = await fetch(`${API_URL}/api/ai/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pregunta, datos: datosCSV }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error en el servidor');

      setRespuesta(data.respuesta);
      setEstado('ok');
    } catch (err) {
      setRespuesta('Error: ' + err.message);
      setEstado('error');
    }
  };

  return (
    <div style={estilos.contenedor}>
      <h2 style={estilos.titulo}>Pregunta a la IA sobre tus datos</h2>

      <div style={estilos.inputRow}>
        <input
          type="text"
          placeholder="Ej: ¿Cuál es la ciudad más repetida?"
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handlePregunta()}
          style={estilos.input}
        />
        <button
          onClick={handlePregunta}
          disabled={estado === 'cargando'}
          style={estilos.boton}
        >
          {estado === 'cargando' ? 'Pensando...' : 'Preguntar'}
        </button>
      </div>

      {respuesta && (
        <div style={{
          ...estilos.respuesta,
          borderColor: estado === 'error' ? '#A32D2D' : '#0F6E56',
        }}>
          <p style={estilos.respuestaTexto}>{respuesta}</p>
        </div>
      )}
    </div>
  );
}

const estilos = {
  contenedor: {
    maxWidth: '480px',
    margin: '24px auto',
    padding: '32px',
    borderRadius: '12px',
    border: '1px solid #e0e0e0',
    fontFamily: 'sans-serif',
  },
  titulo: {
    fontSize: '20px',
    fontWeight: '500',
    marginBottom: '20px',
  },
  inputRow: {
    display: 'flex',
    gap: '8px',
  },
  input: {
    flex: 1,
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px',
    outline: 'none',
  },
  boton: {
    padding: '10px 18px',
    borderRadius: '8px',
    border: 'none',
    background: '#1D9E75',
    color: '#fff',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: '500',
  },
  respuesta: {
    marginTop: '16px',
    padding: '14px',
    borderRadius: '8px',
    border: '1px solid',
    background: '#f9f9f9',
  },
  respuestaTexto: {
    fontSize: '14px',
    lineHeight: '1.7',
    margin: 0,
    color: '#333',
  },
};