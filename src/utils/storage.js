// /**
//  * LocalStorage utility functions
//  * Handles all data persistence for tasks, user progress, and streaks
//  */


// // Storage keys
// const STORAGE_KEYS = {
//   TASKS: 'fitquest_tasks',
//   USER_PROGRESS: 'fitquest_user_progress',
//   LAST_RESET_DATE: 'fitquest_last_reset_date',
//   WORKOUTS: 'fitquest_workouts',
//   EXERCISES: 'fitquest_exercises',
//   MEASUREMENTS: 'fitquest_measurements',
//   GOALS: 'fitquest_goals',
//   WORKOUT_TEMPLATES: 'fitquest_workout_templates',
// };

// /**
//  * Task schema:
//  * {
//  *   id: string,
//  *   text: string,
//  *   type: 'fitness' | 'task',
//  *   taskType: 'daily' | 'one-time', // daily = repeats every day, one-time = single task with duration
//  *   duration: number, // duration in minutes (for one-time tasks)
//  *   startDate: string (YYYY-MM-DD), // for one-time tasks
//  *   endDate: string (YYYY-MM-DD), // for one-time tasks (startDate + duration days)
//  *   completed: boolean,
//  *   completedAt: string | null,
//  *   createdAt: string,
//  *   date: string (YYYY-MM-DD)
//  * }
//  */

// /**
//  * User progress schema:
//  * {
//  *   xp: number,
//  *   level: number,
//  *   streak: number,
//  *   lastActiveDate: string (YYYY-MM-DD),
//  *   badges: string[],
//  *   totalTasksCompleted: number
//  * }
//  */

// /**
//  * Get today's date in YYYY-MM-DD format
//  */
// export const getTodayDate = () => {
//   return new Date().toISOString().split('T')[0];
// };

// /**
//  * Check if we need to reset daily tasks
//  */
// export const shouldResetDaily = () => {
//   const lastReset = localStorage.getItem(STORAGE_KEYS.LAST_RESET_DATE);
//   const today = getTodayDate();
  
//   if (!lastReset || lastReset !== today) {
//     localStorage.setItem(STORAGE_KEYS.LAST_RESET_DATE, today);
//     return true;
//   }
//   return false;
// };

// /**
//  * Get tasks from localStorage
//  */
// export const getTasks = () => {
//   try {
//     const tasksJson = localStorage.getItem(STORAGE_KEYS.TASKS);
//     return tasksJson ? JSON.parse(tasksJson) : [];
//   } catch (error) {
//     console.error('Error loading tasks:', error);
//     return [];
//   }
// };

// /**
//  * Save tasks to localStorage
//  */
// export const saveTasks = (tasks) => {
//   try {
//     localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
//   } catch (error) {
//     console.error('Error saving tasks:', error);
//   }
// };

// /**
//  * Get user progress from localStorage
//  */
// export const getUserProgress = () => {
//   try {
//     const progressJson = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
//     const defaultProgress = {
//       xp: 0,
//       level: 1,
//       streak: 0,
//       lastActiveDate: null,
//       badges: [],
//       totalTasksCompleted: 0,
//     };
//     return progressJson ? JSON.parse(progressJson) : defaultProgress;
//   } catch (error) {
//     console.error('Error loading user progress:', error);
//     return {
//       xp: 0,
//       level: 1,
//       streak: 0,
//       lastActiveDate: null,
//       badges: [],
//       totalTasksCompleted: 0,
//     };
//   }
// };

// /**
//  * Filter tasks by date (YYYY-MM-DD)
//  */
// export const filterTasksByDate = (tasks, date) => {
//   if (!date) return tasks;

//   return tasks.filter(task => task.date === date);
// };

// /**
//  * Save user progress to localStorage
//  */
// export const saveUserProgress = (progress) => {
//   try {
//     localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
//   } catch (error) {
//     console.error('Error saving user progress:', error);
//   }
// };

// /**
//  * Reset daily tasks (mark all incomplete)
//  * Only resets daily tasks, preserves one-time tasks that are still active
//  */
// // export const resetDailyTasks = () => {
// //   const tasks = getTasks();
// //   const today = getTodayDate();
  
