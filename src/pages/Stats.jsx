import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { BarChart3, Target, Award, Calendar } from 'lucide-react';
import { getTasks, getTodayDate } from '../utils/storage';
import { getTaskStats } from '../utils/taskHelpers';

const Stats = () => {
  const { userProgress } = useApp();
  const tasks = getTasks();
  const today = getTodayDate();
  const todayStats = getTaskStats(tasks, today);

  // Calculate weekly stats (last 7 days)
  const getWeeklyStats = () => {
    const weeklyTasks = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayStats = getTaskStats(tasks, dateStr);
      weeklyTasks.push({
        date: dateStr,
        ...dayStats,
      });
    }
    return weeklyTasks;
  };

  const weeklyStats = getWeeklyStats();
  const maxCompleted = Math.max(...weeklyStats.map(s => s.completed), 1);

  const statCards = [
    {
      icon: Target,
      label: 'Total Tasks',
      value: userProgress.totalTasksCompleted || 0,
      color: 'from-red-600 to-red-700',
    },
    {
      icon: Award,
      label: 'Current Level',
      value: userProgress.level,
      color: 'from-red-700 to-red-800',
    },
    {
      icon: Calendar,
      label: 'Day Streak',
      value: `${userProgress.streak} 🔥`,
      color: 'from-red-600 to-red-700',
    },
    {
      icon: BarChart3,
      label: 'Total XP',
      value: userProgress.xp,
      color: 'from-red-700 to-red-800',
    },
  ];

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-red-950/10 to-dark-950"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.1),transparent_50%)]"></div>
        
        <div className="relative px-4 sm:px-6 pt-6 sm:pt-8 pb-6 max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white mb-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 size={32} className="text-red-500" />
              <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
                Statistics
              </h1>
            </div>
            <p className="text-red-300/90 text-sm sm:text-base font-semibold">
              Your progress at a glance
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
            {statCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-gradient-to-br ${stat.color} rounded-xl sm:rounded-2xl p-4 sm:p-5 text-white shadow-lg border border-red-400/20`}
                >
                  <Icon size={24} className="mb-2 opacity-90" />
                  <div className="text-2xl sm:text-3xl font-black mb-1">{stat.value}</div>
                  <div className="text-xs font-semibold opacity-90 uppercase tracking-wide">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>

          {/* Today's Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-dark-800/90 to-dark-900/90 backdrop-blur-lg border border-red-500/20 rounded-xl sm:rounded-2xl p-5 sm:p-6 mb-6 shadow-lg"
          >
            <h2 className="text-xl sm:text-2xl font-black text-white mb-4">Today's Progress</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-red-300/90 text-sm sm:text-base font-semibold mb-2">
                  <span>Tasks Completed</span>
                  <span className="text-white">{todayStats.completed} / {todayStats.total}</span>
                </div>
                <div className="w-full bg-dark-700 border border-red-500/20 rounded-full h-4 sm:h-5 overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${todayStats.completionRate}%`,
                    }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-red-600 via-red-500 to-red-400 rounded-full shadow-lg"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Weekly Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-dark-800/90 to-dark-900/90 backdrop-blur-lg border border-red-500/20 rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-lg"
          >
            <h2 className="text-xl sm:text-2xl font-black text-white mb-4">Weekly Progress</h2>
            <div className="space-y-3 sm:space-y-4">
              {weeklyStats.map((day, index) => {
                const date = new Date(day.date);
                const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                const isToday = day.date === today;
                
                return (
                  <div key={day.date} className="flex items-center gap-3">
                    <div className={`text-sm font-bold w-12 ${isToday ? 'text-red-400' : 'text-red-300/70'}`}>
                      {dayName}
                    </div>
                    <div className="flex-1 bg-dark-700 border border-red-500/20 rounded-full h-5 sm:h-6 overflow-hidden relative shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(day.completed / maxCompleted) * 100}%` }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className={`h-full rounded-full ${
                          isToday
                            ? 'bg-gradient-to-r from-red-500 to-red-600 shadow-lg shadow-red-500/50'
                            : 'bg-gradient-to-r from-red-600/60 to-red-500/60'
                        }`}
                      />
                    </div>
                    <div className="text-sm font-bold text-white w-8 text-right">
                      {day.completed}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Stats;

