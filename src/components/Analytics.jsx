import { useMemo } from 'react'

function Analytics({ tasks }) {
  const stats = useMemo(() => {
    const total = tasks.length

    const completed = tasks.filter(
      (task) => task.status === 'Completed'
    ).length

    const pending = tasks.filter(
      (task) => task.status !== 'Completed'
    ).length

    const high = tasks.filter(
      (task) => task.priority === 'High'
    ).length

    const medium = tasks.filter(
      (task) => task.priority === 'Medium'
    ).length

    const low = tasks.filter(
      (task) => task.priority === 'Low'
    ).length

    const completionRate =
      total === 0
        ? 0
        : Math.round((completed / total) * 100)

    return {
      total,
      completed,
      pending,
      high,
      medium,
      low,
      completionRate,
    }
  }, [tasks])

  return (
    <section className="analytics-page">
      <div className="analytics-header">
        <div>
          <span className="analytics-eyebrow">
            VOXPILOT INSIGHTS
          </span>

          <h2>Productivity Analytics</h2>

          <p>
            Track your progress and understand your
            productivity at a glance.
          </p>
        </div>
      </div>

      <div className="analytics-stats">
        <div className="analytics-card">
          <span>Total Tasks</span>
          <strong>{stats.total}</strong>
          <small>All tasks</small>
        </div>

        <div className="analytics-card">
          <span>Completed</span>
          <strong>{stats.completed}</strong>
          <small>Finished tasks</small>
        </div>

        <div className="analytics-card">
          <span>Pending</span>
          <strong>{stats.pending}</strong>
          <small>Tasks remaining</small>
        </div>

        <div className="analytics-card">
          <span>High Priority</span>
          <strong>{stats.high}</strong>
          <small>Need attention</small>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="analytics-panel">
          <div className="analytics-panel-header">
            <div>
              <h3>Completion rate</h3>
              <p>Overall task progress</p>
            </div>

            <strong className="completion-number">
              {stats.completionRate}%
            </strong>
          </div>

          <div className="analytics-progress">
            <div
              style={{
                width: `${stats.completionRate}%`,
              }}
            />
          </div>

          <p className="analytics-note">
            {stats.completed} of {stats.total} tasks
            completed.
          </p>
        </div>

        <div className="analytics-panel">
          <div className="analytics-panel-header">
            <div>
              <h3>Priority breakdown</h3>
              <p>Tasks by priority</p>
            </div>
          </div>

          <div className="priority-bars">
            <PriorityBar
              label="High"
              value={stats.high}
              total={stats.total}
            />

            <PriorityBar
              label="Medium"
              value={stats.medium}
              total={stats.total}
            />

            <PriorityBar
              label="Low"
              value={stats.low}
              total={stats.total}
            />
          </div>
        </div>
      </div>

      <div className="analytics-panel productivity-panel">
        <div className="analytics-panel-header">
          <div>
            <h3>Productivity summary</h3>
            <p>Your current task performance</p>
          </div>
        </div>

        <div className="productivity-grid">
          <div>
            <span>Completion</span>
            <strong>
              {stats.completionRate}%
            </strong>
          </div>

          <div>
            <span>Completed</span>
            <strong>{stats.completed}</strong>
          </div>

          <div>
            <span>Remaining</span>
            <strong>{stats.pending}</strong>
          </div>

          <div>
            <span>Priority tasks</span>
            <strong>{stats.high}</strong>
          </div>
        </div>
      </div>
    </section>
  )
}

function PriorityBar({ label, value, total }) {
  const percentage =
    total === 0
      ? 0
      : Math.round((value / total) * 100)

  return (
    <div className="priority-bar-row">
      <div className="priority-bar-label">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>

      <div className="priority-track">
        <div
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  )
}

export default Analytics