

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
  getAuraReward
} from '../utils/gamification';
import { getAuraLevel ,applyDisciplineCheck} from '../utils/discipline';

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

    //new
    auraXP: 0,
    auraLevel: 1,
    disciplineStreak: 0,
    lastDisciplineDate: null,


  });

  const [newUnlockedBadges, setNewUnlockedBadges] = useState([]);
  const [levelUpAnimation, setLevelUpAnimation] = useState(false);

  
  useEffect(() => {
  const init = () => {
    cleanupOldTasks();

    const today = getTodayDate();

    // 🔁 Daily reset
    const resetTasks = resetDailyTasks();
    setTasks(resetTasks);

    // 👤 User progress
    const progress = getUserProgress();

    // Defaults
    progress.auraXP ??= 0;
    progress.auraLevel ??= 1;
    progress.disciplineStreak ??= 0;
    progress.lastDisciplineDate ??= null;

    /* =========================
       🔥 DISCIPLINE STREAK FIX
    ========================= */
    if (progress.lastDisciplineDate !== today) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  if (progress.lastDisciplineDate === yesterdayStr) {
    
    progress.disciplineStreak += 1;

    progress.auraXP += progress.disciplineStreak * 10;
  } else {
    progress.disciplineStreak = 1;

    progress.auraXP = Math.max(0, progress.auraXP - 50);
  }

  progress.auraLevel = getAuraLevel(progress.auraXP);
  progress.lastDisciplineDate = today;
}


    /* 
       🔁 NORMAL TASK STREAK
    */
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
    }

    // ✅ SAVE ONCE
    saveUserProgress(progress);
    setUserProgress(progress);
    setIsInitialized(true);
  };

  init();
}, []);


//   useEffect(() => {
//   const init = () => {
//     cleanupOldTasks();
//     const today = getTodayDate();

//     // Daily reset
//     const resetTasks = resetDailyTasks();
//     setTasks(resetTasks);

//     // User progress
//     const progress = getUserProgress();
//     progress.auraXP ??= 0;
//     progress.auraLevel ??= 1;
//     progress.disciplineStreak ??= 0;
//     progress.lastDisciplineDate ??= null;

//     // 🔥 DISCIPLINE STREAK WITH RESET LOGIC
//     if (progress.lastDisciplineDate !== today) {
//       const yesterday = new Date();
//       yesterday.setDate(yesterday.getDate() - 1);
//       const yesterdayStr = yesterday.toISOString().split('T')[0];
      
//       // Yesterday = continue streak, older = reset streak
//       const continueStreak = progress.lastDisciplineDate === yesterdayStr;
//       applyDisciplineCheck(progress, continueStreak);
//       saveUserProgress(progress);
//     }

//     // YOUR EXISTING TASK STREAK LOGIC (unchanged)
//     if (progress.lastActiveDate !== today) {
//       const streakResult = updateStreak(progress.lastActiveDate, today);
      
//       if (streakResult.lostStreak) {
//         progress.streak = 0;
//         progress.xp = Math.max(0, progress.xp - 50);
//       } else if (!streakResult.maintain) {
//         progress.streak = (progress.streak || 0) + 1;
//       }

//       progress.level = calculateLevel(progress.xp);
//       progress.lastActiveDate = today;
//       saveUserProgress(progress);
//     }

//     setUserProgress(progress);
//     setIsInitialized(true);
//   };

//   init();
// }, []);


  

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
      const auraReward = getAuraReward(task.type);

      if (!wasCompleted) {
        progress.xp += xpReward;
        progress.auraXP += auraReward; // 🔥 AURA INCREASE
        progress.totalTasksCompleted += 1;
      } else {
        progress.xp = Math.max(0, progress.xp - xpReward);
        progress.auraXP = Math.max(0, progress.auraXP - auraReward);
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

      // progress.level = newLevel;
      progress.auraLevel = getAuraLevel(progress.auraXP);


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
