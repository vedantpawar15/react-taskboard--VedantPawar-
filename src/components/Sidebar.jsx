import React from 'react';
import { IconNotes, IconPending, IconCompleted } from './Icons';

/**
 * Sidebar Component
 * Google Keep-inspired left navigation sidebar.
 * Supports filtering tasks by All, Pending, and Completed modes.
 * 
 * @param {Object} props
 * @param {string} props.activeFilter - Current active filter ('all' | 'pending' | 'completed')
 * @param {Function} props.onSelectFilter - Filter selection handler
 * @param {number} props.totalCount - Total tasks count
 * @param {number} props.pendingCount - Pending tasks count
 * @param {number} props.completedCount - Completed tasks count
 * @param {boolean} props.isCollapsed - Whether the sidebar is collapsed
 */
function Sidebar({
  activeFilter,
  onSelectFilter,
  totalCount,
  pendingCount,
  completedCount,
  isCollapsed,
}) {
  return (
    <aside className={`keep-sidebar ${isCollapsed ? 'collapsed' : ''}`} aria-label="Sidebar Navigation">
      <nav className="sidebar-nav">
        <ul className="sidebar-list">
          <li className="sidebar-item">
            <button
              type="button"
              className={`sidebar-link ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => onSelectFilter('all')}
              title="All Tasks"
              aria-label="All Tasks filter"
            >
              <IconNotes size={20} className="sidebar-icon" />
              <span className="sidebar-label">All Tasks</span>
              <span className="sidebar-badge">{totalCount}</span>
            </button>
          </li>

          <li className="sidebar-item">
            <button
              type="button"
              className={`sidebar-link ${activeFilter === 'pending' ? 'active' : ''}`}
              onClick={() => onSelectFilter('pending')}
              title="Pending Tasks"
              aria-label="Pending Tasks filter"
            >
              <IconPending size={20} className="sidebar-icon" />
              <span className="sidebar-label">Pending</span>
              <span className="sidebar-badge">{pendingCount}</span>
            </button>
          </li>

          <li className="sidebar-item">
            <button
              type="button"
              className={`sidebar-link ${activeFilter === 'completed' ? 'active' : ''}`}
              onClick={() => onSelectFilter('completed')}
              title="Completed Tasks"
              aria-label="Completed Tasks filter"
            >
              <IconCompleted size={20} className="sidebar-icon" />
              <span className="sidebar-label">Completed</span>
              <span className="sidebar-badge">{completedCount}</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
