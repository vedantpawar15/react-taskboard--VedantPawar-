import React from 'react';
import TaskCard from './TaskCard';

/**
 * TaskList Component
 * Renders list of TaskCards dynamically or specific empty state fallbacks.
 * 
 * @param {Object} props
 * @param {Array} props.tasks - Derived list of visible tasks
 * @param {number} [props.totalTasksCount] - Total count of all tasks in app state
 * @param {string} [props.filter] - Current active filter ('all' | 'pending' | 'completed')
 * @param {string} [props.searchQuery] - Current search query string
 * @param {Function} [props.onResetFilters] - Reset search & filter handler
 * @param {Function} [props.onToggleTask] - Toggle callback
 * @param {Function} [props.onEditTask] - Edit callback
 * @param {Function} [props.onDeleteTask] - Delete callback
 */
function TaskList({
  tasks,
  totalTasksCount,
  filter,
  searchQuery,
  onResetFilters,
  onToggleTask,
  onEditTask,
  onDeleteTask,
}) {
  // Scenario A: General Empty State (No tasks created or stored at all)
  if (totalTasksCount === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>No tasks found</h3>
        <p>Your task list is empty. Add a task above to get started!</p>
      </div>
    );
  }

  // Scenario B: Filtered / Searched Empty State (Tasks exist, but no tasks match search/filter)
  if (!tasks || tasks.length === 0) {
    const trimmedQuery = searchQuery ? searchQuery.trim() : '';
    let message = 'No tasks match your current filter or search criteria.';

    if (trimmedQuery && filter !== 'all') {
      message = `No ${filter} tasks match "${trimmedQuery}".`;
    } else if (trimmedQuery) {
      message = `No tasks match "${trimmedQuery}".`;
    } else if (filter === 'completed') {
      message = 'You have not completed any tasks yet. Keep working!';
    } else if (filter === 'pending') {
      message = 'No pending tasks! All caught up!';
    }

    return (
      <div className="empty-state filter-empty-state">
        <div className="empty-icon">🔍</div>
        <h3>No matching tasks found</h3>
        <p>{message}</p>
        {onResetFilters && (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            style={{ marginTop: '1rem' }}
            onClick={onResetFilters}
          >
            Clear Search & Filters
          </button>
        )}
      </div>
    );
  }

  // Scenario C: Render List of Visible Tasks
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleComplete={onToggleTask}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
}

export default TaskList;
