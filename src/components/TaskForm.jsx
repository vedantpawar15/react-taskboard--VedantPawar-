import React, { useState } from 'react';

/**
 * TaskForm Component
 * Renders controlled input form for adding new tasks.
 * 
 * @param {Object} props
 * @param {Function} [props.onAddTask] - Callback function for adding a new task
 */
function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (onAddTask) {
      onAddTask(title.trim());
    }
    
    setTitle('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="task-title" className="form-label">
          Task Title
        </label>
        <div className="input-group">
          <input
            id="task-title"
            type="text"
            className="form-input"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            + Add Task
          </button>
        </div>
      </div>
    </form>
  );
}

export default TaskForm;
