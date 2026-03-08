import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import App from './App'
import * as api from './api'

vi.mock('./api')

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders app header', async () => {
    api.getTasks.mockResolvedValue([])
    render(<App />)
    expect(screen.getByText(/HMCTS Task Manager/i)).toBeInTheDocument()
    expect(screen.getByText(/Developed by Cephas/i)).toBeInTheDocument()
  })

  it('displays loading state', async () => {
    api.getTasks.mockImplementation(() => new Promise(() => {}))
    render(<App />)
    expect(screen.getByText(/Loading tasks/i)).toBeInTheDocument()
  })

  it('displays empty state when no tasks', async () => {
    api.getTasks.mockResolvedValue([])
    render(<App />)
    await waitFor(() => {
      expect(screen.getByText(/No tasks yet/i)).toBeInTheDocument()
    })
  })

  it('displays tasks when loaded', async () => {
    const mockTasks = [
      {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        status: 'pending',
        due_date: '2024-12-31T23:59:59',
        created_at: '2024-01-01T00:00:00'
      }
    ]
    api.getTasks.mockResolvedValue(mockTasks)
    
    render(<App />)
    await waitFor(() => {
      expect(screen.getByText('Test Task')).toBeInTheDocument()
    })
  })

  it('shows form when new task button clicked', async () => {
    api.getTasks.mockResolvedValue([])
    render(<App />)
    
    await waitFor(() => {
      const newTaskButton = screen.getByText(/New Task/i)
      fireEvent.click(newTaskButton)
    })
    
    expect(screen.getByText(/Create New Task/i)).toBeInTheDocument()
  })

  it('handles error when loading tasks fails', async () => {
    api.getTasks.mockRejectedValue(new Error('Network error'))
    render(<App />)
    
    await waitFor(() => {
      expect(screen.getByText(/Failed to load tasks/i)).toBeInTheDocument()
    })
  })
})

describe('TaskForm Component', () => {
  it('submits task with valid data', async () => {
    api.getTasks.mockResolvedValue([])
    api.createTask.mockResolvedValue({})
    
    render(<App />)
    
    await waitFor(() => {
      fireEvent.click(screen.getByText(/New Task/i))
    })
    
    fireEvent.change(screen.getByPlaceholderText(/Enter task title/i), {
      target: { value: 'New Task' }
    })
    
    fireEvent.change(screen.getByLabelText(/Due Date/i), {
      target: { value: '2024-12-31T23:59' }
    })
    
    fireEvent.click(screen.getByText(/Create Task/i))
    
    await waitFor(() => {
      expect(api.createTask).toHaveBeenCalled()
    })
  })
})
