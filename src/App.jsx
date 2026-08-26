import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TaskBoardPage from './pages/TaskBoardPage';
import TaskDetailPage from './pages/TaskDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

// Initial sample task data
const INITIAL_SAMPLE_TASKS = [
  { id: 1, title: 'Set up Vite + React project foundation', completed: true },
  { id: 2, title: 'Configure React Router dynamic routes', completed: true },
  { id: 3, title: 'Build reusable component architecture', completed: false },
  { id: 4, title: 'Fetch seed tasks from JSONPlaceholder API', completed: false },
  { id: 5, title: 'Persist task state using localStorage', completed: false },
];

/**
 * App Component
 * Holds top-level task state so routes (TaskBoardPage & TaskDetailPage)
 * share the same single source of truth without duplicating data.
 */
function App() {
  const [tasks, setTasks] = useState(INITIAL_SAMPLE_TASKS);

  // Core task state handlers
  const handleAddTask = (title) => {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
  };

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleUpdateTask = (id, newTitle) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <TaskBoardPage
                  tasks={tasks}
                  onAddTask={handleAddTask}
                  onToggleTask={handleToggleTask}
                  onDeleteTask={handleDeleteTask}
                  onUpdateTask={handleUpdateTask}
                />
              }
            />
            <Route
              path="/tasks/:id"
              element={
                <TaskDetailPage
                  tasks={tasks}
                  onToggleTask={handleToggleTask}
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>Task Board Internship Assignment — Phase 3</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
