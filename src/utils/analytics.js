/**
 * Advanced Analytics Utilities
 * Calculate statistics, trends, and insights
 */

import { getWorkouts, getMeasurements, getGoals } from './workoutStorage';

/**
 * Get workout statistics
 */
export const getWorkoutStats = (period = 30) => {
  const workouts = getWorkouts();
  const today = new Date();
  const periodStart = new Date(today);
  periodStart.setDate(today.getDate() - period);

  const periodWorkouts = workouts.filter(w => {
    const workoutDate = new Date(w.date);
    return workoutDate >= periodStart && w.completed;
  });

  const stats = {
    totalWorkouts: periodWorkouts.length,
    totalDuration: periodWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0),
    totalCalories: periodWorkouts.reduce((sum, w) => sum + (w.calories || 0), 0),
    averageDuration: periodWorkouts.length > 0 
      ? periodWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0) / periodWorkouts.length 
      : 0,
    byType: {},
    weeklyData: [],
  };

  // Group by type
  periodWorkouts.forEach(workout => {
    stats.byType[workout.type] = (stats.byType[workout.type] || 0) + 1;
  });

  // Weekly data
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const dayWorkouts = periodWorkouts.filter(w => w.date === dateStr);
    stats.weeklyData.push({
      date: dateStr,
      count: dayWorkouts.length,
      duration: dayWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0),
    });
  }

  return stats;
};

/**
 * Get measurement trends
 */
export const getMeasurementTrends = () => {
  const measurements = getMeasurements();
  const sorted = measurements.sort((a, b) => new Date(a.date) - new Date(b.date));

  if (sorted.length === 0) return null;

  const latest = sorted[sorted.length - 1];
  const previous = sorted.length > 1 ? sorted[sorted.length - 2] : null;

  const trends = {
    weight: latest.weight,
    weightChange: previous ? latest.weight - previous.weight : 0,
    bodyFat: latest.bodyFat,
    bodyFatChange: previous && latest.bodyFat && previous.bodyFat 
      ? latest.bodyFat - previous.bodyFat 
      : 0,
    measurements: latest.measurements || {},
    measurementChanges: {},
  };

  // Calculate measurement changes
  if (previous && previous.measurements) {
    Object.keys(latest.measurements || {}).forEach(key => {
      if (previous.measurements[key]) {
        trends.measurementChanges[key] = 
          latest.measurements[key] - previous.measurements[key];
      }
    });
  }

  return trends;
};

/**
 * Get goal progress
 */
export const getGoalProgress = () => {
  const goals = getGoals();
  const active = goals.filter(g => !g.achieved);
  const achieved = goals.filter(g => g.achieved);

  const progress = active.map(goal => {
    const percentage = goal.targetValue > 0
      ? (goal.currentValue / goal.targetValue) * 100
      : 0;
    
    return {
      ...goal,
      progress: Math.min(percentage, 100),
      remaining: Math.max(goal.targetValue - goal.currentValue, 0),
    };
  });

  return {
    active,
    achieved,
    progress,
    totalActive: active.length,
    totalAchieved: achieved.length,
  };
};

/**
 * Get strength progress (PR tracking)
 */
export const getStrengthProgress = () => {
  const workouts = getWorkouts();
  const strengthWorkouts = workouts.filter(
    w => w.type === 'strength' && w.completed && w.exercises
  );

  const prs = {};

  strengthWorkouts.forEach(workout => {
    workout.exercises.forEach(exercise => {
      if (!prs[exercise.name]) {
        prs[exercise.name] = {
          maxWeight: 0,
          maxReps: 0,
          totalVolume: 0,
          workouts: 0,
        };
      }

      exercise.sets.forEach(set => {
        if (set.weight && set.weight > prs[exercise.name].maxWeight) {
          prs[exercise.name].maxWeight = set.weight;
        }
        if (set.reps && set.reps > prs[exercise.name].maxReps) {
          prs[exercise.name].maxReps = set.reps;
        }
        if (set.weight && set.reps) {
          prs[exercise.name].totalVolume += set.weight * set.reps;
        }
      });

      prs[exercise.name].workouts += 1;
    });
  });

  return prs;
};

