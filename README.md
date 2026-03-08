# HMCTS Task Manager

**Developed by Cephas**

A full-stack task management system designed for HMCTS caseworkers to
efficiently manage their tasks. Built with FastAPI (Python) backend and React
frontend.

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

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Start the virtual env and Install dependencies:

```bash
python -m venv venv
source venv\Scripts\activate     # On Windows
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

| Method | Endpoint      | Description            |
| ------ | ------------- | ---------------------- |
| GET    | `/`           | Root endpoint          |
| POST   | `/tasks`      | Create a new task      |
| GET    | `/tasks`      | Retrieve all tasks     |
| GET    | `/tasks/{id}` | Retrieve specific task |
| PATCH  | `/tasks/{id}` | Update task status     |
| DELETE | `/tasks/{id}` | Delete a task          |

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

###

thank you, Cephas.
