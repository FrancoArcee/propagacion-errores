import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import Contacto from './pages/Contacto'
import Simulador from './pages/Simulador'
import Step1 from './pages/Step1'
import Step2 from './pages/Step2'
import Step3 from './pages/Step3'
import Step4 from './pages/Step4'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/simulador" element={<Simulador />} />
          <Route path="/step1" element={<Step1 />} />
          <Route path="/step2" element={<Step2 />} />
          <Route path="/step3" element={<Step3 />} />
          <Route path="/step4" element={<Step4 />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App