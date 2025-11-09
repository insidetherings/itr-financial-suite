import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function DashboardChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    // Simulated chart data — replace with backend call later
    setData([
      { month: 'Jan', income: 12000, expenses: 8000 },
      { month: 'Feb', income: 14000, expenses: 9000 },
      { month: 'Mar', income: 12500, expenses: 7000 },
      { month: 'Apr', income: 16000, expenses: 9500 },
      { month: 'May', income: 15500, expenses: 9700 },
    ])
  }, [])

  return (
    <div style={{
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      padding: '1rem',
      marginTop: '2rem',
      height: '300px'
    }}>
      <h3 style={{ marginBottom: '1rem' }}>Monthly Income vs Expenses</h3>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="income" stroke="#00C49F" strokeWidth={3} />
          <Line type="monotone" dataKey="expenses" stroke="#FF8042" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
