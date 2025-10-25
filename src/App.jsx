import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Introduccion from './pages/Introduccion'
import Aplicacion from './pages/Aplicacion'
import Practica from './pages/Practica'
import Calculadora from './pages/Calculadora'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Introduccion />} />
          <Route path="/introduccion" element={<Introduccion />} />
          <Route path="/aplicacion" element={<Aplicacion />} />
          <Route path="/practica" element={<Practica />} />
          <Route path="calculadora" element={<Calculadora />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App