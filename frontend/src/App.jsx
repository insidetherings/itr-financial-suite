import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddAccount from './AddAccount'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-account" element={<AddAccount />} />
      </Routes>
    </Router>
  )
}
