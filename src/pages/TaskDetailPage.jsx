import React from 'react';
import { useParams, Link } from 'react-router-dom';

/**
 * TaskDetailPage Component (Route: /tasks/:id)
 * Dynamically retrieves dynamic route param `id`, finds matching task from shared `tasks` state,
 * and displays comprehensive task details or a friendly loading/fallback state.
 * 
 * @param {Object} props
 * @param {Array} props.tasks - Shared tasks array from parent App
 * @param {boolean} [props.loading] - Loading state flag
 * @param {Function} [props.onToggleTask] - Optional toggle handler
 */
function TaskDetailPage({ tasks, loading, onToggleTask }) {
  const { id } = useParams();

  // Show loading indicator while initial API fetch is in progress
  if (loading) {
    return (
      <div className="page-card loading-container">
        <div className="spinner"></div>
        <p>Loading task details...</p>
      </div>
    );
  }

  // Find task matching the route parameter
  const task = tasks.find((t) => String(t.id) === String(id));

  // Friendly fallback if task ID is invalid or deleted
  if (!task) {
    return (
      <div className="page-card not-found-card">
        <div className="not-found-icon">⚠️</div>
        <h1 className="page-title">Task Not Found</h1>
        <p className="page-subtitle">
          No task matching ID <strong style={{ color: 'var(--primary)' }}>#{id}</strong> exists in your board.
        </p>
        <div style={{ marginTop: '1.5rem' }}>
          <Link to="/" className="btn btn-primary">
            ← Return to Task Board
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-card task-detail-card">
      <div className="detail-header">
        <div>
          <span className="badge">Task #{task.id}</span>
          <h1 className="page-title" style={{ marginTop: '0.5rem' }}>{task.title}</h1>
        </div>
        <Link to="/" className="btn-link">
          ← Back to Board
        </Link>
      </div>

      <div className="detail-body">
        <div className="detail-row">
          <span className="detail-label">Status:</span>
          <div className="detail-value">
            <span className={`status-badge ${task.completed ? 'badge-success' : 'badge-warning'}`}>
              {task.completed ? '✓ Completed' : '⏳ Pending'}
            </span>
            {onToggleTask && (
              <button
                className="btn btn-sm btn-secondary"
                style={{ marginLeft: '0.75rem', padding: '0.25rem 0.6rem', fontSize: '0.8rem' }}
                onClick={() => onToggleTask(task.id)}
              >
                Toggle Status
              </button>
            )}
          </div>
        </div>

        <div className="detail-row">
          <span className="detail-label">Task ID:</span>
          <span className="detail-value"><code>{task.id}</code></span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Source:</span>
          <span className="detail-value" style={{ color: 'var(--text-muted)' }}>
            Fetched from JSONPlaceholder API & managed in local state.
          </span>
        </div>
      </div>

      <div className="detail-footer" style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
        <Link to="/" className="btn btn-primary">
          ← Return to Task Board
        </Link>
      </div>
    </div>
  );
}

export default TaskDetailPage;
