import { useState } from "react";

const API_URL = "http://localhost:3000";

export default function UploadCSV({ onDatosRecibidos }) {
  const [estado, setEstado] = useState("idle"); // idle | cargando | ok | error
  const [mensaje, setMensaje] = useState("");

  const handleArchivo = async (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    // Solo acepta CSV
    if (!archivo.name.endsWith(".csv")) {
      setEstado("error");
      setMensaje("El archivo debe ser un .csv");
      return;
    }

    setEstado("cargando");
    setMensaje("Subiendo archivo...");

    try {
      const formData = new FormData();
      formData.append("archivo", archivo);

      const respuesta = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) throw new Error(datos.error || "Error en el servidor");

      setEstado("ok");
      setMensaje(`Archivo cargado: ${datos.filas} filas detectadas`);

      // Notifica al componente padre con los datos recibidos
      if (onDatosRecibidos) onDatosRecibidos(datos);
    } catch (err) {
      setEstado("error");
      setMensaje("Error al subir el archivo: " + err.message);
    }
  };

  return (
    <div style={estilos.contenedor}>
      <h2 style={estilos.titulo}>Sube tu archivo CSV</h2>
      <p style={estilos.subtitulo}>
        Selecciona un archivo .csv para analizarlo con IA
      </p>

      <label style={estilos.zona}>
        <input
          type="file"
          accept=".csv"
          onChange={handleArchivo}
          style={{ display: "none" }}
        />
        {estado === "cargando" ? (
          <span>Cargando...</span>
        ) : (
          <span>Haz clic para seleccionar un archivo</span>
        )}
      </label>

      {mensaje && (
        <p
          style={{
            ...estilos.mensaje,
            color:
              estado === "ok"
                ? "#0F6E56"
                : estado === "error"
                ? "#A32D2D"
                : "#633806",
          }}
        >
          {mensaje}
        </p>
      )}
    </div>
  );
}

const estilos = {
  contenedor: {
    maxWidth: "480px",
    margin: "40px auto",
    padding: "32px",
    borderRadius: "12px",
    border: "1px solid #e0e0e0",
    fontFamily: "sans-serif",
  },
  titulo: {
    fontSize: "20px",
    fontWeight: "500",
    marginBottom: "8px",
  },
  subtitulo: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "24px",
  },
  zona: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px dashed #ccc",
    borderRadius: "8px",
    padding: "40px 20px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#555",
  },
  mensaje: {
    marginTop: "16px",
    fontSize: "13px",
    fontWeight: "500",
  },
};