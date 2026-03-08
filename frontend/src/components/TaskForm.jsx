import { useState } from 'react'
import './TaskForm.css'

function TaskForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('pending')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!title.trim() || !dueDate) {
      alert('Please fill in all required fields')
      return
    }

    const taskData = {
      title: title.trim(),
      description: description.trim() || null,
      status,
      due_date: new Date(dueDate).toISOString()
    }

    onSubmit(taskData)
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Create New Task</h2>
      
      <div className="form-group">
        <label htmlFor="title">Task Title *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          maxLength="200"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add task details (optional)"
          rows="4"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="status">Status *</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date *</label>
          <input
            id="dueDate"
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn-submit">
          Create Task
        </button>
      </div>
    </form>
  )
}

export default TaskForm
