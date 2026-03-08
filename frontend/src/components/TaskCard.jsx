import './TaskCard.css'

function TaskCard({ task, onUpdateStatus, onDelete, style }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const isOverdue = () => {
    return new Date(task.due_date) < new Date() && task.status !== 'completed'
  }

  const getStatusColor = () => {
    switch (task.status) {
      case 'pending':
        return 'status-pending'
      case 'in_progress':
        return 'status-progress'
      case 'completed':
        return 'status-completed'
      default:
        return ''
    }
  }

  const getStatusLabel = () => {
    switch (task.status) {
      case 'pending':
        return 'Pending'
      case 'in_progress':
        return 'In Progress'
      case 'completed':
        return 'Completed'
      default:
        return task.status
    }
  }

  return (
    <div className={`task-card ${getStatusColor()} animate-slide-in`} style={style}>
      <div className="task-header">
        <span className={`status-badge ${getStatusColor()}`}>
          {getStatusLabel()}
        </span>
        <button
          className="delete-btn"
          onClick={() => onDelete(task.id)}
          title="Delete task"
        >
          ×
        </button>
      </div>

      <h3 className="task-title">{task.title}</h3>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        <div className="due-date">
          <span className="meta-label">Due:</span>
          <span className={`meta-value ${isOverdue() ? 'overdue' : ''}`}>
            {formatDate(task.due_date)}
          </span>
        </div>
        {isOverdue() && (
          <span className="overdue-badge">⚠️ Overdue</span>
        )}
      </div>

      <div className="task-actions">
        <select
          value={task.status}
          onChange={(e) => onUpdateStatus(task.id, e.target.value)}
          className="status-select"
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  )
}

export default TaskCard
