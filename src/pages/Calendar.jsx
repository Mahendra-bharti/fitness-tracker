

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTodayDate } from '../utils/storage';

const Calendar = () => {
  const { tasks } = useApp(); // ✅ CONTEXT
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const today = getTodayDate();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];

  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  const getDateString = (day) =>
    `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const prevMonth = () =>
    setCurrentDate(new Date(year, month - 1, 1));

  const nextMonth = () =>
    setCurrentDate(new Date(year, month + 1, 1));

 
const getDateTasks = date =>
  tasks.filter(t => {
    if (t.taskType === 'daily') {
      return t.lastCompletedDate === date;
    }

    if (t.taskType === 'one-time') {
      return date >= t.startDate && date <= t.endDate;
    }

    return false;
  });



  // ✅ DEADLINE RING
  const hasDeadline = (date) =>
    tasks.some(
      t =>
        t.taskType === 'one-time' &&
        t.endDate === date &&
        !t.completed
    );

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  const selectedTasks = getDateTasks(selectedDate);
  const completedCount = selectedTasks.filter(t => t.completed).length;

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      <div className="px-4 pt-6 max-w-md mx-auto text-white">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <CalendarIcon size={32} className="text-red-500" />
            <h1 className="text-3xl font-black bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              Calendar
            </h1>
          </div>

          {/* MONTH NAV */}
          <div className="flex justify-between items-center bg-dark-800 border border-red-500/20 rounded-xl p-4">
            <button onClick={prevMonth}>
              <ChevronLeft className="text-red-400" />
            </button>
            <div className="font-black text-lg">
              {monthNames[month]} {year}
            </div>
            <button onClick={nextMonth}>
              <ChevronRight className="text-red-400" />
            </button>
          </div>
        </motion.div>

        {/* CALENDAR GRID */}
        <div className="bg-dark-800 border border-red-500/20 rounded-xl p-4 mb-6">
          <div className="grid grid-cols-7 gap-2 mb-2">
            {dayNames.map(d => (
              <div key={d} className="text-xs text-center text-red-300 font-bold">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, idx) => {
              if (!day) return <div key={idx} />;

              const date = getDateString(day);
              const dayTasks = getDateTasks(date);

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(date)}
                  className={`aspect-square rounded-lg relative transition-all
                    ${date === today
                      ? 'bg-red-600 font-black'
                      : date === selectedDate
                      ? 'bg-red-500/30 border-2 border-red-500'
                      : 'bg-dark-700'}
                    ${hasDeadline(date) ? 'ring-2 ring-red-500 animate-pulse' : ''}
                  `}
                >
                  {day}
                  {dayTasks.length > 0 && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* SELECTED DATE TASKS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-800 border border-red-500/20 rounded-xl p-5"
        >
          <h2 className="text-lg font-black mb-3">
            {new Date(selectedDate).toDateString()}
          </h2>

          {selectedTasks.length === 0 ? (
            <p className="text-gray-400 text-sm text-center">
              No tasks for this day
            </p>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-3 text-red-300 font-bold">
                <CheckCircle size={18} />
                Tasks ({completedCount}/{selectedTasks.length})
              </div>

              <div className="space-y-2">
                {selectedTasks.map(task => (
                  <div
                    key={task.id}
                    className={`p-2 rounded-lg border text-sm
                      ${task.completed
                        ? 'bg-green-500/10 border-green-500/30 text-gray-400 line-through'
                        : 'bg-dark-700 border-dark-600'}
                    `}
                  >
                    {task.text}
                    {task.taskType === 'one-time' && !task.completed && (
                      <span className="ml-2 text-xs text-red-400 font-bold">
                        (Deadline: {task.endDate})
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Calendar;
