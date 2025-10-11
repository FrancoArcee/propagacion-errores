import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Presentacion from './pages/Presentacion'
import Resolucion from './pages/Resolucion'
import Cierre from './pages/Cierre'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Presentacion />} />
          <Route path="/presentacion" element={<Presentacion />} />
          <Route path="/resolucion" element={<Resolucion />} />
          <Route path="/cierre" element={<Cierre />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App