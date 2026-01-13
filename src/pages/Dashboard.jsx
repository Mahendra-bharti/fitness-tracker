import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Plus, Flame, TrendingUp } from 'lucide-react';
import XPProgressBar from '../components/XPProgressBar';
import TaskList from '../components/TaskList';
import AddTaskModal from '../components/AddTaskModal';
import LevelUpModal from '../components/LevelUpModal';
import BadgeUnlockModal from '../components/BadgeUnlockModal';
import { getMotivationalMessage } from '../utils/gamification';
import DisciplineCard from '../components/DisciplineCard';

const Dashboard = () => {
  const {
    userProgress,
    xpProgress,
    addTask,
    isInitialized,
    levelUpAnimation,
    setLevelUpAnimation,
    newUnlockedBadges,
  } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
        <div className="text-red-500 text-xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        {/* Animated background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-red-950/20 to-dark-950"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.1),transparent_50%)]"></div>

        <div className="relative px-4 sm:px-6 pt-6 sm:pt-8 pb-6 text-white">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl sm:text-5xl font-black mb-2 bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent"
            >
              FITQUEST
            </motion.h1>
            <p className="text-red-300/90 text-sm sm:text-base mb-6 font-medium">
              {getMotivationalMessage(userProgress)}
            </p>

            {/* Level & Streak Cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-dark-800/90 to-dark-900/90 backdrop-blur-lg border border-red-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-red-500/20 transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={18} className="text-red-500" />
                  <span className="text-xs sm:text-sm font-semibold text-red-300/80 uppercase tracking-wide">Level</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-red-500">{userProgress.level}</div>
              </motion.div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-dark-800/90 to-dark-900/90 backdrop-blur-lg border border-red-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-red-500/20 transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Flame size={18} className="text-red-500" />
                  <span className="text-xs sm:text-sm font-semibold text-red-300/80 uppercase tracking-wide">Streak</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-red-500">{userProgress.streak} 🔥</div>
              </motion.div>
            </div>

            {/* XP Progress Bar */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <XPProgressBar
                current={xpProgress.current}
                needed={xpProgress.needed}
                percentage={xpProgress.percentage}
              />
              {/* Discipline / Aura Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6"
              >
                <DisciplineCard progress={userProgress} />
              </motion.div>

            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="px-4 sm:px-6 py-6 max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-black text-white">Today's Tasks</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-red-500/50 transition-all active:scale-95 touch-manipulation min-w-[56px] min-h-[56px] flex items-center justify-center"
            aria-label="Add new task"
          >
            <Plus size={24} strokeWidth={3} />
          </motion.button>
        </div>

        <TaskList />
      </div>

      {/* Modals */}
      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTask={(text, type, taskType, duration, startDate) => {
          addTask(text, type, taskType, duration, startDate);
        }}
      />

      <LevelUpModal
        isOpen={levelUpAnimation}
        level={userProgress.level}
        onClose={() => setLevelUpAnimation(false)}
      />

      <BadgeUnlockModal
        badges={newUnlockedBadges}
        onClose={() => { }}
      />
    </div>
  );
};

export default Dashboard;

