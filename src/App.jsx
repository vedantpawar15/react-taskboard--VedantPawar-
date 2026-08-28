import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import TaskBoardPage from './pages/TaskBoardPage';
import TaskDetailPage from './pages/TaskDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import { loadTasks, saveTasks } from './services/taskStorage';
import './App.css';

const API_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=10';
const THEME_KEY = 'react_taskboard_theme';

/**
 * App Component
 * Serves as the single source of truth for task data, theme mode, and Google Keep layout state.
 * Features:
 * - LocalStorage task data persistence & initial API seed loading strategy
 * - Dark/Light theme mode persistence & document attribute synchronization
 * - Collapsible sidebar & header search state management
 * - Task reordering handler with automatic storage sync
 */
function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Layout & Navigation State
  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'completed'
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Theme state initialization from localStorage or system preference (defaults to dark for Keep aesthetic)
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
      return 'dark'; // Dark mode default as requested
    } catch (e) {
      return 'dark';
    }
  });

  // Synchronize active theme attribute on document root & save preference
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      // Ignore storage write errors
    }
  }, [theme]);

  // Toggle active theme mode
  const handleToggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Toggle view mode
  const handleToggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === 'grid' ? 'list' : 'grid'));
  };

  // Toggle sidebar collapsed state
  const handleToggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

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

  // Reorder task items array position
  const handleReorderTasks = (startIndex, endIndex) => {
    setTasks((prevTasks) => {
      const updated = [...prevTasks];
      const [moved] = updated.splice(startIndex, 1);
      updated.splice(endIndex, 0, moved);
      return updated;
    });
  };

  // Statistics calculation for sidebar counters
  const totalTasksCount = tasks.length;
  const completedTasksCount = tasks.filter((t) => t.completed).length;
  const pendingTasksCount = totalTasksCount - completedTasksCount;

  return (
    <Router>
      <div className="app-container keep-app">
        <Navbar
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onToggleSidebar={handleToggleSidebar}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          viewMode={viewMode}
          onToggleViewMode={handleToggleViewMode}
        />

        <div className="keep-app-body">
          <Sidebar
            activeFilter={filter}
            onSelectFilter={setFilter}
            totalCount={totalTasksCount}
            pendingCount={pendingTasksCount}
            completedCount={completedTasksCount}
            isCollapsed={isSidebarCollapsed}
          />

          <main className="main-content keep-main-content">
            <Routes>
              <Route
                path="/"
                element={
                  <TaskBoardPage
                    tasks={tasks}
                    loading={loading}
                    error={error}
                    filter={filter}
                    setFilter={setFilter}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    viewMode={viewMode}
                    onRetry={fetchTasks}
                    onAddTask={handleAddTask}
                    onToggleTask={handleToggleTask}
                    onDeleteTask={handleDeleteTask}
                    onUpdateTask={handleUpdateTask}
                    onReorderTasks={handleReorderTasks}
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
                    onUpdateTask={handleUpdateTask}
                    onDeleteTask={handleDeleteTask}
                  />
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
