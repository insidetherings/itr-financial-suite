import { useEffect, useState } from 'react'
import DashboardCard from '../components/DashboardCard'
import DashboardChart from '../components/DashboardChart'
import QuickActions from '../components/QuickActions'

export default function Dashboard() {
  const [accounts, setAccounts] = useState([])
  const [invoices, setInvoices] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const base = import.meta.env.VITE_API_URL
      const accRes = await fetch(`${base}/accounts`)
      const invRes = await fetch(`${base}/invoices`)
      setAccounts(await accRes.json())
      setInvoices(await invRes.json())
    }
    fetchData()
  }, [])

  const totalBalance = accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0)
  const paidInvoices = invoices.filter(i => i.status === 'PAID').length
  const unpaidInvoices = invoices.filter(i => i.status === 'UNPAID').length

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>📊 Inside the Rings Financial Dashboard</h1>

      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '2rem' }}>
        <DashboardCard title="Total Balance" value={`$${totalBalance.toFixed(2)}`} />
        <DashboardCard title="Paid Invoices" value={paidInvoices} />
        <DashboardCard title="Unpaid Invoices" value={unpaidInvoices} />
      </div>

      <DashboardChart />
      <QuickActions />
   <img
  src="/src/assets/itr-logo.png"
  alt="Inside the Rings logo"
  style={{
    position: "fixed",
    bottom: "20px",
    right: "20px",
    opacity: 0.1,
    width: "120px",
  }}
/>
 
</div>
  )
}
