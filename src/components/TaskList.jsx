import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { getTodayDate, filterTasksByDate } from '../utils/storage';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { tasks, toggleTask, deleteTask } = useApp();
  const today = getTodayDate();
  const todayTasks = filterTasksByDate(tasks, today);

  const completedTasks = todayTasks.filter(t => t.completed);
  const pendingTasks = todayTasks.filter(t => !t.completed);

  if (todayTasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12 sm:py-16"
      >
        <div className="text-6xl sm:text-7xl mb-4">📝</div>
        <p className="text-red-300 font-bold text-lg sm:text-xl mb-2">No tasks for today</p>
        <p className="text-gray-400 text-sm sm:text-base">Add your first task to get started!</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      {pendingTasks.length > 0 && (
        <div>
          <h3 className="text-lg sm:text-xl font-black text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></span>
            Pending <span className="text-red-400">({pendingTasks.length})</span>
          </h3>
          <AnimatePresence>
            <div className="space-y-3 sm:space-y-4">
              {pendingTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              ))}
            </div>
          </AnimatePresence>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div>
          <h3 className="text-lg sm:text-xl font-black text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-green-500 to-green-600 rounded-full"></span>
            Completed <span className="text-red-400">({completedTasks.length})</span>
          </h3>
          <AnimatePresence>
            <div className="space-y-3 sm:space-y-4">
              {completedTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              ))}
            </div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default TaskList;

