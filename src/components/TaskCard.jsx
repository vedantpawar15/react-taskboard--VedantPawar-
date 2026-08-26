import React from 'react';
import { Link } from 'react-router-dom';

/**
 * TaskCard Component
 * Renders individual task item with status badges and action stubs.
 * 
 * @param {Object} props
 * @param {Object} props.task - Task object { id, title, completed }
 * @param {Function} [props.onToggleComplete] - Callback stub for completion toggle
 * @param {Function} [props.onDelete] - Callback stub for task deletion
 */
function TaskCard({ task, onToggleComplete, onDelete }) {
  const { id, title, completed } = task;

  return (
    <div className={`task-card ${completed ? 'completed' : 'pending'}`}>
      <div className="task-card-content">
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => onToggleComplete && onToggleComplete(id)}
          />
          <span className="checkmark"></span>
        </label>

        <div className="task-info">
          <h3 className={`task-title ${completed ? 'line-through' : ''}`}>
            {title}
          </h3>
          <span className={`status-badge ${completed ? 'badge-success' : 'badge-warning'}`}>
            {completed ? '✓ Completed' : '⏳ Pending'}
          </span>
        </div>
      </div>

      <div className="task-card-actions">
        <Link to={`/tasks/${id}`} className="btn-link" title="View details">
          View Details →
        </Link>
        <button 
          className="btn-icon btn-delete" 
          onClick={() => onDelete && onDelete(id)}
          title="Delete task stub"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
