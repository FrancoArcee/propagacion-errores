import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Introduccion from './pages/Introduccion'
import Teoria from './pages/Teoria'
import Practica from './pages/Practica'
import Calculadora from './pages/Calculadora'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Introduccion />} />
          <Route path="/introduccion" element={<Introduccion />} />
          <Route path="/teoria" element={<Teoria />} />
          <Route path="/practica" element={<Practica />} />
          <Route path="calculadora" element={<Calculadora />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App