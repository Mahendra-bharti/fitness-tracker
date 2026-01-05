// import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
// import {
//   getTasks,
//   saveTasks,
//   getUserProgress,
//   saveUserProgress,
//   shouldResetDaily,
//   resetDailyTasks,
//   getTodayDate,
//   cleanupOldTasks,
// } from '../utils/storage';
// import {
//   calculateLevel,
//   getXPProgress,
//   getXPReward,
//   updateStreak,
//   checkBadgeUnlocks,
// } from '../utils/gamification';
// import { generateTaskId } from '../utils/taskHelpers';

// const AppContext = createContext();

// export const useApp = () => {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error('useApp must be used within AppProvider');
//   }
//   return context;
// };

// export const AppProvider = ({ children }) => {
//   const [tasks, setTasks] = useState([]);
//   const [userProgress, setUserProgress] = useState({
//     xp: 0,
//     level: 1,
//     streak: 0,
//     lastActiveDate: null,
//     badges: [],
//     totalTasksCompleted: 0,
//   });
//   const [isInitialized, setIsInitialized] = useState(false);
//   const [newUnlockedBadges, setNewUnlockedBadges] = useState([]);
//   const [levelUpAnimation, setLevelUpAnimation] = useState(false);

//   // Initialize app data
//   useEffect(() => {
//     const initialize = () => {
//       // Clean up old tasks
//       cleanupOldTasks();
      
//       // Check if daily reset is needed
//       if (shouldResetDaily()) {
//         resetDailyTasks();
//       }
      
//       // Load tasks
//       const loadedTasks = getTasks();
//       setTasks(loadedTasks);
      
//       // Load user progress
//       const progress = getUserProgress();
//       const today = getTodayDate();
      
//       // Check streak
//       if (progress.lastActiveDate !== today) {
//         const streakUpdate = updateStreak(progress.lastActiveDate, today);
        
//         if (streakUpdate.lostStreak) {
//           // Apply streak loss penalty
//           const newXP = Math.max(0, progress.xp - (streakUpdate.penaltyXP || 50));
//           const newLevel = calculateLevel(newXP);
//           progress.xp = newXP;
//           progress.level = newLevel;
//           progress.streak = 0;
//         } else if (!streakUpdate.maintain) {
//           progress.streak = (progress.streak || 0) + streakUpdate.streak;
//         }
        
//         progress.lastActiveDate = today;
//         saveUserProgress(progress);
//       }
      
//       // Recalculate level based on XP
//       const currentLevel = calculateLevel(progress.xp);
//       if (currentLevel !== progress.level) {
//         progress.level = currentLevel;
//       }
      
//       setUserProgress(progress);
//       setIsInitialized(true);
//     };

//     initialize();
//   }, []);

//   // Add a new task
//   const addTask = useCallback((text, type = 'task', taskType = 'daily', duration = 0, startDate = null) => {
//     const today = getTodayDate();
//     const start = startDate || today;
    
//     if (taskType === 'daily') {
//       // Daily task - create for today only
//       const newTask = {
//         id: generateTaskId(),
//         text,
//         type,
//         taskType: 'daily',
//         duration: 0,
//         completed: false,
//         completedAt: null,
//         createdAt: new Date().toISOString(),
//         date: today,
//       };
      
//       const updatedTasks = [...tasks, newTask];
//       setTasks(updatedTasks);
//       saveTasks(updatedTasks);
//       return newTask;
//     } else {
//       // One-time task - create tasks for duration period
//       const newTasks = [];
//       const startDateObj = new Date(start);
      
//       for (let i = 0; i < duration; i++) {
//         const taskDate = new Date(startDateObj);
//         taskDate.setDate(startDateObj.getDate() + i);
//         const dateStr = taskDate.toISOString().split('T')[0];
        
//         const newTask = {
//           id: generateTaskId(),
//           text,
//           type,
//           taskType: 'one-time',
//           duration: duration,
//           startDate: start,
//           endDate: new Date(startDateObj.setDate(startDateObj.getDate() + duration - 1)).toISOString().split('T')[0],
//           completed: false,
//           completedAt: null,
//           createdAt: new Date().toISOString(),
//           date: dateStr,
//         };
        
