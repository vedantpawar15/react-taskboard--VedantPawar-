/**
 * Task Storage Service
 * Handles localStorage persistence and data validation for task items.
 */

const STORAGE_KEY = 'react_taskboard_tasks';

/**
 * Loads and validates tasks array from localStorage.
 * Handles missing key, invalid JSON, and non-array payloads safely.
 * 
 * @returns {Array|null} Array of tasks if valid data exists, or null if missing/corrupted.
 */
export function loadTasks() {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) {
      return null;
    }

    const parsed = JSON.parse(rawData);
    if (Array.isArray(parsed)) {
      return parsed;
    }

    // Parsed payload is not an array — clear invalid data
    localStorage.removeItem(STORAGE_KEY);
    return null;
  } catch (error) {
    // JSON parsing error or storage restriction — clear corrupted data safely
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (removeError) {
      // Ignore storage remove errors
    }
    return null;
  }
}

/**
 * Persists tasks array to localStorage.
 * 
 * @param {Array} tasks - Current tasks state to save
 */
export function saveTasks(tasks) {
  try {
    if (Array.isArray(tasks)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  } catch (error) {
    console.error('Failed to save tasks to localStorage:', error);
  }
}
