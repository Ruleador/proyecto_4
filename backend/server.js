require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const { preguntarIA } = require('./services/openaiService');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.get('/', (req, res) => {
  res.json({ mensaje: 'Backend funcionando' });
});

app.post('/api/upload', upload.single('archivo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se recibió ningún archivo' });
  }
  try {
    const contenido = fs.readFileSync(req.file.path, 'utf-8');
    const lineas = contenido.trim().split('\n');
    const cabeceras = lineas[0].split(',');
    const filas = lineas.length - 1;
    fs.unlinkSync(req.file.path);
    res.json({
      mensaje: 'Archivo procesado correctamente',
      filas,
      columnas: cabeceras.map(c => c.trim()),
      preview: contenido.trim(),
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al leer el archivo: ' + err.message });
  }
});

app.post('/api/ai/query', async (req, res) => {
  const { pregunta, datos } = req.body;

  if (!pregunta || !datos) {
    return res.status(400).json({ error:'Faltan pregunta o datos' });
  }

  try {
    const respuesta = await preguntarIA(pregunta, datos);
    res.json({ respuesta });
  } catch (err) {
    // Error de límite de API
    if (err.status === 429 || err.message?.includes('429')) {
      return res.status(429).json({
        error: 'Límite de API alcanzado. Verifica tu facturación en OpenAI o Anthropic.'
      });
    }

    // Error de API key inválida
    if (err.status === 401 || err.message?.includes('401')) {
      return res.status(401).json({
        error: 'API key inválida. Revisa el archivo .env'
      });
    }

    // Error genérico
    res.status(500).json({ error: 'Error al consultar la IA: ' + err.message });
  }
});

app.get('/api/historial', (req, res) => {
  res.json({ historial: [] });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal en el servidor' });
});



app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});