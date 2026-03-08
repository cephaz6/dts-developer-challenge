import TaskCard from './TaskCard'
import './TaskList.css'

function TaskList({ tasks, onUpdateStatus, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📋</div>
        <h3>No tasks yet</h3>
        <p>Create your first task to get started</p>
      </div>
    )
  }

  const pending = tasks.filter(t => t.status === 'pending')
  const inProgress = tasks.filter(t => t.status === 'in_progress')
  const completed = tasks.filter(t => t.status === 'completed')

  return (
    <div className="task-list">
      <div className="task-stats">
        <div className="stat">
          <span className="stat-value">{pending.length}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat">
          <span className="stat-value">{inProgress.length}</span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat">
          <span className="stat-value">{completed.length}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat">
          <span className="stat-value">{tasks.length}</span>
          <span className="stat-label">Total</span>
        </div>
      </div>

      <div className="tasks-grid">
        {tasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={task}
            onUpdateStatus={onUpdateStatus}
            onDelete={onDelete}
            style={{ animationDelay: `${index * 0.05}s` }}
          />
        ))}
      </div>
    </div>
  )
}

export default TaskList
