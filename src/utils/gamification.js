/**
 * Gamification utility functions
 * Handles XP, levels, streaks, and badges logic
 */

// XP configuration
const XP_PER_FITNESS_TASK = 20;
const XP_PER_NORMAL_TASK = 10;
const BASE_XP_FOR_LEVEL = 100;
const XP_MULTIPLIER = 1.5; // Each level requires 1.5x more XP

/**
 * Calculate XP required for a specific level
 */
export const getXPForLevel = (level) => {
  if (level <= 1) return 0;
  return Math.floor(BASE_XP_FOR_LEVEL * Math.pow(XP_MULTIPLIER, level - 2));
};


export const getAuraReward = (taskType) => {
  return taskType === 'fitness' ? 5 : 0;
};


/**
 * Calculate total XP needed to reach a level
 */
export const getTotalXPForLevel = (level) => {
  if (level <= 1) return 0;
  let totalXP = 0;
  for (let i = 2; i <= level; i++) {
    totalXP += getXPForLevel(i);
  }
  return totalXP;
};

/**
 * Calculate level based on total XP
 */
export const calculateLevel = (totalXP) => {
  let level = 1;
  let xpRequired = 0;
  
  while (true) {
    const nextLevelXP = getXPForLevel(level + 1);
    if (xpRequired + nextLevelXP > totalXP) {
      break;
    }
    xpRequired += nextLevelXP;
    level++;
  }
  
  return level;
};

/**
 * Get XP progress for current level
 */
export const getXPProgress = (totalXP, level) => {
  const xpForCurrentLevel = getTotalXPForLevel(level);
  const xpForNextLevel = getTotalXPForLevel(level + 1);
  const xpInCurrentLevel = totalXP - xpForCurrentLevel;
  const xpNeededForNextLevel = xpForNextLevel - xpForCurrentLevel;
  
  return {
    current: xpInCurrentLevel,
    needed: xpNeededForNextLevel,
    percentage: Math.min((xpInCurrentLevel / xpNeededForNextLevel) * 100, 100),
  };
};

/**
 * Calculate XP reward for completing a task
 */
export const getXPReward = (taskType) => {
  return taskType === 'fitness' ? XP_PER_FITNESS_TASK : XP_PER_NORMAL_TASK;
};

/**
 * Check and update streak
 */
export const updateStreak = (lastActiveDate, todayDate) => {
  if (!lastActiveDate) {
    return { streak: 1, lostStreak: false };
  }
  
  const lastDate = new Date(lastActiveDate);
  const today = new Date(todayDate);
  const daysDiff = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
  
  if (daysDiff === 0) {
    // Same day, maintain streak
    return { streak: 0, lostStreak: false, maintain: true };
  } else if (daysDiff === 1) {
    // Consecutive day, increment streak
    return { streak: 1, lostStreak: false };
  } else {
    // Streak broken
    return { streak: 0, lostStreak: true, penaltyXP: 50 };
  }
};

/**
 * Badge definitions
 */
export const BADGES = {
  BEGINNER: {
    id: 'beginner',
    name: 'Beginner',
    description: 'Complete your first task',
    condition: (progress) => progress.totalTasksCompleted >= 1,
    icon: '🌱',
  },
  CONSISTENT: {
    id: 'consistent',
    name: 'Consistent',
    description: 'Maintain a 7-day streak',
    condition: (progress) => progress.streak >= 7,
    icon: '🔥',
  },
  CHAMPION: {
    id: 'champion',
    name: 'Champion',
    description: 'Reach level 10',
    condition: (progress) => progress.level >= 10,
    icon: '🏆',
  },
  FITNESS_FANATIC: {
    id: 'fitness_fanatic',
    name: 'Fitness Fanatic',
    description: 'Complete 50 fitness tasks',
    condition: (progress) => {
      // This would require tracking fitness tasks separately
      // For now, we'll use totalTasksCompleted as a proxy
      return progress.totalTasksCompleted >= 50;
    },
    icon: '💪',
  },
  DEDICATED: {
    id: 'dedicated',
    name: 'Dedicated',
    description: 'Maintain a 30-day streak',
    condition: (progress) => progress.streak >= 30,
    icon: '⭐',
  },
};

/**
 * Check for new badge unlocks
 */
export const checkBadgeUnlocks = (progress) => {
  const unlockedBadges = [...(progress.badges || [])];
  const newBadges = [];
  
  Object.values(BADGES).forEach(badge => {
    if (!unlockedBadges.includes(badge.id) && badge.condition(progress)) {
      unlockedBadges.push(badge.id);
      newBadges.push(badge);
    }
  });
  
  return {
    allBadges: unlockedBadges,
    newBadges,
  };
};

/**
 * Get motivational message based on progress
 */
export const getMotivationalMessage = (progress) => {
  const messages = [
    'Every journey begins with a single step! 🌟',
    'You\'re doing great! Keep it up! 💪',
    'Consistency is key! You\'ve got this! 🔥',
    'Look at that streak! Amazing! ⚡',
    'You\'re leveling up! Awesome progress! 🚀',
  ];
  
  if (progress.streak >= 30) {
    return 'Incredible dedication! You\'re a legend! 🏆';
  } else if (progress.streak >= 7) {
    return 'Great streak! You\'re on fire! 🔥';
  } else if (progress.level >= 10) {
    return 'Level 10! You\'re a champion! 🎯';
  } else if (progress.totalTasksCompleted >= 50) {
    return '50 tasks completed! Incredible work! 💪';
  }
  
  return messages[Math.floor(Math.random() * messages.length)];
};

