import React, { useState, useEffect } from 'react';
import { IconEdit, IconPlus, IconAlert } from './Icons';

/**
 * TaskForm Component (Google Keep-Inspired Composer)
 * Compact collapsed input bar that expands smoothly on focus or when editing tasks.
 * Preserves Phase 4 Form Validation & Error Handling.
 * 
 * @param {Object} props
 * @param {Object|null} [props.taskToEdit] - Task currently being edited (or null)
 * @param {Function} props.onAddTask - Handler for creating new tasks
 * @param {Function} props.onUpdateTask - Handler for updating existing tasks
 * @param {Function} props.onCancelEdit - Handler for canceling edit mode
 */
function TaskForm({ taskToEdit, onAddTask, onUpdateTask, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  // Sync form input and clear validation error when taskToEdit changes
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setIsExpanded(true);
    } else {
      setTitle('');
      setIsExpanded(false);
    }
    setError('');
  }, [taskToEdit]);

  // Handle title input changes and clear error as user types
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (error) {
      setError('');
    }
  };

  // Handle form submission with validation
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError('Task title is required.');
      return;
    }

    if (trimmedTitle.length < 3) {
      setError('Task title must be at least 3 characters.');
      return;
    }

    setError('');

    if (taskToEdit) {
      onUpdateTask(taskToEdit.id, trimmedTitle);
    } else {
      onAddTask(trimmedTitle);
    }

    setTitle('');
    if (!taskToEdit) {
      setIsExpanded(false);
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    setError('');
    setTitle('');
    setIsExpanded(false);
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  const isEditing = Boolean(taskToEdit);

  return (
    <div className={`keep-composer-wrapper ${isEditing ? 'editing-mode' : ''}`}>
      {isEditing && (
        <div className="edit-banner">
          <IconEdit size={16} />
          <span>Editing Task #{taskToEdit.id}</span>
        </div>
      )}

      <form
        className={`keep-composer ${isExpanded || isEditing ? 'expanded' : ''}`}
        onSubmit={handleSubmit}
      >
        <div className="composer-input-row">
          <input
            id="task-title"
            type="text"
            className={`composer-input ${error ? 'input-error' : ''}`}
            placeholder={isEditing ? 'Update task title...' : 'Take a note / Add a task...'}
            value={title}
            onChange={handleTitleChange}
            onFocus={() => setIsExpanded(true)}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'task-title-error' : undefined}
            aria-label={isEditing ? 'Edit Task Title' : 'Take a note or add a task'}
          />

          {(!isExpanded && !isEditing) && (
            <button
              type="button"
              className="composer-quick-btn"
              onClick={() => setIsExpanded(true)}
              aria-label="Expand task composer"
              title="Add task"
            >
              <IconPlus size={18} />
            </button>
          )}
        </div>

        {(isExpanded || isEditing) && (
          <div className="composer-actions">
            {error && (
              <p id="task-title-error" className="error-message" role="alert">
                <IconAlert size={16} className="error-icon" /> {error}
              </p>
            )}

            <div className="composer-buttons">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleCancel}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                {isEditing ? 'Update Task' : '+ Add Task'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default TaskForm;
