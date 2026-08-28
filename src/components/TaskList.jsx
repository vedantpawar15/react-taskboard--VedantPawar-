import React, { useState } from 'react';
import TaskCard from './TaskCard';
import { IconNotes, IconSearch } from './Icons';

/**
 * TaskList Component
 * Renders list of TaskCards dynamically with drag-and-drop reordering support or specific empty state fallbacks.
 * Uses clean SVG icons for empty states.
 * 
 * @param {Object} props
 * @param {Array} props.tasks - Derived list of visible tasks
 * @param {number} [props.totalTasksCount] - Total count of all tasks in app state
 * @param {string} [props.filter] - Current active filter ('all' | 'pending' | 'completed')
 * @param {string} [props.searchQuery] - Current search query string
 * @param {boolean} [props.isReorderAllowed] - Whether drag-and-drop reordering is enabled
 * @param {Function} [props.onReorderTasks] - Reorder callback (startIndex, dropIndex)
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
  viewMode = 'grid',
  isReorderAllowed = true,
  onReorderTasks,
  onResetFilters,
  onToggleTask,
  onEditTask,
  onDeleteTask,
}) {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  // Drag and drop event handlers
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(index));
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      if (onReorderTasks) {
        onReorderTasks(draggedIndex, dropIndex);
      }
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Scenario A: General Empty State (No tasks created or stored at all)
  if (totalTasksCount === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon-wrapper">
          <IconNotes size={40} className="empty-icon-svg" />
        </div>
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
        <div className="empty-icon-wrapper">
          <IconSearch size={40} className="empty-icon-svg" />
        </div>
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
    <div className={`task-list keep-task-grid ${viewMode === 'list' ? 'list-layout' : 'grid-layout'}`} role="list">
      {tasks.map((task, index) => (
        <TaskCard
          key={task.id}
          task={task}
          index={index}
          isReorderAllowed={isReorderAllowed}
          isDragging={draggedIndex === index}
          isDragOver={dragOverIndex === index && draggedIndex !== index}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragEnd={handleDragEnd}
          onToggleComplete={onToggleTask}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
}

export default TaskList;
