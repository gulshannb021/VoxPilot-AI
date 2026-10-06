function TaskList({
  tasks,
  onToggleComplete,
  onDelete,
  onEdit,
}) {
  if (tasks.length === 0) {
    return (
      <section className="task-panel">
        <div className="empty-state">
          <div className="empty-icon">✓</div>
          <h3>No tasks found</h3>
          <p>
            Try another search or filter, or create a new task.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="task-panel" aria-labelledby="tasks-heading">
      <div className="task-panel-header">
        <div>
          <h2 id="tasks-heading">Your tasks</h2>
          <p>
            {tasks.length} task{tasks.length !== 1 ? 's' : ''} shown
          </p>
        </div>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`task-row ${
              task.status === 'Completed' ? 'task-completed' : ''
            }`}
          >
            <button
              className={`complete-button ${
                task.status === 'Completed'
                  ? 'complete-button-done'
                  : ''
              }`}
              onClick={() => onToggleComplete(task.id)}
              title={
                task.status === 'Completed'
                  ? 'Mark as pending'
                  : 'Mark as complete'
              }
            >
              {task.status === 'Completed' ? '✓' : ''}
            </button>

            <div className="task-main">
              <p className="task-title">{task.title}</p>

              <div className="task-meta">
                {task.category && (
                  <span>{task.category}</span>
                )}

                {task.dueDate && (
                  <span>Due: {formatDate(task.dueDate)}</span>
                )}
              </div>
            </div>

            <span
              className={`pill priority-${task.priority.toLowerCase()}`}
            >
              {task.priority}
            </span>

            <span
              className={`status status-${slug(task.status)}`}
            >
              {task.status}
            </span>

            <div className="task-actions">
              <button
                onClick={() => onEdit(task.id)}
                title="Edit task"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(task.id)}
                title="Delete task"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function slug(value) {
  return value.toLowerCase().replace(/\s+/g, '-')
}

function formatDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`)

  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  })
}

export default TaskList