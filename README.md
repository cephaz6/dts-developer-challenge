# HMCTS Task Manager

**Developed by Cephas**

A full-stack task management system designed for HMCTS caseworkers to efficiently manage their tasks. Built with FastAPI (Python) backend and React frontend.

![Task Manager Preview](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)

## Overview

This system provides a complete task management solution with:
- RESTful API backend with SQLite database
- Modern React frontend with professional UI
- Full CRUD operations for tasks
- Task status tracking (Pending, In Progress, Completed)
- Due date management with overdue warnings
- Comprehensive unit tests
- Input validation and error handling

## Tech Stack

### Backend
- **Framework**: FastAPI
- **Database**: SQLite
- **Validation**: Pydantic
- **Testing**: pytest
- **Language**: Python 3.8+

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Testing**: Vitest + React Testing Library
- **Styling**: Custom CSS

## Quick Start

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the API server:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

4. Run tests:
```bash
pytest test_main.py -v
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

4. Run tests:
```bash
npm test
```

## API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Root endpoint |
| POST | `/tasks` | Create a new task |
| GET | `/tasks` | Retrieve all tasks |
| GET | `/tasks/{id}` | Retrieve specific task |
| PATCH | `/tasks/{id}` | Update task status |
| DELETE | `/tasks/{id}` | Delete a task |

## Features

### Task Management
- ✅ Create tasks with title, description, status, and due date
- ✅ View all tasks in an organized dashboard
- ✅ Update task status (Pending → In Progress → Completed)
- ✅ Delete tasks with confirmation
- ✅ Automatic overdue detection
- ✅ Task statistics overview

### User Interface
- 🎨 Professional dark theme with gold accents
- 📱 Fully responsive design
- ⚡ Smooth animations and transitions
- 🔔 Visual overdue task warnings
- 📊 Real-time task statistics

### Code Quality
- ✅ Comprehensive unit tests
- ✅ Input validation
- ✅ Error handling
- ✅ Clean, maintainable code
- ✅ RESTful API design

## Project Structure

```
hmcts-task-manager/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── test_main.py         # Backend tests
│   ├── requirements.txt     # Python dependencies
│   └── README.md            # Backend documentation
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── api.js          # API service
│   │   ├── App.jsx         # Main component
│   │   └── main.jsx        # Entry point
│   ├── package.json         # Node dependencies
│   └── README.md            # Frontend documentation
└── README.md                # This file
```

## Task Model

```json
{
  "id": 1,
  "title": "Review case files",
  "description": "Review all pending case files for upcoming hearing",
  "status": "pending",
  "due_date": "2024-12-31T23:59:59",
  "created_at": "2024-01-01T00:00:00"
}
```

### Status Values
- `pending` - Task not yet started
- `in_progress` - Task currently being worked on
- `completed` - Task finished

## Development

### Running Both Services

**Terminal 1 - Backend:**
```bash
cd backend
uvicorn main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Running Tests

**Backend:**
```bash
cd backend
pytest test_main.py -v
```

**Frontend:**
```bash
cd frontend
npm test
```

## Production Deployment

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Frontend
```bash
cd frontend
npm run build
# Serve the dist folder with your preferred static file server
```

## API Examples

### Create a Task
```bash
curl -X POST "http://localhost:8000/tasks" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Review case files",
    "description": "Review all pending case files",
    "status": "pending",
    "due_date": "2024-12-31T23:59:59"
  }'
```

### Get All Tasks
```bash
curl "http://localhost:8000/tasks"
```

### Update Task Status
```bash
curl -X PATCH "http://localhost:8000/tasks/1" \
  -H "Content-Type: application/json" \
  -d '{"status": "in_progress"}'
```

### Delete a Task
```bash
curl -X DELETE "http://localhost:8000/tasks/1"
```

## Design Decisions

- **SQLite Database**: Chosen for simplicity and zero configuration
- **FastAPI**: Modern, fast framework with automatic API documentation
- **React with Vite**: Fast development experience with modern tooling
- **Custom CSS**: Full control over design without framework overhead
- **Glassmorphism UI**: Professional, modern aesthetic suitable for government systems

## Future Enhancements

- User authentication and authorization
- Task assignment to specific caseworkers
- Task priority levels
- Task categories/tags
- Search and filter functionality
- Task history and audit log
- Email notifications for overdue tasks
- File attachments

## License

This project was developed as a technical test submission.

## Author

**Cephas**

---

*Developed for HMCTS Technical Assessment - DTS Developer Role*
