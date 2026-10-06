function StatCards({ stats }) {
  const cards = [
    { label: 'Total tasks', value: stats.total, tone: 'neutral' },
    { label: 'Completed', value: stats.completed, tone: 'success' },
    { label: 'Pending', value: stats.pending, tone: 'warning' },
    { label: 'High priority', value: stats.highPriority, tone: 'danger' },
  ]

  return (
    <section className="stat-grid" aria-label="Task statistics">
      {cards.map((card) => (
        <article key={card.label} className={`stat-card tone-${card.tone}`}>
          <p>{card.label}</p>
          <strong>{card.value}</strong>
        </article>
      ))}
    </section>
  )
}

export default StatCards
