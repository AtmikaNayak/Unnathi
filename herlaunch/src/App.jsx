import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import OpportunityHub from './pages/OpportunityHub'
import MoneyLab from './pages/MoneyLab'
import Simulator from './pages/Simulator'
import ChatBot from './components/ChatBot'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/opportunities" element={<OpportunityHub />} />
        <Route path="/money-lab" element={<MoneyLab />} />
        <Route path="/simulator" element={<Simulator />} />
      </Routes>
      <ChatBot />
      <Footer />
    </BrowserRouter>
  )
}

export default App
