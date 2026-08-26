import React, { useState } from 'react';
import TaskBoardHeader from '../components/TaskBoardHeader';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

// Temporary mock data for Phase 2 UI development
const INITIAL_SAMPLE_TASKS = [
  { id: 1, title: 'Set up Vite + React project foundation', completed: true },
  { id: 2, title: 'Configure React Router dynamic routes', completed: true },
  { id: 3, title: 'Build reusable component architecture', completed: false },
  { id: 4, title: 'Fetch seed tasks from JSONPlaceholder API', completed: false },
  { id: 5, title: 'Persist task state using localStorage', completed: false },
];

/**
 * TaskBoardPage Component (Route: /)
 * Parent page managing temporary mock state, calculating stats, and composing child components.
 */
function TaskBoardPage() {
  const [tasks, setTasks] = useState(INITIAL_SAMPLE_TASKS);

  // Derived metrics from tasks state
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  // Local state update handlers for Phase 2 UI demonstration
  const handleAddTask = (title) => {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
  };

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="task-board-container">
      <TaskBoardHeader
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        pendingTasks={pendingTasks}
      />

      <TaskForm onAddTask={handleAddTask} />

      <div className="board-section">
        <h2 className="section-title">All Tasks</h2>
        <TaskList
          tasks={tasks}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
        />
      </div>
    </div>
  );
}

export default TaskBoardPage;