//         newTasks.push(newTask);
//       }
      
//       const updatedTasks = [...tasks, ...newTasks];
//       setTasks(updatedTasks);
//       saveTasks(updatedTasks);
//       return newTasks;
//     }
//   }, [tasks]);

//   // Toggle task completion
//   const toggleTask = useCallback((taskId) => {
//     const task = tasks.find(t => t.id === taskId);
//     if (!task) return;

//     const wasCompleted = task.completed;
//     const updatedTasks = tasks.map(t => {
//       if (t.id === taskId) {
//         return {
//           ...t,
//           completed: !t.completed,
//           completedAt: !t.completed ? new Date().toISOString() : null,
//         };
//       }
//       return t;
//     });
    
//     setTasks(updatedTasks);
//     saveTasks(updatedTasks);

//     // Handle XP and progress updates
//     const progress = getUserProgress();
//     let newXP = progress.xp;
//     let newLevel = progress.level;
    
//     if (!wasCompleted) {
//       // Task completed - award XP
//       const xpReward = getXPReward(task.type);
//       newXP = progress.xp + xpReward;
//       newLevel = calculateLevel(newXP);
//       progress.totalTasksCompleted = (progress.totalTasksCompleted || 0) + 1;
      
//       // Check for level up
//       if (newLevel > progress.level) {
//         setLevelUpAnimation(true);
//         setTimeout(() => setLevelUpAnimation(false), 3000);
//       }
//     } else {
//       // Task uncompleted - remove XP
//       const xpReward = getXPReward(task.type);
//       newXP = Math.max(0, progress.xp - xpReward);
//       newLevel = calculateLevel(newXP);
//       progress.totalTasksCompleted = Math.max(0, (progress.totalTasksCompleted || 0) - 1);
//     }
    
//     progress.xp = newXP;
//     progress.level = newLevel;
    
//     // Check for badge unlocks
//     const badgeCheck = checkBadgeUnlocks(progress);
//     if (badgeCheck.newBadges.length > 0) {
//       progress.badges = badgeCheck.allBadges;
//       setNewUnlockedBadges(badgeCheck.newBadges);
//       setTimeout(() => setNewUnlockedBadges([]), 5000);
//     }
    
//     setUserProgress(progress);
//     saveUserProgress(progress);
//   }, [tasks]);

//   // Delete a task
//   const deleteTask = useCallback((taskId) => {
//     const updatedTasks = tasks.filter(t => t.id !== taskId);
//     setTasks(updatedTasks);
//     saveTasks(updatedTasks);
//   }, [tasks]);

//   // Get XP progress
//   const xpProgress = getXPProgress(userProgress.xp, userProgress.level);

//   const value = {
//     tasks,
//     userProgress,
//     isInitialized,
//     addTask,
//     toggleTask,
//     deleteTask,
//     xpProgress,
//     newUnlockedBadges,
//     levelUpAnimation,
//     setLevelUpAnimation,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// src/context/AppContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

import {
  getTasks,
  saveTasks,
  getUserProgress,
  saveUserProgress,
  getTodayDate,
  resetDailyTasks,
  cleanupOldTasks,
} from '../utils/storage';

import {
  calculateLevel,
  getXPReward,
  updateStreak,
  checkBadgeUnlocks,
  getXPProgress,
} from '../utils/gamification';

import { generateTaskId } from '../utils/taskHelpers';

/* =========================
   CONTEXT
========================= */
const AppContext = createContext();

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
};

