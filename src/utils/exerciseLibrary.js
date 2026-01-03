/**
 * Exercise Library
 * Predefined exercises categorized by type
 */

export const EXERCISE_LIBRARY = {
  strength: [
    { name: 'Push-ups', category: 'chest' },
    { name: 'Pull-ups', category: 'back' },
    { name: 'Squats', category: 'legs' },
    { name: 'Deadlifts', category: 'legs' },
    { name: 'Bench Press', category: 'chest' },
    { name: 'Shoulder Press', category: 'shoulders' },
    { name: 'Bicep Curls', category: 'arms' },
    { name: 'Tricep Dips', category: 'arms' },
    { name: 'Lunges', category: 'legs' },
    { name: 'Planks', category: 'core' },
    { name: 'Crunches', category: 'core' },
    { name: 'Rows', category: 'back' },
    { name: 'Leg Press', category: 'legs' },
    { name: 'Calf Raises', category: 'legs' },
    { name: 'Lat Pulldown', category: 'back' },
  ],
  cardio: [
    { name: 'Running', category: 'running' },
    { name: 'Cycling', category: 'cycling' },
    { name: 'Swimming', category: 'swimming' },
    { name: 'Jump Rope', category: 'hiit' },
    { name: 'Burpees', category: 'hiit' },
    { name: 'Mountain Climbers', category: 'hiit' },
    { name: 'Rowing', category: 'cardio' },
    { name: 'Elliptical', category: 'cardio' },
    { name: 'Stair Climbing', category: 'cardio' },
    { name: 'High Knees', category: 'hiit' },
  ],
  flexibility: [
    { name: 'Yoga', category: 'yoga' },
    { name: 'Stretching', category: 'flexibility' },
    { name: 'Pilates', category: 'core' },
    { name: 'Tai Chi', category: 'mind-body' },
    { name: 'Hamstring Stretch', category: 'flexibility' },
    { name: 'Hip Flexor Stretch', category: 'flexibility' },
    { name: 'Shoulder Stretch', category: 'flexibility' },
    { name: 'Back Stretch', category: 'flexibility' },
  ],
  sport: [
    { name: 'Basketball', category: 'team' },
    { name: 'Soccer', category: 'team' },
    { name: 'Tennis', category: 'racket' },
    { name: 'Volleyball', category: 'team' },
    { name: 'Badminton', category: 'racket' },
    { name: 'Golf', category: 'outdoor' },
  ],
};

export const getExercisesByType = (type) => {
  return EXERCISE_LIBRARY[type] || [];
};

export const getAllExercises = () => {
  return Object.values(EXERCISE_LIBRARY).flat();
};

