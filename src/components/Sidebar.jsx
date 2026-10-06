const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
  { id: 'tasks', label: 'Tasks', icon: TasksIcon },
  { id: 'planner', label: 'Study planner', icon: PlannerIcon },
  { id: 'analytics', label: 'Analytics', icon: AnalyticsIcon },
]

function Sidebar({ activePage, onNavigate, isOpen, onClose }) {
  return (
    <>
      {isOpen ? (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Close navigation"
          onClick={onClose}
        />
      ) : null}

      <aside className={`sidebar ${isOpen ? 'is-open' : ''}`}>
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="9" fill="currentColor" />
              <path
                d="M8 16.5c1.4-4 2.5-6 3.4-6s1.5 3 2.6 6 2.1 6 3.1 6 2-4 3.1-6 2.1-6 3.2-6"
                stroke="#07110f"
                strokeWidth="2.1"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <div>
            <p className="brand-name">VoxPilot</p>
            <p className="brand-tag">Voice-first assistant</p>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = activePage === item.id

            return (
              <button
                key={item.id}
                type="button"
                className={`nav-item ${isActive ? 'is-active' : ''}`}
                onClick={() => onNavigate(item.id)}
              >
                <Icon />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="sidebar-footer">
          <p className="sidebar-hint">Speak it. VoxPilot plans it.</p>
        </div>
      </aside>
    </>
  )
}

function DashboardIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="6.5" height="6.5" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
      <rect x="10.5" y="3" width="6.5" height="4" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
      <rect x="3" y="11.5" width="6.5" height="5.5" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
      <rect x="10.5" y="9" width="6.5" height="8" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

function TasksIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M6 5.5h10M6 10h10M6 14.5h7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M4 5.5l.8.8L6.4 4.7M4 10l.8.8L6.4 9.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PlannerIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3.2" y="4.2" width="13.6" height="12.6" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.2 8h13.6M7 3.2v2.4M13 3.2v2.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function AnalyticsIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 14.5V11M8.5 14.5V7.5M13 14.5V9.5M17 14.5V5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

export default Sidebar
