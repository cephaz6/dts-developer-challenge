import axios from 'axios'

const API_URL = 'http://localhost:8000'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getTasks = async () => {
  const response = await api.get('/tasks')
  return response.data
}

export const getTask = async (id) => {
  const response = await api.get(`/tasks/${id}`)
  return response.data
}

export const createTask = async (task) => {
  const response = await api.post('/tasks', task)
  return response.data
}

export const updateTaskStatus = async (id, status) => {
  const response = await api.patch(`/tasks/${id}`, { status })
  return response.data
}

export const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`)
}
