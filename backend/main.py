from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum
import sqlite3
import os

app = FastAPI(title="HMCTS Task Manager API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = "tasks.db"

class TaskStatus(str, Enum):
    pending = "pending"
    in_progress = "in_progress"
    completed = "completed"

class TaskCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = None
    status: TaskStatus = TaskStatus.pending
    due_date: datetime

class TaskUpdate(BaseModel):
    status: TaskStatus

class Task(BaseModel):
    id: int
    title: str
    description: Optional[str]
    status: TaskStatus
    due_date: datetime
    created_at: datetime

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            status TEXT NOT NULL,
            due_date TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

@app.on_event("startup")
async def startup():
    init_db()

@app.get("/")
async def root():
    return {"message": "HMCTS Task Manager API - Developed by Cephas"}

@app.post("/tasks", response_model=Task, status_code=201)
async def create_task(task: TaskCreate):
    conn = get_db()
    cursor = conn.cursor()
    
    try:
        cursor.execute(
            """INSERT INTO tasks (title, description, status, due_date, created_at) 
               VALUES (?, ?, ?, ?, ?)""",
            (task.title, task.description, task.status.value, 
             task.due_date.isoformat(), datetime.now().isoformat())
        )
        conn.commit()
        task_id = cursor.lastrowid
        
        cursor.execute("SELECT * FROM tasks WHERE id = ?", (task_id,))
        row = cursor.fetchone()
        return dict(row)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        conn.close()

@app.get("/tasks", response_model=list[Task])
async def get_tasks():
    conn = get_db()
    cursor = conn.cursor()
    
    try:
        cursor.execute("SELECT * FROM tasks ORDER BY due_date ASC")
        rows = cursor.fetchall()
        return [dict(row) for row in rows]
    finally:
        conn.close()

@app.get("/tasks/{task_id}", response_model=Task)
async def get_task(task_id: int):
    conn = get_db()
    cursor = conn.cursor()
    
    try:
        cursor.execute("SELECT * FROM tasks WHERE id = ?", (task_id,))
        row = cursor.fetchone()
        
        if not row:
            raise HTTPException(status_code=404, detail="Task not found")
        
        return dict(row)
    finally:
        conn.close()

@app.patch("/tasks/{task_id}", response_model=Task)
async def update_task(task_id: int, task_update: TaskUpdate):
    conn = get_db()
    cursor = conn.cursor()
    
    try:
        cursor.execute("SELECT * FROM tasks WHERE id = ?", (task_id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="Task not found")
        
        cursor.execute(
            "UPDATE tasks SET status = ? WHERE id = ?",
            (task_update.status.value, task_id)
        )
        conn.commit()
        
        cursor.execute("SELECT * FROM tasks WHERE id = ?", (task_id,))
        row = cursor.fetchone()
        return dict(row)
    finally:
        conn.close()

@app.delete("/tasks/{task_id}", status_code=204)
async def delete_task(task_id: int):
    conn = get_db()
    cursor = conn.cursor()
    
    try:
        cursor.execute("SELECT * FROM tasks WHERE id = ?", (task_id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="Task not found")
        
        cursor.execute("DELETE FROM tasks WHERE id = ?", (task_id,))
        conn.commit()
    finally:
        conn.close()
