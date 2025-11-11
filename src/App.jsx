import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import Aplicacion from './pages/Aplicacion'
import Practica from './pages/Practica'
import Calculadora from './pages/Calculadora'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/practica" element={<Practica />} />
          <Route path="calculadora" element={<Calculadora />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App