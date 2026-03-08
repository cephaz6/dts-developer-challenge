# HMCTS Task Manager - Frontend

**Developed by Cephas**

A modern React-based frontend application for managing caseworker tasks with an elegant, professional interface.

## Features

- Create new tasks with title, description, status, and due date
- View all tasks in a card-based layout
- Update task status with dropdown selectors
- Delete tasks with confirmation
- Real-time task statistics dashboard
- Overdue task warnings
- Responsive design for mobile and desktop
- Professional dark theme with gold accents

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Testing**: Vitest + React Testing Library
- **Styling**: Custom CSS with modern design system

## Installation

```bash
npm install
```

## Running the Application

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

**Note**: Ensure the backend API is running on `http://localhost:8000` before starting the frontend.

## Running Tests

```bash
npm test
```

## Building for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## Project Structure

```
src/
├── components/
│   ├── TaskCard.jsx       # Individual task card component
│   ├── TaskCard.css       # Task card styles
│   ├── TaskForm.jsx       # Create task form component
│   ├── TaskForm.css       # Form styles
│   ├── TaskList.jsx       # Task list container
│   └── TaskList.css       # List styles
├── api.js                 # API service functions
├── App.jsx                # Main application component
├── App.css                # App-level styles
├── main.jsx               # Application entry point
├── index.css              # Global styles and design system
└── App.test.jsx           # Component tests
```

## Design System

### Colors
- **Navy**: Primary background color
- **Deep Blue**: Secondary background
- **Accent Gold**: Highlight color for interactive elements
- **Cream**: Primary text color
- **Status Colors**: Pending (yellow), In Progress (blue), Completed (green)

### Typography
- **Headers**: Crimson Pro (serif)
- **Body**: Work Sans (sans-serif)

### Key Features
- Glassmorphism effects with backdrop blur
- Smooth animations and transitions
- Responsive grid layouts
- Professional card-based design
- Accessible form controls

## API Integration

The frontend communicates with the backend API through the `api.js` service module:

- `getTasks()` - Fetch all tasks
- `getTask(id)` - Fetch single task
- `createTask(data)` - Create new task
- `updateTaskStatus(id, status)` - Update task status
- `deleteTask(id)` - Delete task

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Author

Cephas
