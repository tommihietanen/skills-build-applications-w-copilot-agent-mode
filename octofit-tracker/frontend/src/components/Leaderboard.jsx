import { useEffect, useState } from 'react'
import { apiBaseUrl, normalizeCollection } from '../api'

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [status, setStatus] = useState('Loading leaderboard...')

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(`${apiBaseUrl}/api/leaderboard/`)
        const payload = await response.json()

        setLeaderboard(normalizeCollection(payload))
        setStatus('')
      } catch (error) {
        setStatus(`Unable to load leaderboard: ${error.message}`)
      }
    }

    loadLeaderboard()
  }, [])

  if (status) {
    return <p className="status-text">{status}</p>
  }

  return (
    <section className="leaderboard-list" aria-label="Leaderboard">
      {leaderboard.map((entry) => (
        <article className="leaderboard-row" key={entry._id ?? entry.rank}>
          <span className="rank">#{entry.rank}</span>
          <div>
            <h2>{entry.user?.displayName ?? entry.user?.username}</h2>
            <p>{entry.weeklyStreak} week streak</p>
          </div>
          <strong>{entry.points} pts</strong>
        </article>
      ))}
    </section>
  )
}

export default Leaderboard