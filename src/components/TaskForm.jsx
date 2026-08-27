import React, { useState, useEffect } from 'react';

/**
 * TaskForm Component
 * Supports two operational modes:
 * 1. ADD MODE: Empty input, "+ Add Task" submit button.
 * 2. EDIT MODE: Input populated with taskToEdit title, "Update Task" submit button, and "Cancel" button.
 * 
 * Features Phase 4 Form Validation:
 * - Required title validation
 * - Minimum 3 characters validation (after trimming)
 * - Clear inline error messages and visual feedback
 * - Automatic error clearing on input change, cancel, or edit target switch
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

  // Sync form input and clear validation error when taskToEdit changes
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
    } else {
      setTitle('');
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
  };

  // Handle cancel button click
  const handleCancel = () => {
    setError('');
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  const isEditing = Boolean(taskToEdit);

  return (
    <form className={`task-form ${isEditing ? 'editing-mode' : ''}`} onSubmit={handleSubmit}>
      {isEditing && (
        <div className="edit-banner">
          <span>✏️ Editing Task #{taskToEdit.id}</span>
        </div>
      )}

      <div className="form-group">
        <label htmlFor="task-title" className="form-label">
          {isEditing ? 'Edit Task Title' : 'Task Title'}
        </label>
        <div className="input-group">
          <input
            id="task-title"
            type="text"
            className={`form-input ${error ? 'input-error' : ''}`}
            placeholder={isEditing ? 'Update task title...' : 'What needs to be done?'}
            value={title}
            onChange={handleTitleChange}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'task-title-error' : undefined}
          />

          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Update Task' : '+ Add Task'}
          </button>

          {isEditing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>

        {error && (
          <p id="task-title-error" className="error-message" role="alert">
            <span className="error-icon" aria-hidden="true">⚠️</span> {error}
          </p>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
