# HMCTS Task Manager - Setup Instructions

**Developed by Cephas**

## Complete Setup Guide

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd hmcts-task-manager
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the backend server
uvicorn main:app --reload
```

The API will be available at: http://localhost:8000
API Documentation: http://localhost:8000/docs

### Step 3: Frontend Setup (New Terminal)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at: http://localhost:3000

### Step 4: Verify Installation

1. Open http://localhost:8000/docs in your browser - you should see the API documentation
2. Open http://localhost:3000 in your browser - you should see the task manager interface
3. Try creating a task to verify everything works

## Running Tests

### Backend Tests
```bash
cd backend
pytest test_main.py -v
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Common Issues

### Issue: Port already in use
**Solution**: Change the port in the respective configuration files or kill the process using the port.

### Issue: Module not found errors
**Solution**: Ensure you've activated the virtual environment (backend) or run npm install (frontend).

### Issue: CORS errors
**Solution**: The backend is configured to allow all origins. Ensure the backend is running on port 8000.

### Issue: Database errors
**Solution**: Delete the `tasks.db` file and restart the backend server to recreate the database.

## Production Deployment Notes

1. **Backend**: Use a production ASGI server like Gunicorn with Uvicorn workers
2. **Frontend**: Build the production bundle with `npm run build` and serve with nginx or similar
3. **Database**: Consider migrating to PostgreSQL for production use
4. **Environment Variables**: Use environment variables for configuration
5. **Security**: Implement authentication and HTTPS in production

## Project Architecture

```
Frontend (React)
    ↓
  HTTP/REST
    ↓
Backend (FastAPI)
    ↓
Database (SQLite)
```

## Support

For issues or questions, please refer to the README.md files in each directory or create an issue in the repository.

---

**Author**: Cephas
**Version**: 1.0.0
**Last Updated**: 2024
