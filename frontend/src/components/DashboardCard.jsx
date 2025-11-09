// Simple summary card component
export default function DashboardCard({ title, value, icon }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      padding: '1rem 1.5rem',
      flex: '1 1 200px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    }}>
      <div style={{ fontSize: '1.2rem', color: '#666', marginBottom: '0.3rem' }}>{title}</div>
      <div style={{ fontSize: '1.8rem', fontWeight: '600', color: '#111' }}>{value}</div>
      {icon && <div style={{ marginTop: '0.5rem' }}>{icon}</div>}
    </div>
  )
}