/* =========================
   PROVIDER
========================= */
export const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const [userProgress, setUserProgress] = useState({
    xp: 0,
    level: 1,
    streak: 0,
    lastActiveDate: null,
    badges: [],
    totalTasksCompleted: 0,
  });

  const [newUnlockedBadges, setNewUnlockedBadges] = useState([]);
  const [levelUpAnimation, setLevelUpAnimation] = useState(false);

  /* =========================
     APP INIT + DAILY RESET
  ========================= */
  useEffect(() => {
    const init = () => {
      cleanupOldTasks();

      const today = getTodayDate();

      // 🔁 Daily reset
      const resetTasks = resetDailyTasks();
      setTasks(resetTasks);

      // 👤 User progress
      const progress = getUserProgress();

      if (progress.lastActiveDate !== today) {
        const streakResult = updateStreak(
          progress.lastActiveDate,
          today
        );

        if (streakResult.lostStreak) {
          progress.streak = 0;
          progress.xp = Math.max(0, progress.xp - 50);
        } else if (!streakResult.maintain) {
          progress.streak = (progress.streak || 0) + 1;
        }

        progress.level = calculateLevel(progress.xp);
        progress.lastActiveDate = today;
        saveUserProgress(progress);
      }

      setUserProgress(progress);
      setIsInitialized(true); // ✅ VERY IMPORTANT
    };

    init();
  }, []);

  /* =========================
     ➕ ADD TASK (MULTIPLE)
  ========================= */
  const addTask = useCallback(
    (
      text,
      type = 'task',
      taskType = 'daily',
      duration = 1,
      startDate = null
    ) => {
      const today = getTodayDate();

      const newTask = {
        id: generateTaskId(),
        text,
        type,
        taskType,
        completed: false,
        lastCompletedDate: null,
        createdAt: new Date().toISOString(),

        startDate:
          taskType === 'one-time' ? startDate || today : null,

        endDate:
          taskType === 'one-time'
            ? (() => {
                const d = new Date(startDate || today);
                d.setDate(d.getDate() + duration - 1);
                return d.toISOString().split('T')[0];
              })()
            : null,

        date: taskType === 'daily' ? today : startDate || today,
      };

      const updated = [...tasks, newTask];
      setTasks(updated);
      saveTasks(updated);
    },
    [tasks]
  );

  /* =========================
     ✅ TOGGLE TASK
  ========================= */
  const toggleTask = useCallback(
    (taskId) => {
      const today = getTodayDate();
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;

      const wasCompleted = task.completed;

      const updatedTasks = tasks.map(t =>
        t.id === taskId
          ? {
              ...t,
              completed: !t.completed,
              lastCompletedDate: !t.completed
                ? today
                : t.lastCompletedDate,
            }
          : t
      );

      setTasks(updatedTasks);
      saveTasks(updatedTasks);

      const progress = { ...userProgress };
      const xpReward = getXPReward(task.type);

      if (!wasCompleted) {
        progress.xp += xpReward;
        progress.totalTasksCompleted += 1;
      } else {
        progress.xp = Math.max(0, progress.xp - xpReward);
        progress.totalTasksCompleted = Math.max(
          0,
          progress.totalTasksCompleted - 1
        );
      }

      const newLevel = calculateLevel(progress.xp);
      if (newLevel > progress.level) {
        setLevelUpAnimation(true);
        setTimeout(() => setLevelUpAnimation(false), 3000);
      }

      progress.level = newLevel;

      const badgeCheck = checkBadgeUnlocks(progress);
      if (badgeCheck.newBadges.length) {
        progress.badges = badgeCheck.allBadges;
        setNewUnlockedBadges(badgeCheck.newBadges);
        setTimeout(() => setNewUnlockedBadges([]), 5000);
      }

      setUserProgress(progress);
      saveUserProgress(progress);
    },
    [tasks, userProgress]
  );

  /* =========================
     ❌ DELETE TASK
  ========================= */
  const deleteTask = useCallback(
    (taskId) => {
      const updated = tasks.filter(t => t.id !== taskId);
      setTasks(updated);
      saveTasks(updated);
    },
    [tasks]
  );

  const xpProgress = getXPProgress(
    userProgress.xp,
    userProgress.level
  );

  /* =========================
     PROVIDER VALUE
  ========================= */
  return (
    <AppContext.Provider
      value={{
        tasks,
        userProgress,
        isInitialized, // ✅ IMPORTANT
        addTask,
        toggleTask,
        deleteTask,
        xpProgress,
        newUnlockedBadges,
        levelUpAnimation,
        setLevelUpAnimation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
