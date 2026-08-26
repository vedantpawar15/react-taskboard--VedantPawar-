import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TaskBoardPage from './pages/TaskBoardPage';
import TaskDetailPage from './pages/TaskDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

/**
 * App Component
 * Configures top-level layout and application routes using React Router v6+.
 */
function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<TaskBoardPage />} />
            <Route path="/tasks/:id" element={<TaskDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>Task Board Internship Assignment — Phase 1</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
