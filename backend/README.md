# HMCTS Task Manager - Backend API

**Developed by Cephas**

A FastAPI-based REST API for managing caseworker tasks.

## Features

- Create tasks with title, description, status, and due date
- Retrieve all tasks or individual tasks by ID
- Update task status
- Delete tasks
- SQLite database storage
- Input validation and error handling
- Comprehensive unit tests

## Tech Stack

- **Framework**: FastAPI
- **Database**: SQLite
- **Validation**: Pydantic
- **Testing**: pytest

## Installation

```bash
pip install -r requirements.txt
```

## Running the API

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## Running Tests

```bash
pytest test_main.py -v
```

## API Documentation

Once running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### GET /
- **Description**: Root endpoint
- **Response**: Welcome message

### POST /tasks
- **Description**: Create a new task
- **Request Body**:
```json
{
  "title": "Review case files",
  "description": "Review all pending case files",
  "status": "pending",
  "due_date": "2024-12-31T23:59:59"
}
```
- **Response**: Created task object (201)

### GET /tasks
- **Description**: Retrieve all tasks
- **Response**: Array of task objects (200)

### GET /tasks/{task_id}
- **Description**: Retrieve a specific task
- **Response**: Task object (200) or 404 if not found

### PATCH /tasks/{task_id}
- **Description**: Update task status
- **Request Body**:
```json
{
  "status": "in_progress"
}
```
- **Response**: Updated task object (200) or 404 if not found

### DELETE /tasks/{task_id}
- **Description**: Delete a task
- **Response**: 204 No Content or 404 if not found

## Task Status Values

- `pending`: Task not yet started
- `in_progress`: Task currently being worked on
- `completed`: Task finished

## Error Handling

The API returns appropriate HTTP status codes:
- `200`: Success
- `201`: Created
- `204`: No Content (successful deletion)
- `400`: Bad Request (validation error)
- `404`: Not Found
- `422`: Unprocessable Entity (invalid input)

## Database Schema

```sql
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL,
    due_date TEXT NOT NULL,
    created_at TEXT NOT NULL
);
```

## Author

Cephas
