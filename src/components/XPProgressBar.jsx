import React from 'react';
import { motion } from 'framer-motion';

const XPProgressBar = ({ current, needed, percentage }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs sm:text-sm font-bold text-red-300 uppercase tracking-wide">XP Progress</span>
        <span className="text-xs sm:text-sm font-bold text-white">
          {current} / {needed} <span className="text-red-400">XP</span>
        </span>
      </div>
      <div className="w-full bg-dark-800/50 border border-red-500/20 rounded-full h-4 sm:h-5 overflow-hidden shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-red-600 via-red-500 to-red-400 rounded-full relative overflow-hidden shadow-lg"
        >
          <motion.div
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: 'linear',
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
          <div className="absolute inset-0 bg-red-400/30 blur-sm"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default XPProgressBar;

