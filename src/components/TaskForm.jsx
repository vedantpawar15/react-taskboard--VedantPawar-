import React, { useState, useEffect } from 'react';

/**
 * TaskForm Component
 * Supports two operational modes:
 * 1. ADD MODE: Empty input, "+ Add Task" submit button.
 * 2. EDIT MODE: Input populated with taskToEdit title, "Update Task" submit button, and "Cancel" button.
 * 
 * @param {Object} props
 * @param {Object|null} [props.taskToEdit] - Task currently being edited (or null)
 * @param {Function} props.onAddTask - Handler for creating new tasks
 * @param {Function} props.onUpdateTask - Handler for updating existing tasks
 * @param {Function} props.onCancelEdit - Handler for canceling edit mode
 */
function TaskForm({ taskToEdit, onAddTask, onUpdateTask, onCancelEdit }) {
  const [title, setTitle] = useState('');

  // Sync form input when taskToEdit changes
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
    } else {
      setTitle('');
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (taskToEdit) {
      onUpdateTask(taskToEdit.id, title.trim());
    } else {
      onAddTask(title.trim());
    }

    setTitle('');
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
            className="form-input"
            placeholder={isEditing ? 'Update task title...' : 'What needs to be done?'}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Update Task' : '+ Add Task'}
          </button>

          {isEditing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default TaskForm;
