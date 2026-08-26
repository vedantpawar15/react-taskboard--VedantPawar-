import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Navbar Component
 * Displays application header and main navigation links.
 */
function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <span>📋</span> Task Board
        </div>
        <nav>
          <ul className="navbar-links">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                end
              >
                Board
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/tasks/1" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Sample Task #1
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
