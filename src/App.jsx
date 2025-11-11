import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import Contacto from './pages/Contacto'
import Simulador from './pages/Simulador'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/simulador" element={<Simulador />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App