import { useState } from 'react'
import UploadCSV from './components/UploadCSV'
import ChatIA from './components/chatIA.jsx'

function App() {
  const [datosCSV, setDatosCSV] = useState(null)

  const handleDatos = (datos) => {
    setDatosCSV(datos.preview)
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '32px' }}>
        AI Dashboard 📊
      </h1>
      <UploadCSV onDatosRecibidos={handleDatos} />
      <ChatIA datosCSV={datosCSV} />
    </div>
  )
}

export default App