import React from 'react';
import { Link } from 'react-router-dom';

/**
 * TaskCard Component
 * Renders individual task item with completion toggle, Edit action, Delete action, and Link to Task Details.
 * 
 * @param {Object} props
 * @param {Object} props.task - Task object { id, title, completed }
 * @param {Function} [props.onToggleComplete] - Completion toggle handler
 * @param {Function} [props.onEdit] - Edit click handler
 * @param {Function} [props.onDelete] - Delete click handler
 */
function TaskCard({ task, onToggleComplete, onEdit, onDelete }) {
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
        <button
          className="btn-icon btn-edit"
          onClick={() => onEdit && onEdit(task)}
          title="Edit task"
        >
          ✏️
        </button>
        <button 
          className="btn-icon btn-delete" 
          onClick={() => onDelete && onDelete(id)}
          title="Delete task"
        >
          🗑️
        </button>
        <Link to={`/tasks/${id}`} className="btn-link" title="View details">
          View Details →
        </Link>
      </div>
    </div>
  );
}

export default TaskCard;
