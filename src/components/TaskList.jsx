import React from 'react';
import TaskCard from './TaskCard';

/**
 * TaskList Component
 * Renders list of TaskCards dynamically or empty state fallback.
 * 
 * @param {Object} props
 * @param {Array} props.tasks - List of tasks
 * @param {Function} [props.onToggleTask] - Toggle callback
 * @param {Function} [props.onEditTask] - Edit callback
 * @param {Function} [props.onDeleteTask] - Delete callback
 */
function TaskList({ tasks, onToggleTask, onEditTask, onDeleteTask }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>No tasks found</h3>
        <p>Your task list is empty. Add a task above to get started!</p>
      </div>
    );
  }

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
