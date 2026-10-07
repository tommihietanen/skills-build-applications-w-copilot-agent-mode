import { useEffect, useState } from 'react'
import { apiBaseUrl, normalizeCollection } from '../api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('Loading workouts...')

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(`${apiBaseUrl}/api/workouts/`)
        const payload = await response.json()

        setWorkouts(normalizeCollection(payload))
        setStatus('')
      } catch (error) {
        setStatus(`Unable to load workouts: ${error.message}`)
      }
    }

    loadWorkouts()
  }, [])

  if (status) {
    return <p className="status-text">{status}</p>
  }

  return (
    <section className="resource-grid" aria-label="Workouts">
      {workouts.map((workout) => (
        <article className="resource-card" key={workout._id ?? workout.title}>
          <div className="card-kicker">{workout.difficulty} · {workout.durationMinutes} min</div>
          <h2>{workout.title}</h2>
          <p>{workout.focus}</p>
          <ul>
            {(workout.exercises ?? []).map((exercise) => (
              <li key={exercise}>{exercise}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  )
}

export default Workouts