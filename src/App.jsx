import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TaskBoardPage from './pages/TaskBoardPage';
import TaskDetailPage from './pages/TaskDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import { loadTasks, saveTasks } from './services/taskStorage';
import './App.css';

const API_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=10';

/**
 * App Component
 * Serves as the single source of truth for task data.
 * Priority Strategy (Phase 6):
 * 1. Checks localStorage for existing user task data.
 * 2. If no valid saved data exists, fetches seed tasks from JSONPlaceholder API and persists them.
 * 3. Keeps local React state synchronized with localStorage on user modifications (Add/Edit/Delete/Toggle).
 */
function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Fetch initial seed tasks from JSONPlaceholder API
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
      setIsInitialized(true);
    } catch (err) {
      setError(err.message || 'An error occurred while connecting to the tasks API.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load strategy: load from localStorage if valid; otherwise fetch from API
  useEffect(() => {
    const savedTasks = loadTasks();
    if (savedTasks !== null) {
      setTasks(savedTasks);
      setLoading(false);
      setIsInitialized(true);
    } else {
      fetchTasks();
    }
  }, [fetchTasks]);

  // Sync local React state changes to localStorage after initialization
  useEffect(() => {
    if (isInitialized) {
      saveTasks(tasks);
    }
  }, [tasks, isInitialized]);

  // Core task state handlers (local updates post-initialization)
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
          <p>Task Board Internship Assignment — Phase 6</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
