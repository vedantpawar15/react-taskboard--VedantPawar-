import React from 'react';

/**
 * TaskBoardHeader Component
 * Renders the board title, description, and dynamic task summary counters.
 * 
 * @param {Object} props
 * @param {number} props.totalTasks - Total count of tasks
 * @param {number} props.completedTasks - Count of completed tasks
 * @param {number} props.pendingTasks - Count of pending tasks
 */
function TaskBoardHeader({ totalTasks, completedTasks, pendingTasks }) {
  return (
    <div className="task-board-header">
      <div className="header-text">
        <h1 className="page-title">Task Board</h1>
        <p className="page-subtitle">
          Manage, track, and organize your daily internship assignments.
        </p>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <span className="stat-value">{totalTasks}</span>
          <span className="stat-label">Total Tasks</span>
        </div>
        <div className="stat-card stat-completed">
          <span className="stat-value">{completedTasks}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-card stat-pending">
          <span className="stat-value">{pendingTasks}</span>
          <span className="stat-label">Pending</span>
        </div>
      </div>
    </div>
  );
}

export default TaskBoardHeader;
