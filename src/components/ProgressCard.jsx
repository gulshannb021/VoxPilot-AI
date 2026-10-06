function ProgressCard({ completed, total }) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <section className="progress-card" aria-labelledby="progress-heading">
      <div className="progress-copy">
        <h2 id="progress-heading">Today’s progress</h2>
        <p>
          {completed} of {total} tasks completed
        </p>
      </div>
      <div className="progress-meter">
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          aria-label="Today’s task completion"
        >
          <span style={{ width: `${percent}%` }} />
        </div>
        <strong>{percent}%</strong>
      </div>
    </section>
  )
}

export default ProgressCard
