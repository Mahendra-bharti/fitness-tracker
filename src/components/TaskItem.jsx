import React from 'react';
import { motion } from 'framer-motion';
import { Check, Trash2, Zap, Repeat, Calendar } from 'lucide-react';

const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`p-4 rounded-xl border ${
        task.completed
          ? 'opacity-60 border-green-500/30'
          : 'border-red-500/30'
      } bg-dark-800`}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggle(task.id)}
          className={`w-10 h-10 rounded-full border flex items-center justify-center ${
            task.completed
              ? 'bg-green-600 border-green-400'
              : 'border-red-400'
          }`}
        >
          {task.completed && <Check size={18} />}
        </button>

        <div className="flex-1">
          <p className={`font-bold ${task.completed && 'line-through'}`}>
            {task.text}
          </p>

          <div className="flex gap-2 mt-1 text-xs">
            {task.type === 'fitness' && (
              <span className="text-red-400 flex items-center gap-1">
                <Zap size={10} /> Fitness
              </span>
            )}

            {task.taskType === 'daily' && (
              <span className="text-blue-400 flex items-center gap-1">
                <Repeat size={10} /> Daily
              </span>
            )}

            {task.taskType === 'one-time' && (
              <span className="text-purple-400 flex items-center gap-1">
                <Calendar size={10} />
                {task.endDate}
              </span>
            )}
          </div>
        </div>

        <button onClick={() => onDelete(task.id)}>
          <Trash2 size={18} className="text-red-400" />
        </button>
      </div>
    </motion.div>
  );
};

export default TaskItem;
