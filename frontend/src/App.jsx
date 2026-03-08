import { useState, useEffect } from 'react'
import { getTasks, createTask, updateTaskStatus, deleteTask } from './api'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      setLoading(true)
      const data = await getTasks()
      setTasks(data)
      setError(null)
    } catch (err) {
      setError('Failed to load tasks. Please ensure the backend is running.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = async (taskData) => {
    try {
      await createTask(taskData)
      await loadTasks()
      setShowForm(false)
    } catch (err) {
      setError('Failed to create task')
      console.error(err)
    }
  }

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateTaskStatus(id, status)
      await loadTasks()
    } catch (err) {
      setError('Failed to update task')
      console.error(err)
    }
  }

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id)
        await loadTasks()
      } catch (err) {
        setError('Failed to delete task')
        console.error(err)
      }
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="header-top">
            <div className="logo-section">
              <h1 className="title">HMCTS Task Manager</h1>
              <span className="subtitle">Caseworker Task Management System</span>
            </div>
            <button 
              className="btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? '← Back' : '+ New Task'}
            </button>
          </div>
          <div className="developer-tag">Developed by Cephas</div>
        </div>
      </header>

      <main className="main">
        <div className="container">
          {error && (
            <div className="error-banner">
              {error}
              <button onClick={() => setError(null)}>×</button>
            </div>
          )}

          {showForm ? (
            <div className="form-section animate-fade-in">
              <TaskForm onSubmit={handleCreateTask} onCancel={() => setShowForm(false)} />
            </div>
          ) : (
            <>
              {loading ? (
                <div className="loading">
                  <div className="spinner"></div>
                  <p>Loading tasks...</p>
                </div>
              ) : (
                <TaskList
                  tasks={tasks}
                  onUpdateStatus={handleUpdateStatus}
                  onDelete={handleDeleteTask}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
