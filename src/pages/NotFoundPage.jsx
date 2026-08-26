import React from 'react';
import { Link } from 'react-router-dom';

/**
 * NotFoundPage Component
 * Catch-all route (*) for unmatched URL paths.
 */
function NotFoundPage() {
  return (
    <div className="page-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <h1 className="page-title" style={{ fontSize: '3rem', color: 'var(--primary)' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Page Not Found</h2>
      <p className="page-subtitle" style={{ marginBottom: '2rem' }}>
        The route you are looking for does not exist.
      </p>
      <Link 
        to="/" 
        style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          backgroundColor: 'var(--primary)',
          color: '#fff',
          borderRadius: 'var(--radius-sm)',
          fontWeight: 600
        }}
      >
        Return to Task Board
      </Link>
    </div>
  );
}

export default NotFoundPage;
