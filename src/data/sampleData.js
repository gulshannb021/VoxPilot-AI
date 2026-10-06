export const sampleTasks = [
  {
    id: '1',
    title: 'Review lecture notes on neural networks',
    priority: 'High',
    status: 'Pending',
  },
  {
    id: '2',
    title: 'Record voice notes for biology chapter 4',
    priority: 'Medium',
    status: 'In progress',
  },
  {
    id: '3',
    title: 'Complete calculus problem set',
    priority: 'High',
    status: 'Completed',
  },
  {
    id: '4',
    title: 'Schedule a focused study block for tomorrow',
    priority: 'Low',
    status: 'Pending',
  },
  {
    id: '5',
    title: 'Summarize yesterday’s meeting recap',
    priority: 'Medium',
    status: 'Completed',
  },
  {
    id: '6',
    title: 'Prep flashcards for organic chemistry',
    priority: 'High',
    status: 'Pending',
  },
]

export function getTaskStats(tasks) {
  const total = tasks.length
  const completed = tasks.filter((task) => task.status === 'Completed').length
  const pending = tasks.filter((task) => task.status !== 'Completed').length
  const highPriority = tasks.filter((task) => task.priority === 'High').length

  return { total, completed, pending, highPriority }
}
