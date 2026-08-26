import React from 'react';
import { Link } from 'react-router-dom';

/**
 * TaskBoardPage Component
 * Route: /
 * Displays the main task board container (Placeholder for Phase 1).
 */
function TaskBoardPage() {
  return (
    <div className="page-card">
      <h1 className="page-title">Task Board</h1>
      <p className="page-subtitle">
        Phase 1 Foundation: Basic routing and layout established.
      </p>

      <div className="placeholder-box">
        <span className="badge">Phase 1</span>
        <h3 style={{ marginTop: '0.75rem', color: 'var(--text-main)' }}>Task List View Placeholder</h3>
        <p style={{ marginTop: '0.5rem' }}>
          Full task list, filtering, and add/edit actions will be connected in future phases.
        </p>

        <div className="test-routes">
          <h4>Test Dynamic Detail Routes:</h4>
          <div className="test-links">
            <Link to="/tasks/1">View Task #1 Details</Link>
            <Link to="/tasks/42">View Task #42 Details</Link>
            <Link to="/tasks/100">View Task #100 Details</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskBoardPage;
