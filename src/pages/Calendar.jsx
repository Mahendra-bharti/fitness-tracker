import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Dumbbell, CheckCircle } from 'lucide-react';
import { getTasks } from '../utils/storage';
import { getWorkoutsByDate } from '../utils/workoutStorage';
import { getTodayDate } from '../utils/storage';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const tasks = getTasks();
  const today = getTodayDate();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Previous/Next month
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Get date string in YYYY-MM-DD format
  const getDateString = (day) => {
    return new Date(year, month, day).toISOString().split('T')[0];
  };

  // Check if date has tasks
  const getDateTasks = (dateStr) => {
    return tasks.filter(t => t.date === dateStr);
  };

  // Check if date has workouts
  const getDateWorkouts = (dateStr) => {
    return getWorkoutsByDate(dateStr);
  };

  // Check if date is today
  const isToday = (day) => {
    const dateStr = getDateString(day);
    return dateStr === today;
  };

  // Check if date is selected
  const isSelected = (day) => {
    const dateStr = getDateString(day);
    return dateStr === selectedDate;
  };

  // Get selected date details
  const selectedDateTasks = getDateTasks(selectedDate);
  const selectedDateWorkouts = getDateWorkouts(selectedDate);
  const completedTasks = selectedDateTasks.filter(t => t.completed);
  const completedWorkouts = selectedDateWorkouts.filter(w => w.completed);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Generate calendar days
  const calendarDays = [];
  
  // Empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-red-950/10 to-dark-950"></div>
        
        <div className="relative px-4 sm:px-6 pt-6 sm:pt-8 pb-6 max-w-md mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white mb-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <CalendarIcon size={32} className="text-red-500" />
              <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
                Calendar
              </h1>
            </div>

            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6 bg-gradient-to-br from-dark-800 to-dark-900 border border-red-500/20 rounded-xl p-4">
              <button
                onClick={prevMonth}
                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors touch-manipulation"
              >
                <ChevronLeft size={24} className="text-red-400" />
              </button>
              <div className="text-xl font-black text-white">
                {monthNames[month]} {year}
              </div>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors touch-manipulation"
              >
                <ChevronRight size={24} className="text-red-400" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="bg-gradient-to-br from-dark-800 to-dark-900 border border-red-500/20 rounded-xl p-4 mb-6">
              {/* Day Names */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {dayNames.map(day => (
                  <div key={day} className="text-center text-xs font-bold text-red-300/80 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, idx) => {
                  if (day === null) {
                    return <div key={`empty-${idx}`} className="aspect-square" />;
                  }

                  const dateStr = getDateString(day);
                  const dateTasks = getDateTasks(dateStr);
                  const dateWorkouts = getDateWorkouts(dateStr);
                  const hasTasks = dateTasks.length > 0;
                  const hasWorkouts = dateWorkouts.length > 0;
                  const allCompleted = dateTasks.length > 0 && 
                    dateTasks.every(t => t.completed) &&
                    (dateWorkouts.length === 0 || dateWorkouts.every(w => w.completed));

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(dateStr)}
                      className={`aspect-square rounded-lg transition-all touch-manipulation relative ${
                        isToday(day)
                          ? 'bg-red-600 text-white font-black border-2 border-red-400'
                          : isSelected(day)
                          ? 'bg-red-500/30 text-white font-bold border-2 border-red-500'
                          : 'bg-dark-700 text-gray-300 hover:bg-dark-600 border border-dark-600'
                      }`}
                    >
                      <div className="text-sm">{day}</div>
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                        {hasTasks && (
                          <div className={`w-1.5 h-1.5 rounded-full ${allCompleted ? 'bg-green-400' : 'bg-yellow-400'}`} />
                        )}
                        {hasWorkouts && (
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Selected Date Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-dark-800 to-dark-900 border border-red-500/20 rounded-xl p-5"
          >
            <h2 className="text-xl font-black text-white mb-4">
              {new Date(selectedDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </h2>

            {/* Tasks */}
            {selectedDateTasks.length > 0 ? (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-red-300 flex items-center gap-2">
                    <CheckCircle size={18} />
                    Tasks ({completedTasks.length}/{selectedDateTasks.length})
                  </h3>
                </div>
                <div className="space-y-2">
                  {selectedDateTasks.map(task => (
                    <div
                      key={task.id}
                      className={`flex items-center gap-2 p-2 rounded-lg ${
                        task.completed
                          ? 'bg-green-500/10 border border-green-500/30'
                          : 'bg-dark-700 border border-dark-600'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${task.completed ? 'bg-green-400' : 'bg-yellow-400'}`} />
                      <span className={`text-sm flex-1 ${task.completed ? 'text-gray-400 line-through' : 'text-white'}`}>
                        {task.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mb-4 text-center py-4">
                <p className="text-gray-400 text-sm">No tasks for this day</p>
              </div>
            )}

            {/* Workouts */}
            {selectedDateWorkouts.length > 0 && (
              <div>
                <h3 className="font-bold text-red-300 mb-3 flex items-center gap-2">
                  <Dumbbell size={18} />
                  Workouts ({completedWorkouts.length}/{selectedDateWorkouts.length})
                </h3>
                <div className="space-y-2">
                  {selectedDateWorkouts.map(workout => (
                    <div
                      key={workout.id}
                      className={`p-3 rounded-lg border ${
                        workout.completed
                          ? 'bg-green-500/10 border-green-500/30'
                          : 'bg-dark-700 border-dark-600'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-2 h-2 rounded-full ${workout.completed ? 'bg-green-400' : 'bg-yellow-400'}`} />
                        <span className={`font-bold ${workout.completed ? 'text-gray-400' : 'text-white'}`}>
                          {workout.name}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 ml-4">
                        {workout.type} • {workout.duration}min
                        {workout.calories && ` • ${workout.calories} cal`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedDateTasks.length === 0 && selectedDateWorkouts.length === 0 && (
              <div className="text-center py-8">
                <CalendarIcon size={48} className="text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">No activities for this day</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;

