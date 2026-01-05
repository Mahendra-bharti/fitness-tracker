/**
 * Task helper functions
 * Utilities for task management
 */

/**
 * Generate a unique ID for tasks
 */
export const generateTaskId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Filter tasks by date
 */
export const filterTasksByDate = (tasks, date) => {
  return tasks.filter(task => task.date === date);
};

/**
 * Filter tasks by type
 */
export const filterTasksByType = (tasks, type) => {
  return tasks.filter(task => task.type === type);
};

/**
 * Get task statistics
 */
export const getTaskStats = (tasks, date) => {
  const dateTasks = filterTasksByDate(tasks, date);
  const completed = dateTasks.filter(t => t.completed).length;
  const total = dateTasks.length;
  const fitnessTasks = filterTasksByType(dateTasks, 'fitness').length;
  const normalTasks = filterTasksByType(dateTasks, 'task').length;
  
  return {
    total,
    completed,
    remaining: total - completed,
    completionRate: total > 0 ? (completed / total) * 100 : 0,
    fitnessTasks,
    normalTasks,
  };
};

export const isToday = (date) => {
  const today = new Date().toISOString().split('T')[0];
  return date === today;
};

export const isFutureDate = (date) => {
  return new Date(date) > new Date(getTodayDate());
};

export const isExpired = (endDate) => {
  return new Date(endDate) < new Date(getTodayDate());
};

export const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};