// //   // Reset only daily tasks for today
// //   // One-time tasks are only reset when their end date has passed
// //   const resetTasks = tasks.map(task => {
// //     if (task.date === today && task.taskType === 'daily') {
// //       // Reset daily tasks
// //       return { ...task, completed: false, completedAt: null };
// //     } else if (task.taskType === 'one-time' && task.endDate) {
// //       // Remove one-time tasks that have expired
// //       const endDate = new Date(task.endDate);
// //       const todayDate = new Date(today);
// //       if (endDate < todayDate) {
// //         return null; // Mark for removal
// //       }
// //     }
// //     return task;
// //   }).filter(task => task !== null); // Remove expired tasks
  
// //   saveTasks(resetTasks);
// //   return resetTasks;
// // };
// export const resetDailyTasks = () => {
//   const tasks = getTasks();
//   const today = getTodayDate();
  
//   const resetTasks = tasks.map(task => {
//     if (task.taskType === 'daily') {  
//       return { 
//         ...task, 
//         date: today,           // Update date to today
//         completed: false, 
//         completedAt: null 
//       };
//     } else if (task.taskType === 'one-time' && task.endDate) {
//       const endDate = new Date(task.endDate);
//       const todayDate = new Date(today);
//       if (endDate < todayDate) {
//         return null; 
//       }
//     }
//     return task;
//   }).filter(task => task !== null);
  
//   saveTasks(resetTasks);
//   return resetTasks;
// };
// /**
//  * Clean up old tasks (older than 30 days)
//  */
// export const cleanupOldTasks = () => {
//   const tasks = getTasks();
//   const today = new Date();
//   const thirtyDaysAgo = new Date(today);
//   thirtyDaysAgo.setDate(today.getDate() - 30);
  
//   const filteredTasks = tasks.filter(task => {
//     const taskDate = new Date(task.date);
//     return taskDate >= thirtyDaysAgo;
//   });
  
//   saveTasks(filteredTasks);
//   return filteredTasks;
// };

// src/utils/storage.js
const STORAGE_KEYS = {
  TASKS: 'fitquest_tasks',
  USER_PROGRESS: 'fitquest_user_progress',
  LAST_RESET_DATE: 'fitquest_last_reset_date',
};

export const getTodayDate = () => {
  const d = new Date();
  const localDate = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return localDate.toISOString().split('T')[0];
};


export const getTasks = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.TASKS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveTasks = (tasks) => {
  localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
};

export const getUserProgress = () => {
  const data = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
  return data
    ? JSON.parse(data)
    : {
        xp: 0,
        level: 1,
        streak: 0,
        lastActiveDate: null,
        badges: [],
        totalTasksCompleted: 0,
      };
};

export const saveUserProgress = (progress) => {
  localStorage.setItem(
    STORAGE_KEYS.USER_PROGRESS,
    JSON.stringify(progress)
  );
};

/**
 * ✅ Daily reset + one-time expiry marking
 */
// export const resetDailyTasks = () => {
//   const tasks = getTasks();
//   const today = getTodayDate();
//   const lastReset = localStorage.getItem(STORAGE_KEYS.LAST_RESET_DATE);

//   if (lastReset !== today) {
//     const updated = tasks.map(task => {
//       if (task.taskType === 'daily') {
//         return { ...task, completed: false };
//       }

//       if (
//         task.taskType === 'one-time' &&
//         task.endDate &&
//         today > task.endDate
//       ) {
//         return { ...task, isExpired: true };
//       }

//       return task;
//     });

//     saveTasks(updated);
//     localStorage.setItem(STORAGE_KEYS.LAST_RESET_DATE, today);
//     return updated;
//   }

//   return tasks;
// };
export const resetDailyTasks = () => {
  const tasks = getTasks();
  const today = getTodayDate();
  const lastReset = localStorage.getItem(STORAGE_KEYS.LAST_RESET_DATE);

  if (lastReset !== today) {
    const updated = tasks.map(task => {
      if (task.taskType === 'daily') {
        return {
          ...task,
          completed: false,
          date: today
        };
      }

      if (
        task.taskType === 'one-time' &&
        task.endDate &&
        new Date(today) > new Date(task.endDate)
      ) {
        return { ...task, isExpired: true };
      }

      return task;
    });

    saveTasks(updated);
    localStorage.setItem(STORAGE_KEYS.LAST_RESET_DATE, today);
    return updated;
  }

  return tasks;
};



export const cleanupOldTasks = () => getTasks();
