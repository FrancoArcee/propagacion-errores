import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Introduccion from './pages/Introduccion'
import Resolucion from './pages/Resolucion'
import Cierre from './pages/Cierre'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Introduccion />} />
          <Route path="/introduccion" element={<Introduccion />} />
          <Route path="/resolucion" element={<Resolucion />} />
          <Route path="/cierre" element={<Cierre />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App