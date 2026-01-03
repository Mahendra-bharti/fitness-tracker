import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Trophy, Lock } from 'lucide-react';
import { BADGES } from '../utils/gamification';

const Rewards = () => {
  const { userProgress } = useApp();
  const unlockedBadges = userProgress.badges || [];

  const allBadges = Object.values(BADGES);

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
              <Trophy size={32} className="text-red-500" />
              <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
                Your Rewards
              </h1>
            </div>
            <p className="text-red-300/90 text-sm sm:text-base font-semibold">
              {unlockedBadges.length} of {allBadges.length} badges unlocked
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {allBadges.map((badge, index) => {
              const isUnlocked = unlockedBadges.includes(badge.id);
              
              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 transition-all touch-manipulation ${
                    isUnlocked
                      ? 'bg-gradient-to-br from-dark-800 to-dark-900 border-red-500/50 shadow-lg shadow-red-500/20'
                      : 'bg-dark-800/50 backdrop-blur-lg border-red-500/20'
                  }`}
                >
                  {!isUnlocked && (
                    <div className="absolute top-2 right-2">
                      <Lock size={18} className="text-gray-500" />
                    </div>
                  )}

                  <motion.div
                    animate={isUnlocked ? {
                      rotate: [0, 10, -10, 0],
                    } : {}}
                    transition={{
                      repeat: isUnlocked ? Infinity : 0,
                      duration: 2,
                      ease: 'easeInOut',
                    }}
                    className={`text-5xl sm:text-6xl mb-3 ${!isUnlocked ? 'grayscale opacity-40' : ''}`}
                  >
                    {badge.icon}
                  </motion.div>

                  <h3 className={`font-black text-base sm:text-lg mb-1 ${
                    isUnlocked ? 'text-white' : 'text-gray-500'
                  }`}>
                    {badge.name}
                  </h3>
                  <p className={`text-xs sm:text-sm font-medium ${
                    isUnlocked ? 'text-red-300/80' : 'text-gray-500'
                  }`}>
                    {badge.description}
                  </p>

                  {isUnlocked && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-xs font-black shadow-lg border-2 border-white/20"
                    >
                      ✓
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {unlockedBadges.length === allBadges.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-gradient-to-br from-red-600/20 to-red-700/20 backdrop-blur-lg border-2 border-red-500/30 rounded-2xl p-6 text-center"
            >
              <div className="text-5xl mb-3">🎉</div>
              <h3 className="text-white font-black text-xl sm:text-2xl mb-2">
                ALL BADGES UNLOCKED!
              </h3>
              <p className="text-red-300/90 text-sm sm:text-base font-semibold">
                You're a true champion! Keep up the amazing work! 🔥
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rewards;

