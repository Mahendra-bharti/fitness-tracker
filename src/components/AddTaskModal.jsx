import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Repeat, Calendar, Clock } from 'lucide-react';

const AddTaskModal = ({ isOpen, onClose, onAddTask }) => {
  const [text, setText] = useState('');
  const [type, setType] = useState('task');
  const [taskType, setTaskType] = useState('daily'); // 'daily' or 'one-time'
  const [duration, setDuration] = useState(1); // in days
  const [startDate, setStartDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      if (taskType === 'one-time' && duration < 1) {
        alert('Please set duration (at least 1 day)');
        return;
      }
      onAddTask(text.trim(), type, taskType, duration, startDate);
      setText('');
      setType('task');
      setTaskType('daily');
      setDuration(1);
      setStartDate(new Date().toISOString().split('T')[0]);
      onClose();
    }
  };

  const calculateEndDate = () => {
    if (taskType === 'one-time' && duration > 0) {
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + duration - 1);
      return endDate.toISOString().split('T')[0];
    }
    return null;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 z-40"
          />
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0  top-4 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 border-t border-red-500/30 rounded-t-3xl p-6 z-50 shadow-2xl max-w-md mx-auto max-h-[78vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-white">Add New Task</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-red-500/20 active:bg-red-500/30 rounded-full transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close modal"
              >
                <X size={24} className="text-red-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Task Description */}
              <div className="mb-5">
                <label className="block text-sm font-bold text-red-300 mb-3 uppercase tracking-wide">
                  Task Description
                </label>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="e.g., Go for a 30-minute run"
                  className="w-full px-4 py-4 bg-dark-700 border border-red-500/30 text-white rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder:text-gray-500 text-base"
                  autoFocus
                  required
                />
              </div>

              {/* Task Frequency: Daily or One-time */}
              <div className="mb-5">
                <label className="block text-sm font-bold text-red-300 mb-3 uppercase tracking-wide flex items-center gap-2">
                  <Repeat size={16} />
                  Task Frequency
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setTaskType('daily');
                      setDuration(1);
                    }}
                    className={`px-4 py-4 rounded-xl font-bold transition-all touch-manipulation active:scale-95 ${
                      taskType === 'daily'
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/50 scale-105 border-2 border-red-500'
                        : 'bg-dark-700 text-gray-300 hover:bg-dark-600 border-2 border-dark-600'
                    }`}
                  >
                    <Repeat size={20} className="mx-auto mb-1" />
                    Daily Task
                  </button>
                  <button
                    type="button"
                    onClick={() => setTaskType('one-time')}
                    className={`px-4 py-4 rounded-xl font-bold transition-all touch-manipulation active:scale-95 ${
                      taskType === 'one-time'
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/50 scale-105 border-2 border-red-500'
                        : 'bg-dark-700 text-gray-300 hover:bg-dark-600 border-2 border-dark-600'
                    }`}
                  >
                    <Calendar size={20} className="mx-auto mb-1" />
                    One-Time Task
                  </button>
                </div>
                <p className="text-xs text-red-300/80 mt-2 font-semibold">
                  {taskType === 'daily' 
                    ? '🔄 Repeats every day' 
                    : '📅 Single task with duration'}
                </p>
              </div>

              {/* Duration Input (for one-time tasks) */}
              {taskType === 'one-time' && (
                <>
                  <div className="mb-5">
                    <label className="block text-sm font-bold text-red-300 mb-3 uppercase tracking-wide flex items-center gap-2">
                      <Clock size={16} />
                      Duration (days)
                    </label>
                    <input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                      placeholder="How many days?"
                      className="w-full px-4 py-4 bg-dark-700 border border-red-500/30 text-white rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-base"
                      required={taskType === 'one-time'}
                    />
                  </div>

                  {/* Start Date (for one-time tasks) */}
                  <div className="mb-5">
                    <label className="block text-sm font-bold text-red-300 mb-3 uppercase tracking-wide">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-4 py-4 bg-dark-700 border border-red-500/30 text-white rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                      required={taskType === 'one-time'}
                    />
                    {calculateEndDate() && (
                      <p className="text-xs text-red-300/80 mt-2 font-semibold">
                        📅 Ends: {new Date(calculateEndDate()).toLocaleDateString()} ({duration} days)
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* Category: Fitness or Normal */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-red-300 mb-3 uppercase tracking-wide">
                  Category
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setType('task')}
                    className={`px-4 py-4 rounded-xl font-bold transition-all touch-manipulation active:scale-95 ${
                      type === 'task'
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/50 scale-105 border-2 border-red-500'
                        : 'bg-dark-700 text-gray-300 hover:bg-dark-600 border-2 border-dark-600'
                    }`}
                  >
                    Normal Task
                  </button>
                  <button
                    type="button"
                    onClick={() => setType('fitness')}
                    className={`px-4 py-4 rounded-xl font-bold transition-all touch-manipulation active:scale-95 ${
                      type === 'fitness'
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/50 scale-105 border-2 border-red-500'
                        : 'bg-dark-700 text-gray-300 hover:bg-dark-600 border-2 border-dark-600'
                    }`}
                  >
                    💪 Fitness
                  </button>
                </div>
                <p className="text-xs text-red-300/80 mt-3 font-semibold">
                  {type === 'fitness' ? '🔥 Awards 20 XP' : '✨ Awards 10 XP'}
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white py-4 rounded-xl font-black text-lg shadow-lg shadow-red-500/50 hover:shadow-red-500/70 transform active:scale-[0.98] transition-all touch-manipulation"
              >
                {taskType === 'daily' ? 'Add Daily Task' : `Add Task (${duration} days)`}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddTaskModal;
