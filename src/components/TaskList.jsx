import React from 'react';
import TaskCard from './TaskCard';

/**
 * TaskList Component
 * Renders a list of TaskCard components dynamically using Array.prototype.map().
 * Displays an empty state when no tasks are present.
 * 
 * @param {Object} props
 * @param {Array} props.tasks - List of task objects
 * @param {Function} [props.onToggleTask] - Toggle callback passed to cards
 * @param {Function} [props.onDeleteTask] - Delete callback passed to cards
 */
function TaskList({ tasks, onToggleTask, onDeleteTask }) {
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
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
}

export default TaskList;
