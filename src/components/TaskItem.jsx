import React from 'react';
import { motion } from 'framer-motion';
import { Check, Trash2, Zap, Repeat, Calendar, Clock } from 'lucide-react';

const TaskItem = ({ task, onToggle, onDelete }) => {
  const isFitness = task.type === 'fitness';
  const isDaily = task.taskType === 'daily';
  const isOneTime = task.taskType === 'one-time';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      layout
      className={`bg-gradient-to-br from-dark-800/90 to-dark-900/90 border border-red-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-red-500/20 transition-all touch-manipulation ${
        task.completed ? 'opacity-60 border-red-500/10' : 'hover:border-red-500/40'
      }`}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={() => onToggle(task.id)}
          className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center transition-all active:scale-90 ${
            task.completed
              ? 'bg-gradient-to-br from-red-600 to-red-700 border-red-500 shadow-lg shadow-red-500/30'
              : 'border-red-500/40 bg-dark-700 hover:border-red-500 hover:bg-red-500/10'
          }`}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed && <Check size={20} className="text-white" strokeWidth={3} />}
        </button>

        <div className="flex-1 min-w-0">
          <p
            className={`font-semibold text-white text-sm sm:text-base ${
              task.completed ? 'line-through text-gray-400' : ''
            }`}
          >
            {task.text}
          </p>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {isFitness && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/30">
                <Zap size={10} />
                Fitness
              </span>
            )}
            {isDaily && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/30">
                <Repeat size={10} />
                Daily
              </span>
            )}
            {isOneTime && task.endDate && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/30">
                <Calendar size={10} />
                {task.endDate}
              </span>
            )}
            <span className="text-xs font-bold text-red-300">
              {isFitness ? '+20 XP' : '+10 XP'}
            </span>
          </div>
        </div>

        <button
          onClick={() => onDelete(task.id)}
          className="flex-shrink-0 p-2 sm:p-3 hover:bg-red-500/20 active:bg-red-500/30 rounded-lg transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Delete task"
        >
          <Trash2 size={18} className="text-red-400 hover:text-red-300" />
        </button>
      </div>
    </motion.div>
  );
};

export default TaskItem;
