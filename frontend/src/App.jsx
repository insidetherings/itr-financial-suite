import { useEffect, useState } from 'react'
import './App.css'

function App() {
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
    </div>
  )
}

export default App
