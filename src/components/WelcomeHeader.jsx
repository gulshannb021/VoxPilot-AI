function WelcomeHeader({ onMenuClick, compact = false }) {
  const today = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date())

  return (
    <header className={`welcome ${compact ? 'is-compact' : ''}`}>
      <button
        type="button"
        className="menu-button"
        onClick={onMenuClick}
        aria-label="Open navigation"
      >
        <span />
        <span />
        <span />
      </button>

      {compact ? null : (
        <div>
          <p className="eyebrow">{today}</p>
          <h1>Welcome back to VoxPilot</h1>
          <p className="welcome-copy">
            Your voice-first command center for tasks, study time, and daily
            momentum.
          </p>
        </div>
      )}
    </header>
  )
}

export default WelcomeHeader
