import React from 'react';
import { useParams, Link } from 'react-router-dom';

/**
 * TaskDetailPage Component
 * Route: /tasks/:id
 * Displays detailed information for a specific task based on dynamic route param.
 */
function TaskDetailPage() {
  const { id } = useParams();

  return (
    <div className="page-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1 className="page-title" style={{ margin: 0 }}>Task Details</h1>
        <Link to="/" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
          ← Back to Board
        </Link>
      </div>

      <p className="page-subtitle">
        Viewing details for task parameter: <strong style={{ color: 'var(--primary)' }}>ID #{id}</strong>
      </p>

      <div className="placeholder-box">
        <span className="badge">Dynamic Route Verified</span>
        <h3 style={{ marginTop: '0.75rem', color: 'var(--text-main)' }}>Task #{id} Detail Placeholder</h3>
        <p style={{ marginTop: '0.5rem' }}>
          This route dynamically extracts the URL parameter <code>id={id}</code> using React Router's <code>useParams()</code> hook.
        </p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
          Task state fetching and complete detail view will be populated in subsequent phases.
        </p>
      </div>
    </div>
  );
}

export default TaskDetailPage;
