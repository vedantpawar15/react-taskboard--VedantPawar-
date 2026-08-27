import React, { useState } from 'react';
import TaskBoardHeader from '../components/TaskBoardHeader';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

/**
 * TaskBoardPage Component (Route: /)
 * Receives shared tasks state, loading, error, and handlers from parent App,
 * manages local edit selection state, and composes board components.
 */
function TaskBoardPage({
  tasks,
  loading,
  error,
  onRetry,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onUpdateTask,
}) {
  const [editingTask, setEditingTask] = useState(null);

  // Calculate statistics from current tasks state
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  // Edit flow handlers
  const handleStartEdit = (task) => {
    setEditingTask(task);
  };

  const handleUpdate = (id, newTitle) => {
    onUpdateTask(id, newTitle);
    setEditingTask(null);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div className="task-board-container">
      <TaskBoardHeader
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        pendingTasks={pendingTasks}
      />

      <TaskForm
        taskToEdit={editingTask}
        onAddTask={onAddTask}
        onUpdateTask={handleUpdate}
        onCancelEdit={handleCancelEdit}
      />

      <div className="board-section">
        <h2 className="section-title">All Tasks</h2>
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading tasks from API...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h3>Failed to load tasks</h3>
            <p>{error}</p>
            <button className="btn btn-primary" onClick={onRetry}>
              🔄 Retry Fetching Tasks
            </button>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onToggleTask={onToggleTask}
            onEditTask={handleStartEdit}
            onDeleteTask={onDeleteTask}
          />
        )}
      </div>
    </div>
  );
}

export default TaskBoardPage;
