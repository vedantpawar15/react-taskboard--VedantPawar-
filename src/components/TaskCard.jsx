import React from 'react';
import { Link } from 'react-router-dom';
import { IconEdit, IconDelete, IconArrowRight, IconCompleted, IconPending, IconGrip } from './Icons';

/**
 * TaskCard Component
 * Implements strict 3-column grid layout:
 * - Column 1 (Fixed narrow width): Drag handle
 * - Column 2 (Fixed narrow width): Checkbox (vertically aligned with top of title)
 * - Column 3 (Main Content Flow Column):
 *   - Title
 *   - Status Badge (aligned directly under title)
 *   - Divider Line (aligned under status)
 *   - Compact Actions Group ([Edit] [Delete] ... Details ->)
 * 
 * @param {Object} props
 * @param {Object} props.task - Task object { id, title, completed }
 * @param {number} [props.index] - Position index in current visible list
 * @param {boolean} [props.isReorderAllowed] - Whether drag-and-drop is enabled
 * @param {boolean} [props.isDragging] - Whether this card is actively being dragged
 * @param {boolean} [props.isDragOver] - Whether a dragged card is hovering over this card
 * @param {Function} [props.onDragStart] - HTML5 drag start handler
 * @param {Function} [props.onDragOver] - HTML5 drag over handler
 * @param {Function} [props.onDrop] - HTML5 drop handler
 * @param {Function} [props.onDragEnd] - HTML5 drag end handler
 * @param {Function} [props.onToggleComplete] - Completion toggle handler
 * @param {Function} [props.onEdit] - Edit click handler
 * @param {Function} [props.onDelete] - Delete click handler
 */
function TaskCard({
  task,
  index,
  isReorderAllowed = true,
  isDragging = false,
  isDragOver = false,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  onToggleComplete,
  onEdit,
  onDelete,
}) {
  const { id, title, completed } = task;

  return (
    <div
      className={`task-card ${completed ? 'completed' : 'pending'} ${
        isDragging ? 'dragging' : ''
      } ${isDragOver ? 'drag-over' : ''}`}
      draggable={isReorderAllowed}
      onDragStart={(e) => isReorderAllowed && onDragStart && onDragStart(e, index)}
      onDragOver={(e) => isReorderAllowed && onDragOver && onDragOver(e, index)}
      onDrop={(e) => isReorderAllowed && onDrop && onDrop(e, index)}
      onDragEnd={(e) => isReorderAllowed && onDragEnd && onDragEnd(e)}
      tabIndex={0}
      aria-label={`Task: ${title}. Status: ${completed ? 'Completed' : 'Pending'}`}
    >
      {/* Column 1: Drag Handle (fixed narrow width) */}
      <div className={`card-drag-col ${!isReorderAllowed ? 'hidden' : ''}`}>
        <span
          className="drag-handle"
          title="Drag to reorder task"
          aria-label="Drag handle to reorder task"
        >
          <IconGrip size={16} />
        </span>
      </div>

      {/* Column 2: Checkbox (fixed position) */}
      <div className="card-checkbox-col">
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => onToggleComplete && onToggleComplete(id)}
            aria-label={`Mark "${title}" as ${completed ? 'pending' : 'completed'}`}
          />
          <span className="checkmark"></span>
        </label>
      </div>

      {/* Column 3: Main Content Unit (Title, Status, Divider, Actions) */}
      <div className="card-content-col">
        <h3 className={`task-title ${completed ? 'line-through' : ''}`}>
          {title}
        </h3>

        <div className="card-status-wrapper">
          <span className={`status-badge ${completed ? 'badge-success' : 'badge-warning'}`}>
            {completed ? <IconCompleted size={12} /> : <IconPending size={12} />}
            <span>{completed ? 'Completed' : 'Pending'}</span>
          </span>
        </div>

        <div className="card-divider" aria-hidden="true"></div>

        <div className="card-actions-group">
          <button
            type="button"
            className="btn-icon btn-edit"
            onClick={() => onEdit && onEdit(task)}
            title="Edit task"
            aria-label={`Edit task "${title}"`}
          >
            <IconEdit size={15} />
          </button>
          <button 
            type="button"
            className="btn-icon btn-delete" 
            onClick={() => onDelete && onDelete(id)}
            title="Delete task"
            aria-label={`Delete task "${title}"`}
          >
            <IconDelete size={15} />
          </button>

          <Link 
            to={`/tasks/${id}`} 
            className="btn-link" 
            title="View task details"
            aria-label={`View details for "${title}"`}
          >
            <span>Details</span>
            <IconArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
