import { useNavigate } from 'react-router-dom'

export default function QuickActions() {
  const navigate = useNavigate()

  return (
    <div style={{
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      padding: '1rem 1.5rem',
      marginTop: '2rem',
      display: 'flex',
      justifyContent: 'space-around'
    }}>
      <button onClick={() => navigate('/add-account')}>➕ Add Account</button>
      <button onClick={() => alert('Invoice creation coming soon!')}>🧾 Create Invoice</button>
      <button onClick={() => alert('Report generation coming soon!')}>📊 Generate Report</button>
    </div>
  )
}
