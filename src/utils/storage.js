
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

// export const resetDailyTasks = () => {
//   const tasks = getTasks();
//   const today = getTodayDate();
//   const lastReset = localStorage.getItem(STORAGE_KEYS.LAST_RESET_DATE);

//   if (lastReset !== today) {
//     const updated = tasks.map(task => {
//       if (task.taskType === 'daily') {
//         return {
//           ...task,
//           completed: false,
//           date: today
//         };
//       }

//       if (
//         task.taskType === 'one-time' &&
//         task.endDate &&
//         new Date(today) > new Date(task.endDate)
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

  if (lastReset === today) return tasks;

  const updated = tasks.map(task => {
    if (task.taskType === 'daily') {
      return {
        ...task,
        completed: false,
        // 🔥 date same rahegi
        // lastCompletedDate kal ka record rakhega
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
};


export const cleanupOldTasks = () => getTasks();
