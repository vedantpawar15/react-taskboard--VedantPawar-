import React, { useState } from 'react';
import TaskBoardHeader from '../components/TaskBoardHeader';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

/**
 * TaskBoardPage Component (Route: /)
 * Receives shared tasks state, loading, error, and handlers from parent App,
 * manages local edit selection state, search query, filter mode,
 * derives visibleTasks without mutating parent state, and composes board components.
 */
function TaskBoardPage({
  tasks,
  loading,
  error,
  onRetry,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onUpdateTask,
}) {
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'completed'
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate statistics from current tasks state
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  // Derive visibleTasks based on active filter & search query
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const visibleTasks = tasks.filter((task) => {
    // 1. Filter matching
    const matchesFilter =
      filter === 'all'
        ? true
        : filter === 'completed'
        ? task.completed
        : !task.completed;

    // 2. Case-insensitive search matching
    const matchesSearch =
      normalizedQuery === ''
        ? true
        : task.title.toLowerCase().includes(normalizedQuery);

    return matchesFilter && matchesSearch;
  });

  // Edit flow handlers
  const handleStartEdit = (task) => {
    setEditingTask(task);
  };

  const handleUpdate = (id, newTitle) => {
    onUpdateTask(id, newTitle);
    setEditingTask(null);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  // Reset search and filter options back to default
  const handleResetFilters = () => {
    setFilter('all');
    setSearchQuery('');
  };

  return (
    <div className="task-board-container">
      <TaskBoardHeader
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        pendingTasks={pendingTasks}
      />

      <TaskForm
        taskToEdit={editingTask}
        onAddTask={onAddTask}
        onUpdateTask={handleUpdate}
        onCancelEdit={handleCancelEdit}
      />

      <div className="board-section">
        <div className="board-section-header">
          <h2 className="section-title">All Tasks</h2>
        </div>

        {/* Phase 7 Search and Filter Toolbar */}
        {!loading && !error && (
          <div className="task-controls">
            <div className="search-box">
              <span className="search-icon" aria-hidden="true">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="Search tasks by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search tasks by title"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search input"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="filter-group" role="group" aria-label="Filter tasks">
              <button
                type="button"
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All ({totalTasks})
              </button>
              <button
                type="button"
                className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                onClick={() => setFilter('pending')}
              >
                Pending ({pendingTasks})
              </button>
              <button
                type="button"
                className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                onClick={() => setFilter('completed')}
              >
                Completed ({completedTasks})
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading tasks from API...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h3>Failed to load tasks</h3>
            <p>{error}</p>
            <button className="btn btn-primary" onClick={onRetry}>
              🔄 Retry Fetching Tasks
            </button>
          </div>
        ) : (
          <TaskList
            tasks={visibleTasks}
            totalTasksCount={totalTasks}
            filter={filter}
            searchQuery={searchQuery}
            onResetFilters={handleResetFilters}
            onToggleTask={onToggleTask}
            onEditTask={handleStartEdit}
            onDeleteTask={onDeleteTask}
          />
        )}
      </div>
    </div>
  );
}

export default TaskBoardPage;
