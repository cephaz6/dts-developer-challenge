from fastapi.testclient import TestClient
from main import app, init_db, DB_PATH
import os
from datetime import datetime, timedelta

client = TestClient(app)

def setup_module():
    if os.path.exists(DB_PATH):
        os.remove(DB_PATH)
    init_db()

def teardown_module():
    if os.path.exists(DB_PATH):
        os.remove(DB_PATH)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert "Cephas" in response.json()["message"]

def test_create_task():
    due_date = (datetime.now() + timedelta(days=7)).isoformat()
    response = client.post("/tasks", json={
        "title": "Review case files",
        "description": "Review all pending case files",
        "status": "pending",
        "due_date": due_date
    })
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Review case files"
    assert data["status"] == "pending"
    assert "id" in data

def test_create_task_without_description():
    due_date = (datetime.now() + timedelta(days=3)).isoformat()
    response = client.post("/tasks", json={
        "title": "Court hearing",
        "status": "pending",
        "due_date": due_date
    })
    assert response.status_code == 201
    assert response.json()["description"] is None

def test_create_task_invalid_title():
    due_date = (datetime.now() + timedelta(days=1)).isoformat()
    response = client.post("/tasks", json={
        "title": "",
        "status": "pending",
        "due_date": due_date
    })
    assert response.status_code == 422

def test_get_all_tasks():
    response = client.get("/tasks")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_task_by_id():
    due_date = (datetime.now() + timedelta(days=5)).isoformat()
    create_response = client.post("/tasks", json={
        "title": "Document review",
        "status": "pending",
        "due_date": due_date
    })
    task_id = create_response.json()["id"]
    
    response = client.get(f"/tasks/{task_id}")
    assert response.status_code == 200
    assert response.json()["id"] == task_id

def test_get_task_not_found():
    response = client.get("/tasks/99999")
    assert response.status_code == 404

def test_update_task_status():
    due_date = (datetime.now() + timedelta(days=2)).isoformat()
    create_response = client.post("/tasks", json={
        "title": "Update records",
        "status": "pending",
        "due_date": due_date
    })
    task_id = create_response.json()["id"]
    
    response = client.patch(f"/tasks/{task_id}", json={
        "status": "in_progress"
    })
    assert response.status_code == 200
    assert response.json()["status"] == "in_progress"

def test_update_task_not_found():
    response = client.patch("/tasks/99999", json={
        "status": "completed"
    })
    assert response.status_code == 404

def test_delete_task():
    due_date = (datetime.now() + timedelta(days=1)).isoformat()
    create_response = client.post("/tasks", json={
        "title": "Temporary task",
        "status": "pending",
        "due_date": due_date
    })
    task_id = create_response.json()["id"]
    
    response = client.delete(f"/tasks/{task_id}")
    assert response.status_code == 204
    
    get_response = client.get(f"/tasks/{task_id}")
    assert get_response.status_code == 404

def test_delete_task_not_found():
    response = client.delete("/tasks/99999")
    assert response.status_code == 404
