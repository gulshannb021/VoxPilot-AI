import { useMemo, useState } from 'react'

function StudyPlanner() {
  const [subject, setSubject] = useState('')
  const [examDate, setExamDate] = useState('')
  const [hours, setHours] = useState('3')
  const [plan, setPlan] = useState([])

  const daysLeft = useMemo(() => {
    if (!examDate) return 0

    const today = new Date()
    const exam = new Date(`${examDate}T00:00:00`)

    today.setHours(0, 0, 0, 0)

    return Math.max(
      0,
      Math.ceil((exam - today) / (1000 * 60 * 60 * 24))
    )
  }, [examDate])

  const generatePlan = (event) => {
    event.preventDefault()

    if (!subject.trim() || !examDate || !hours) {
      alert('Please fill in all fields.')
      return
    }

    const topics = [
      'Learn core concepts',
      'Review important notes',
      'Practice problems',
      'Revise weak topics',
      'Take a mock test',
      'Final revision',
    ]

    const numberOfDays = Math.max(1, daysLeft)
    const sessions = []

    for (let i = 0; i < numberOfDays; i++) {
      const topic = topics[i % topics.length]

      sessions.push({
        day: i + 1,
        date: new Date(
          new Date().setDate(
            new Date().getDate() + i
          )
        ).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
        }),
        topic,
        hours,
      })
    }

    setPlan(sessions)
  }

  return (
    <section className="planner-page">
      <div className="planner-header">
        <div>
          <span className="planner-eyebrow">
            VOXPILOT PLANNER
          </span>

          <h2>Build your study plan</h2>

          <p>
            Tell VoxPilot what you're preparing for and
            we'll organize your study time.
          </p>
        </div>
      </div>

      <form
        className="planner-form"
        onSubmit={generatePlan}
      >
        <div className="planner-field">
          <label>Subject / Exam</label>

          <input
            type="text"
            placeholder="e.g. Design and Analysis of Algorithms"
            value={subject}
            onChange={(event) =>
              setSubject(event.target.value)
            }
          />
        </div>

        <div className="planner-field">
          <label>Exam date</label>

          <input
            type="date"
            value={examDate}
            onChange={(event) =>
              setExamDate(event.target.value)
            }
          />
        </div>

        <div className="planner-field">
          <label>Study hours per day</label>

          <select
            value={hours}
            onChange={(event) =>
              setHours(event.target.value)
            }
          >
            <option value="1">1 hour</option>
            <option value="2">2 hours</option>
            <option value="3">3 hours</option>
            <option value="4">4 hours</option>
            <option value="5">5 hours</option>
            <option value="6">6 hours</option>
            <option value="8">8 hours</option>
          </select>
        </div>

        <button
          className="generate-plan-button"
          type="submit"
        >
          ✨ Generate Study Plan
        </button>
      </form>

      {daysLeft > 0 && (
        <div className="planner-summary">
          <div>
            <span>Exam</span>
            <strong>{subject || 'Your exam'}</strong>
          </div>

          <div>
            <span>Days left</span>
            <strong>{daysLeft}</strong>
          </div>

          <div>
            <span>Daily target</span>
            <strong>{hours} hrs</strong>
          </div>
        </div>
      )}

      {plan.length > 0 && (
        <div className="study-plan">
          <div className="study-plan-title">
            <div>
              <h3>Your study schedule</h3>
              <p>
                A focused plan leading up to your exam.
              </p>
            </div>
          </div>

          <div className="study-session-list">
            {plan.map((session) => (
              <div
                className="study-session"
                key={session.day}
              >
                <div className="study-day">
                  <span>DAY</span>
                  <strong>{session.day}</strong>
                </div>

                <div className="study-session-content">
                  <strong>{session.topic}</strong>

                  <span>
                    {session.date} · {session.hours}{' '}
                    hour
                    {session.hours !== '1' ? 's' : ''}
                  </span>
                </div>

                <div className="study-session-badge">
                  {session.day === plan.length
                    ? 'Final'
                    : 'Study'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {plan.length === 0 && (
        <div className="planner-empty">
          <div className="planner-empty-icon">📚</div>

          <h3>Ready when you are</h3>

          <p>
            Enter your exam details above to generate
            your personalized study schedule.
          </p>
        </div>
      )}
    </section>
  )
}

export default StudyPlanner