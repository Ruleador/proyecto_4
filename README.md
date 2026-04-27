Aplicación fullstack que permite subir archivos CSV y analizarlos con inteligencia artificial mediante preguntas en lenguaje natural.

✨ ¿Qué hace?

📁 Sube un CSV arrastrando o seleccionando el archivo.
🤖 Pregunta en lenguaje natural sobre tus datos.
📈 Recibe respuesta generada por IA al instante.

🚀 Cómo ejecutarlo en local
Requisitos

Node.js v18 o superior
Una API key de OpenAI o Anthropic

# Clona el repositorio
git clone https://github.com/Ruleador/proyecto_4.git
cd proyecto_4

# Instala dependencias del backend
cd backend
npm install

# Instala dependencias del frontend
cd ../frontend
npm install

# Configuración
Crea un archivo .env dentro de la carpeta backend/:
PORT=3000
ANTHROPIC_API_KEY=tu_api_key_aqui

# Ejecución
# Abre dos terminales:
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev

# Abre el navegador en http://localhost:5173

Este proyecto fue construido como parte de mi portfolio como desarrollador junior. Durante el desarrollo aprendí a:

Conectar un frontend React con un backend Express desde cero
Manejar subida de archivos con Multer
Integrar APIs de inteligencia artificial
Gestionar variables de entorno y seguridad con .gitignore
Controlar errores HTTP en el backend