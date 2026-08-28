import React, { useState } from 'react';
import TaskBoardHeader from '../components/TaskBoardHeader';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { IconAlert, IconRefresh } from '../components/Icons';

/**
 * TaskBoardPage Component (Route: /)
 * Receives shared tasks state, loading, error, search query, active filter, viewMode, and handlers,
 * manages local edit selection state, derives visibleTasks without mutating parent state,
 * and composes Google Keep-inspired board workspace.
 */
function TaskBoardPage({
  tasks,
  loading,
  error,
  filter = 'all',
  setFilter,
  searchQuery = '',
  setSearchQuery,
  viewMode = 'grid',
  onRetry,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onUpdateTask,
  onReorderTasks,
}) {
  const [editingTask, setEditingTask] = useState(null);

  // Local fallback state if filter/searchQuery are not passed as controlled props
  const [localFilter, setLocalFilter] = useState('all');
  const [localSearchQuery, setLocalSearchQuery] = useState('');

  const activeFilter = setFilter ? filter : localFilter;
  const activeSearchQuery = setSearchQuery ? searchQuery : localSearchQuery;

  const handleFilterChange = (newFilter) => {
    if (setFilter) setFilter(newFilter);
    else setLocalFilter(newFilter);
  };

  const handleSearchChange = (newQuery) => {
    if (setSearchQuery) setSearchQuery(newQuery);
    else setLocalSearchQuery(newQuery);
  };

  // Reordering is allowed in the default "All" view with empty search query
  const isReorderAllowed = activeFilter === 'all' && activeSearchQuery.trim() === '';

  // Calculate statistics from current tasks state
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  // Derive visibleTasks based on active filter & search query
  const normalizedQuery = activeSearchQuery.trim().toLowerCase();

  const visibleTasks = tasks.filter((task) => {
    // 1. Filter matching
    const matchesFilter =
      activeFilter === 'all'
        ? true
        : activeFilter === 'completed'
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
    handleFilterChange('all');
    handleSearchChange('');
  };

  return (
    <div className="task-board-container keep-workspace">
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
        {/* Compact Filter Toolbar Pills */}
        {!loading && !error && (
          <div className="task-controls keep-controls">
            <div className="filter-group" role="group" aria-label="Filter tasks">
              <button
                type="button"
                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => handleFilterChange('all')}
              >
                All ({totalTasks})
              </button>
              <button
                type="button"
                className={`filter-btn ${activeFilter === 'pending' ? 'active' : ''}`}
                onClick={() => handleFilterChange('pending')}
              >
                Pending ({pendingTasks})
              </button>
              <button
                type="button"
                className={`filter-btn ${activeFilter === 'completed' ? 'active' : ''}`}
                onClick={() => handleFilterChange('completed')}
              >
                Completed ({completedTasks})
              </button>
            </div>
          </div>
        )}

        {!isReorderAllowed && !loading && !error && visibleTasks.length > 1 && (
          <div className="reorder-info-banner">
            <span>ℹ️ Drag-and-drop reordering is enabled in the default "All" view with search cleared.</span>
          </div>
        )}

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading tasks from API...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <div className="error-icon-wrapper">
              <IconAlert size={36} className="error-icon-svg" />
            </div>
            <h3>Failed to load tasks</h3>
            <p>{error}</p>
            <button className="btn btn-primary" onClick={onRetry}>
              <IconRefresh size={16} />
              <span>Retry Fetching Tasks</span>
            </button>
          </div>
        ) : (
          <TaskList
            tasks={visibleTasks}
            totalTasksCount={totalTasks}
            filter={activeFilter}
            searchQuery={activeSearchQuery}
            viewMode={viewMode}
            isReorderAllowed={isReorderAllowed}
            onReorderTasks={onReorderTasks}
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
