import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import logoUrl from '../../../docs/octofitapp-small.png'
import { apiBaseUrl } from './api'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

const navItems = [
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/users', label: 'Users' },
  { to: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-block">
          <img src={logoUrl} alt="OctoFit Tracker" className="brand-logo" />
          <div>
            <p className="eyebrow">OctoFit Tracker</p>
            <h1>Team fitness command center</h1>
          </div>
        </div>
        <div className="api-pill">API: {apiBaseUrl}</div>
      </header>

      <nav className="nav-tabs" aria-label="OctoFit sections">
        {navItems.map((item) => (
          <NavLink className="nav-tab" key={item.to} to={item.to}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <main className="content-panel">
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App