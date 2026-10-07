import { useEffect, useState } from 'react'
import { apiBaseUrl, normalizeCollection } from '../api'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('Loading teams...')

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(`${apiBaseUrl}/api/teams/`)
        const payload = await response.json()

        setTeams(normalizeCollection(payload))
        setStatus('')
      } catch (error) {
        setStatus(`Unable to load teams: ${error.message}`)
      }
    }

    loadTeams()
  }, [])

  if (status) {
    return <p className="status-text">{status}</p>
  }

  return (
    <section className="resource-grid" aria-label="Teams">
      {teams.map((team) => (
        <article className="resource-card" key={team._id ?? team.name}>
          <div className="card-kicker">Team</div>
          <h2>{team.name}</h2>
          <p>{team.motto}</p>
          <ul>
            {(team.members ?? []).map((member) => (
              <li key={member._id ?? member.username}>{member.displayName ?? member.username}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  )
}

export default Teams