import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  IconLightbulb,
  IconSearch,
  IconClose,
  IconSun,
  IconMoon,
  IconGrid,
  IconList,
  IconMenu,
} from './Icons';

/**
 * Navbar Component
 * Google Keep-inspired top navigation header.
 * Uses clean SVG icons and unified dark-amber theme branding.
 * 
 * @param {Object} props
 * @param {string} props.theme - Active theme mode ('light' | 'dark')
 * @param {Function} props.onToggleTheme - Theme switch handler
 * @param {Function} props.onToggleSidebar - Sidebar toggle handler
 * @param {string} [props.searchQuery] - Current search query
 * @param {Function} [props.onSearchChange] - Search input handler
 * @param {string} [props.viewMode] - Layout view mode ('grid' | 'list')
 * @param {Function} [props.onToggleViewMode] - View mode switch handler
 */
function Navbar({
  theme,
  onToggleTheme,
  onToggleSidebar,
  searchQuery = '',
  onSearchChange,
  viewMode = 'grid',
  onToggleViewMode,
}) {
  const isDark = theme === 'dark';

  return (
    <header className="navbar keep-header">
      <div className="navbar-content">
        {/* Left: Hamburger & Brand Title */}
        <div className="header-left">
          <button
            type="button"
            className="icon-button hamburger-btn"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar navigation"
            title="Toggle sidebar"
          >
            <IconMenu size={20} />
          </button>
          <NavLink to="/" className="navbar-brand">
            <span className="brand-icon-wrapper">
              <IconLightbulb size={24} className="brand-icon" />
            </span>
            <span className="brand-text">Task Board</span>
          </NavLink>
        </div>

        {/* Center: Integrated Google Keep Header Search Bar */}
        {onSearchChange && (
          <div className="header-search-container">
            <div className="header-search-box">
              <span className="search-icon-wrapper">
                <IconSearch size={18} className="search-icon" />
              </span>
              <input
                type="text"
                className="header-search-input"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                aria-label="Search tasks by title"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search query"
                  title="Clear search"
                >
                  <IconClose size={14} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Right: View Toggle, Theme Toggle, User Avatar */}
        <div className="header-right">
          {onToggleViewMode && (
            <button
              type="button"
              className="icon-button view-toggle-btn"
              onClick={onToggleViewMode}
              aria-label={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
              title={viewMode === 'grid' ? 'List view' : 'Grid view'}
            >
              {viewMode === 'grid' ? <IconList size={20} /> : <IconGrid size={20} />}
            </button>
          )}

          <button
            type="button"
            className="icon-button theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? <IconSun size={20} /> : <IconMoon size={20} />}
          </button>

          <div className="user-avatar" title="Vedant Pawar (User)">
            V
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
