import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { IconCompleted, IconPending, IconAlert, IconEdit, IconDelete } from '../components/Icons';

/**
 * TaskDetailPage Component (Route: /tasks/:id)
 * Focused expanded view for a task with clean metadata layout and full utility actions:
 * - Level 1: Task Title (with inline title editing support)
 * - Level 2: Status Badge (Completed / Pending)
 * - Level 3: Task Information Grid (Task ID #id, Storage: Local Storage, Original Source: JSONPlaceholder API)
 * - Level 4: Primary Actions (Mark as Completed/Pending, Edit Task, Delete Task with auto-redirect)
 * 
 * @param {Object} props
 * @param {Array} props.tasks - Shared tasks array from parent App
 * @param {boolean} [props.loading] - Loading state flag
 * @param {Function} [props.onToggleTask] - Toggle completion handler
 * @param {Function} [props.onUpdateTask] - Update title handler
 * @param {Function} [props.onDeleteTask] - Delete task handler
 */
function TaskDetailPage({ tasks, loading, onToggleTask, onUpdateTask, onDeleteTask }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editError, setEditError] = useState('');

  // Show loading indicator while initial API fetch is in progress
  if (loading) {
    return (
      <div className="keep-workspace">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading task details...</p>
        </div>
      </div>
    );
  }

  // Find task matching the route parameter
  const task = tasks.find((t) => String(t.id) === String(id));

  // Friendly fallback if task ID is invalid or deleted
  if (!task) {
    return (
      <div className="keep-workspace">
        <div className="detail-nav-row">
          <Link to="/" className="btn-link back-link">
            <span>← Back to Tasks</span>
          </Link>
        </div>
        <div className="error-container">
          <div className="error-icon-wrapper">
            <IconAlert size={36} className="error-icon-svg" />
          </div>
          <h3>Task Not Found</h3>
          <p>The requested task does not exist or has been deleted.</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
            Return to Task Board
          </Link>
        </div>
      </div>
    );
  }

  const handleStartEdit = () => {
    setEditTitle(task.title);
    setEditError('');
    setIsEditing(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    const trimmed = editTitle.trim();
    if (!trimmed) {
      setEditError('Task title cannot be empty.');
      return;
    }
    if (trimmed.length < 3) {
      setEditError('Task title must be at least 3 characters.');
      return;
    }
    if (onUpdateTask) {
      onUpdateTask(task.id, trimmed);
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (onDeleteTask) {
      onDeleteTask(task.id);
    }
    navigate('/');
  };

  return (
    <div className="keep-workspace task-detail-workspace">
      {/* Top Navigation Area */}
      <div className="detail-nav-row">
        <Link to="/" className="btn-link back-link">
          <span>← Back to Tasks</span>
        </Link>
      </div>

      {/* Main Task Details Card */}
      <div className="task-detail-card">
        {/* Header & Title */}
        <div className="detail-card-header">
          <span className="detail-context-tag">TASK</span>
          
          {isEditing ? (
            <form onSubmit={handleSaveEdit} className="detail-edit-form">
              <input
                type="text"
                className={`composer-input detail-edit-input ${editError ? 'input-error' : ''}`}
                value={editTitle}
                onChange={(e) => {
                  setEditTitle(e.target.value);
                  if (editError) setEditError('');
                }}
                autoFocus
              />
              {editError && <p className="error-message">{editError}</p>}
              <div className="detail-edit-buttons">
                <button type="submit" className="btn btn-primary btn-sm">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <h1 className="detail-task-title">{task.title}</h1>
          )}
        </div>

        <div className="detail-card-divider" aria-hidden="true"></div>

        {/* Level 2 — Status */}
        <div className="detail-section">
          <h2 className="detail-section-title">STATUS</h2>
          <div className="status-badge-wrapper">
            <span className={`status-badge ${task.completed ? 'badge-success' : 'badge-warning'}`}>
              {task.completed ? <IconCompleted size={14} /> : <IconPending size={14} />}
              <span>{task.completed ? 'Completed' : 'Pending'}</span>
            </span>
          </div>
        </div>

        {/* Level 3 — Task Information Metadata Grid */}
        <div className="detail-section">
          <h2 className="detail-section-title">TASK INFORMATION</h2>
          <div className="metadata-grid">
            <div className="metadata-item">
              <span className="metadata-label">ID</span>
              <span className="metadata-value">#{task.id}</span>
            </div>
            <div className="metadata-item">
              <span className="metadata-label">Storage</span>
              <span className="metadata-value">Local Storage</span>
            </div>
            <div className="metadata-item">
              <span className="metadata-label">Original Source</span>
              <span className="metadata-value">JSONPlaceholder API</span>
            </div>
          </div>
        </div>

        <div className="detail-card-divider" aria-hidden="true"></div>

        {/* Level 4 — Primary Actions */}
        <div className="detail-actions-row">
          {onToggleTask && (
            <button
              type="button"
              className="btn btn-primary detail-action-btn"
              onClick={() => onToggleTask(task.id)}
            >
              {task.completed ? '↶ Mark as Pending' : '✓ Mark as Completed'}
            </button>
          )}

          {!isEditing && (
            <button
              type="button"
              className="btn btn-secondary detail-action-btn"
              onClick={handleStartEdit}
            >
              <IconEdit size={16} />
              <span>Edit Task</span>
            </button>
          )}

          <button
            type="button"
            className="btn btn-secondary detail-action-btn btn-danger-text"
            onClick={handleDelete}
          >
            <IconDelete size={16} />
            <span>Delete Task</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailPage;
