import { useEffect, useState } from 'react'
import { apiBaseUrl, normalizeCollection } from '../api'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('Loading users...')

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(`${apiBaseUrl}/api/users/`)
        const payload = await response.json()

        setUsers(normalizeCollection(payload))
        setStatus('')
      } catch (error) {
        setStatus(`Unable to load users: ${error.message}`)
      }
    }

    loadUsers()
  }, [])

  if (status) {
    return <p className="status-text">{status}</p>
  }

  return (
    <section className="resource-grid" aria-label="Users">
      {users.map((user) => (
        <article className="resource-card" key={user._id ?? user.username}>
          <div className="card-kicker">{user.fitnessLevel}</div>
          <h2>{user.displayName ?? user.username}</h2>
          <p>{user.email}</p>
          <ul>
            {(user.goals ?? []).map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  )
}

export default Users