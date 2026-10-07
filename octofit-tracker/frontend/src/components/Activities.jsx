import { useEffect, useState } from 'react'
import { apiBaseUrl, normalizeCollection } from '../api'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('Loading activities...')

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(`${apiBaseUrl}/api/activities/`)
        const payload = await response.json()

        setActivities(normalizeCollection(payload))
        setStatus('')
      } catch (error) {
        setStatus(`Unable to load activities: ${error.message}`)
      }
    }

    loadActivities()
  }, [])

  if (status) {
    return <p className="status-text">{status}</p>
  }

  return (
    <section className="resource-grid" aria-label="Activities">
      {activities.map((activity) => (
        <article className="resource-card" key={activity._id}>
          <div className="card-kicker">{activity.user?.displayName ?? activity.user?.username}</div>
          <h2>{activity.type}</h2>
          <p>{activity.durationMinutes} minutes · {activity.caloriesBurned} calories</p>
          {activity.distanceKm ? <p>{activity.distanceKm} km</p> : null}
          <span className="date-label">{new Date(activity.performedAt).toLocaleDateString()}</span>
        </article>
      ))}
    </section>
  )
}

export default Activities