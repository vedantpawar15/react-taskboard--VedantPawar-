import React from 'react';
import { IconNotes, IconPending, IconCompleted } from './Icons';

/**
 * TaskBoardHeader Component
 * Renders compact board header title, description, and Google Keep-style summary chips.
 * 
 * @param {Object} props
 * @param {number} props.totalTasks - Total count of tasks
 * @param {number} props.completedTasks - Count of completed tasks
 * @param {number} props.pendingTasks - Count of pending tasks
 */
function TaskBoardHeader({ totalTasks, completedTasks, pendingTasks }) {
  return (
    <div className="keep-board-header">
      <div className="header-text">
        <h1 className="keep-page-title">Task Board</h1>
        <p className="keep-page-subtitle">
          Organize your daily assignments and track progress
        </p>
      </div>

      <div className="stats-chips">
        <span className="stat-chip stat-total" title="Total Tasks">
          <IconNotes size={14} className="chip-icon" />
          <span>{totalTasks} {totalTasks === 1 ? 'Task' : 'Tasks'}</span>
        </span>
        <span className="stat-chip stat-pending" title="Pending Tasks">
          <IconPending size={14} className="chip-icon" />
          <span>{pendingTasks} Pending</span>
        </span>
        <span className="stat-chip stat-completed" title="Completed Tasks">
          <IconCompleted size={14} className="chip-icon" />
          <span>{completedTasks} Completed</span>
        </span>
      </div>
    </div>
  );
}

export default TaskBoardHeader;
