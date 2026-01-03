/**
 * Advanced Workout Storage Utilities
 * Handles workout tracking, exercises, measurements, and templates
 */

const STORAGE_KEYS = {
  WORKOUTS: 'fitquest_workouts',
  EXERCISES: 'fitquest_exercises',
  MEASUREMENTS: 'fitquest_measurements',
  GOALS: 'fitquest_goals',
  WORKOUT_TEMPLATES: 'fitquest_workout_templates',
};

/**
 * Workout schema:
 * {
 *   id: string,
 *   name: string,
 *   type: 'strength' | 'cardio' | 'flexibility' | 'sport',
 *   date: string (YYYY-MM-DD),
 *   duration: number (minutes),
 *   exercises: [
 *     {
 *       id: string,
 *       name: string,
 *       sets: [
 *         { reps: number, weight: number, duration: number, rest: number }
 *       ]
 *     }
 *   ],
 *   notes: string,
 *   calories: number,
 *   completed: boolean
 * }
 */

/**
 * Measurement schema:
 * {
 *   id: string,
 *   date: string (YYYY-MM-DD),
 *   weight: number (kg),
 *   bodyFat: number (percentage),
 *   measurements: {
 *     chest: number, waist: number, hips: number, arms: number, thighs: number
 *   },
 *   photos: string[] (base64)
 * }
 */

/**
 * Goal schema:
 * {
 *   id: string,
 *   type: 'weight' | 'strength' | 'endurance' | 'flexibility' | 'custom',
 *   title: string,
 *   description: string,
 *   targetValue: number,
 *   currentValue: number,
 *   unit: string,
 *   deadline: string (YYYY-MM-DD),
 *   achieved: boolean
 * }
 */

// Get workouts
export const getWorkouts = () => {
  try {
    const workoutsJson = localStorage.getItem(STORAGE_KEYS.WORKOUTS);
    return workoutsJson ? JSON.parse(workoutsJson) : [];
  } catch (error) {
    console.error('Error loading workouts:', error);
    return [];
  }
};

// Save workouts
export const saveWorkouts = (workouts) => {
  try {
    localStorage.setItem(STORAGE_KEYS.WORKOUTS, JSON.stringify(workouts));
  } catch (error) {
    console.error('Error saving workouts:', error);
  }
};

// Add workout
export const addWorkout = (workout) => {
  const workouts = getWorkouts();
  const newWorkout = {
    ...workout,
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
  };
  workouts.push(newWorkout);
  saveWorkouts(workouts);
  return newWorkout;
};

// Get workouts by date
export const getWorkoutsByDate = (date) => {
  const workouts = getWorkouts();
  return workouts.filter(w => w.date === date);
};

// Get body measurements
export const getMeasurements = () => {
  try {
    const measurementsJson = localStorage.getItem(STORAGE_KEYS.MEASUREMENTS);
    return measurementsJson ? JSON.parse(measurementsJson) : [];
  } catch (error) {
    console.error('Error loading measurements:', error);
    return [];
  }
};

// Save measurements
export const saveMeasurements = (measurements) => {
  try {
    localStorage.setItem(STORAGE_KEYS.MEASUREMENTS, JSON.stringify(measurements));
  } catch (error) {
    console.error('Error saving measurements:', error);
  }
};

// Add measurement
export const addMeasurement = (measurement) => {
  const measurements = getMeasurements();
  const newMeasurement = {
    ...measurement,
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
  };
  measurements.push(newMeasurement);
  saveMeasurements(measurements);
  return newMeasurement;
};

// Get goals
export const getGoals = () => {
  try {
    const goalsJson = localStorage.getItem(STORAGE_KEYS.GOALS);
    return goalsJson ? JSON.parse(goalsJson) : [];
  } catch (error) {
    console.error('Error loading goals:', error);
    return [];
  }
};

// Save goals
export const saveGoals = (goals) => {
  try {
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
  } catch (error) {
    console.error('Error saving goals:', error);
  }
};

// Add goal
export const addGoal = (goal) => {
  const goals = getGoals();
  const newGoal = {
    ...goal,
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    achieved: false,
    createdAt: new Date().toISOString(),
  };
  goals.push(newGoal);
  saveGoals(goals);
  return newGoal;
};

// Get workout templates
export const getWorkoutTemplates = () => {
  try {
    const templatesJson = localStorage.getItem(STORAGE_KEYS.WORKOUT_TEMPLATES);
    return templatesJson ? JSON.parse(templatesJson) : [];
  } catch (error) {
    console.error('Error loading templates:', error);
    return [];
  }
};

// Save workout templates
export const saveWorkoutTemplates = (templates) => {
  try {
    localStorage.setItem(STORAGE_KEYS.WORKOUT_TEMPLATES, JSON.stringify(templates));
  } catch (error) {
    console.error('Error saving templates:', error);
  }
};

// Export all data
export const exportData = () => {
  return {
    workouts: getWorkouts(),
    measurements: getMeasurements(),
    goals: getGoals(),
    templates: getWorkoutTemplates(),
    exportedAt: new Date().toISOString(),
  };
};

// Import data
export const importData = (data) => {
  try {
    if (data.workouts) saveWorkouts(data.workouts);
    if (data.measurements) saveMeasurements(data.measurements);
    if (data.goals) saveGoals(data.goals);
    if (data.templates) saveWorkoutTemplates(data.templates);
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};

