import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import AddAccount from './AddAccount'
import './App.css'

function Home() {
  const [status, setStatus] = useState('Connecting...')

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/health')
      .then((res) => res.ok ? setStatus('✅ Connected to backend') : setStatus('❌ Failed to connect'))
      .catch(() => setStatus('❌ Backend unreachable'))
  }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Inside the Rings Financial Suite</h1>
      <p>{status}</p>
      <Link to="/add-account" style={{ color: 'blue', textDecoration: 'underline' }}>
        ➕ Add New Account
      </Link>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-account" element={<AddAccount />} />
      </Routes>
    </Router>
  )
}

export default App
