import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TaskBoardPage from './pages/TaskBoardPage';
import TaskDetailPage from './pages/TaskDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

const API_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=10';

/**
 * App Component
 * Serves as the single source of truth for task data.
 * Fetches seed tasks from JSONPlaceholder API on mount,
 * manages loading & error state, and handles local CRUD updates.
 */
function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial tasks from JSONPlaceholder API
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch tasks (HTTP status: ${response.status})`);
      }
      const data = await response.json();

      // Map API object schema to application task schema
      const mappedTasks = data.map((item) => ({
        id: item.id,
        title: item.title,
        completed: Boolean(item.completed),
      }));

      setTasks(mappedTasks);
    } catch (err) {
      setError(err.message || 'An error occurred while connecting to the tasks API.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch seed tasks on initial component mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Core task state handlers (local updates post-API load)
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
                  loading={loading}
                  error={error}
                  onRetry={fetchTasks}
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
                  loading={loading}
                  onToggleTask={handleToggleTask}
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>Task Board Internship Assignment — Phase 5</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
