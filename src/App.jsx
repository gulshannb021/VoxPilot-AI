import { useEffect, useMemo, useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import WelcomeHeader from './components/WelcomeHeader.jsx'
import ProgressCard from './components/ProgressCard.jsx'
import StatCards from './components/StatCards.jsx'
import TaskList from './components/TaskList.jsx'
import PlaceholderPage from './components/PlaceholderPage.jsx'
import VoiceCommand from './components/VoiceCommand.jsx'
import StudyPlanner from './components/StudyPlanner.jsx'
import Analytics from './components/Analytics.jsx'
import { sampleTasks } from './data/sampleData.js'
import './App.css'

const STORAGE_KEY = 'voxpilot-tasks'

function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : sampleTasks
    } catch {
      return sampleTasks
    }
  })

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [showAddForm, setShowAddForm] = useState(false)

  const [newTask, setNewTask] = useState({
    title: '',
    priority: 'Medium',
    dueDate: '',
    category: 'Study',
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const stats = useMemo(() => {
    const total = tasks.length

    const completed = tasks.filter(
      (task) => task.status === 'Completed'
    ).length

    const pending = tasks.filter(
      (task) => task.status !== 'Completed'
    ).length

    const highPriority = tasks.filter(
      (task) => task.priority === 'High'
    ).length

    return {
      total,
      completed,
      pending,
      highPriority,
    }
  }, [tasks])

  const filteredTasks = useMemo(() => {
    const today = new Date().toISOString().split('T')[0]

    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase())

      if (!matchesSearch) return false

      if (filter === 'completed') {
        return task.status === 'Completed'
      }

      if (filter === 'pending') {
        return task.status !== 'Completed'
      }

      if (filter === 'high') {
        return task.priority === 'High'
      }

      if (filter === 'today') {
        return task.dueDate === today
      }

      return true
    })
  }, [tasks, search, filter])

  const handleNavigate = (page) => {
    setActivePage(page)
    setSidebarOpen(false)
  }

  const handleAddTask = (event) => {
    event.preventDefault()

    if (!newTask.title.trim()) {
      alert('Please enter a task title.')
      return
    }

    const task = {
      id: Date.now().toString(),
      title: newTask.title.trim(),
      priority: newTask.priority,
      status: 'Pending',
      dueDate: newTask.dueDate,
      category: newTask.category,
    }

    setTasks((current) => [task, ...current])

    setNewTask({
      title: '',
      priority: 'Medium',
      dueDate: '',
      category: 'Study',
    })

    setShowAddForm(false)
  }

  const handleToggleComplete = (id) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === 'Completed'
                  ? 'Pending'
                  : 'Completed',
            }
          : task
      )
    )
  }

  const handleDelete = (id) => {
    setTasks((current) =>
      current.filter((task) => task.id !== id)
    )
  }

  const handleEdit = (id) => {
    const task = tasks.find((item) => item.id === id)

    if (!task) return

    const title = window.prompt(
      'Edit task title:',
      task.title
    )

    if (!title || !title.trim()) return

    const priority = window.prompt(
      'Priority: High, Medium, or Low',
      task.priority
    )

    const validPriority = ['High', 'Medium', 'Low'].includes(
      priority
    )
      ? priority
      : task.priority

    setTasks((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              title: title.trim(),
              priority: validPriority,
            }
          : item
      )
    )
  }

  const resetSampleTasks = () => {
    setTasks(sampleTasks)
    localStorage.removeItem(STORAGE_KEY)
  }

  const handleVoiceCommand = (command) => {
    const text = command.toLowerCase()

    // ADD TASK
    if (
      text.startsWith('add ') ||
      text.includes('create task')
    ) {
      let title = command
        .replace(/^add\s+/i, '')
        .replace(/^create task\s*/i, '')
        .trim()

      let priority = 'Medium'

      if (text.includes('high priority')) {
        priority = 'High'
        title = title.replace(/high priority/gi, '')
      } else if (text.includes('low priority')) {
        priority = 'Low'
        title = title.replace(/low priority/gi, '')
      } else if (text.includes('medium priority')) {
        priority = 'Medium'
        title = title.replace(/medium priority/gi, '')
      }

      let dueDate = ''

      if (text.includes('tomorrow')) {
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        dueDate = tomorrow.toISOString().split('T')[0]

        title = title.replace(/tomorrow/gi, '')
      }

      title = title
        .replace(/\bto\b$/i, '')
        .trim()

      if (!title) {
        alert('Please say the task title.')
        return
      }

      const task = {
        id: Date.now().toString(),
        title,
        priority,
        status: 'Pending',
        dueDate,
        category: 'Voice',
      }

      setTasks((current) => [task, ...current])

      return
    }

    // COMPLETE TASK
    if (text.startsWith('complete ')) {
      const title = text
        .replace(/^complete\s+/i, '')
        .trim()

      setTasks((current) =>
        current.map((task) =>
          task.title.toLowerCase().includes(title)
            ? {
                ...task,
                status: 'Completed',
              }
            : task
        )
      )

      return
    }

    // DELETE TASK
    if (text.startsWith('delete ')) {
      const title = text
        .replace(/^delete\s+/i, '')
        .trim()

      setTasks((current) =>
        current.filter(
          (task) =>
            !task.title.toLowerCase().includes(title)
        )
      )
    }
  }

  const taskWorkspace = (
    <>
      <div className="task-workspace-controls">
        <div>
          <h2>Your Tasks</h2>
          <p>Manage your tasks with VoxPilot.</p>
        </div>

        <button
          className="add-task-button"
          onClick={() =>
            setShowAddForm((value) => !value)
          }
        >
          {showAddForm ? 'Close' : '+ Add Task'}
        </button>

        <VoiceCommand
          onCommand={handleVoiceCommand}
        />
      </div>

      {showAddForm && (
        <form
          className="add-task-form"
          onSubmit={handleAddTask}
        >
          <input
            type="text"
            placeholder="What do you need to do?"
            value={newTask.title}
            onChange={(event) =>
              setNewTask({
                ...newTask,
                title: event.target.value,
              })
            }
            autoFocus
          />

          <select
            value={newTask.priority}
            onChange={(event) =>
              setNewTask({
                ...newTask,
                priority: event.target.value,
              })
            }
          >
            <option value="High">High priority</option>
            <option value="Medium">Medium priority</option>
            <option value="Low">Low priority</option>
          </select>

          <input
            type="date"
            value={newTask.dueDate}
            onChange={(event) =>
              setNewTask({
                ...newTask,
                dueDate: event.target.value,
              })
            }
          />

          <select
            value={newTask.category}
            onChange={(event) =>
              setNewTask({
                ...newTask,
                category: event.target.value,
              })
            }
          >
            <option value="Study">Study</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Other">Other</option>
          </select>

          <button type="submit">
            Create Task
          </button>
        </form>
      )}

      <div className="task-tools">
        <input
          className="task-search"
          type="search"
          placeholder="Search tasks..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

        <div className="task-filters">
          <button
            className={
              filter === 'all' ? 'active-filter' : ''
            }
            onClick={() => setFilter('all')}
          >
            All
          </button>

          <button
            className={
              filter === 'today' ? 'active-filter' : ''
            }
            onClick={() => setFilter('today')}
          >
            Today
          </button>

          <button
            className={
              filter === 'pending' ? 'active-filter' : ''
            }
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>

          <button
            className={
              filter === 'completed'
                ? 'active-filter'
                : ''
            }
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>

          <button
            className={
              filter === 'high' ? 'active-filter' : ''
            }
            onClick={() => setFilter('high')}
          >
            High Priority
          </button>
        </div>
      </div>

      <TaskList
        tasks={filteredTasks}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      {tasks.length === 0 && (
        <button
          className="reset-button"
          onClick={resetSampleTasks}
        >
          Restore sample tasks
        </button>
      )}
    </>
  )

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="main-area">
        {activePage === 'dashboard' && (
          <>
            <WelcomeHeader
              onMenuClick={() =>
                setSidebarOpen(true)
              }
            />

            <ProgressCard
              completed={stats.completed}
              total={stats.total}
            />

            <StatCards stats={stats} />

            {taskWorkspace}
          </>
        )}

        {activePage === 'tasks' && (
          <>
            <WelcomeHeader
              compact
              onMenuClick={() =>
                setSidebarOpen(true)
              }
            />

            {taskWorkspace}
          </>
        )}
{activePage === 'planner' && (
  <>
    <WelcomeHeader
      compact
      onMenuClick={() => setSidebarOpen(true)}
    />
    <StudyPlanner />
  </>
)}
{activePage === 'analytics' && (
  <>
    <WelcomeHeader
      compact
      onMenuClick={() => setSidebarOpen(true)}
    />
    <Analytics tasks={tasks} />
  </>
)}
        {activePage !== 'dashboard' &&
          activePage !== 'tasks' &&
          activePage !== 'planner' && 
          activePage !== 'analytics' && (
            <>
              <WelcomeHeader
                compact
                onMenuClick={() =>
                  setSidebarOpen(true)
                }
              />

              <PlaceholderPage
                title={pageCopy[activePage].title}
                description={
                  pageCopy[activePage].description
                }
              />
            </>
          )}
      </main>
    </div>
  )
}

const pageCopy = {
  planner: {
    title: 'Study planner',
    description:
      'AI-powered study planning will be connected here next.',
  },
  analytics: {
    title: 'Analytics',
    description:
      'Productivity insights and completion analytics will appear here.',
  },
}

export default App