// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Target, Plus, Trophy, X, Trash2 } from 'lucide-react';
// import { getGoals, addGoal, saveGoals } from '../utils/workoutStorage';

// const Goals = () => {
//   const [goals, setGoals] = useState(getGoals());
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [deleteGoalId, setDeleteGoalId] = useState(null);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     type: 'weight',
//     metrics: [{ name: 'Weight', current: 0, target: 0, unit: 'kg' }],
//     deadline: '',
//   });

//   // Dynamic goal types
//   const [customGoalTypes, setCustomGoalTypes] = useState([]);
//   const defaultGoalTypes = {
//     weight: { icon: '⚖️', color: 'from-red-600 to-red-700' },
//     strength: { icon: '💪', color: 'from-orange-600 to-orange-700' },
//     endurance: { icon: '🏃', color: 'from-blue-600 to-blue-700' },
//     flexibility: { icon: '🧘', color: 'from-purple-600 to-purple-700' },
//     custom: { icon: '🎯', color: 'from-green-600 to-green-700' },
//   };
//   const allGoalTypes = {
//     ...defaultGoalTypes,
//     ...customGoalTypes.reduce((acc, t) => {
//       acc[t.value] = { icon: t.icon, color: t.color };
//       return acc;
//     }, {}),
//   };

//   const activeGoals = goals.filter(g => !g.achieved);
//   const achievedGoals = goals.filter(g => g.achieved);

//   // type ke basis par default unit
//   const getDefaultUnitForType = (type) => {
//     if (type === 'weight' || type === 'strength') return 'kg';
//     if (type === 'endurance') return 'min';
//     return '';
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newGoal = addGoal({
//       ...formData,
//       metrics: formData.metrics.map(m => ({
//         ...m,
//         current: parseFloat(m.current) || 0,
//         target: parseFloat(m.target) || 0,
//       })),
//       achieved: formData.metrics.every(m => parseFloat(m.current) >= parseFloat(m.target)),
//     });
//     setGoals([...goals, newGoal]);
//     saveGoals([...goals, newGoal]);
//     setIsModalOpen(false);
//     setFormData({
//       title: '',
//       description: '',
//       type: 'weight',
//       metrics: [{ name: 'Weight', current: 0, target: 0, unit: 'kg' }],
//       deadline: '',
//     });
//   };

//   const updateMetricProgress = (goalId, metricIndex, newValue) => {
//     const updated = goals.map(g => {
//       if (g.id === goalId) {
//         const newMetrics = [...g.metrics];
//         newMetrics[metricIndex].current = parseFloat(newValue);
//         const achieved = newMetrics.every(m => m.current >= m.target);
//         return { ...g, metrics: newMetrics, achieved };
//       }
//       return g;
//     });
//     setGoals(updated);
//     saveGoals(updated);
//   };

//   const getMetricProgress = (metric) => {
//     if (metric.target === 0) return 0;
//     return Math.min((metric.current / metric.target) * 100, 100);
//   };

//   const confirmDeleteGoal = () => {
//     const updated = goals.filter(g => g.id !== deleteGoalId);
//     setGoals(updated);
//     saveGoals(updated);
//     setDeleteGoalId(null);
//   };

//   return (
//     <div className="min-h-screen pb-24 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
//       <div className="relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-red-950/10 to-dark-950"></div>
//         <div className="relative px-4 sm:px-6 pt-6 sm:pt-8 pb-6 max-w-md mx-auto">

//           {/* Header */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-white mb-6"
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center gap-3">
//                 <Target size={32} className="text-red-500" />
//                 <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
//                   Goals
//                 </h1>
//               </div>
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => setIsModalOpen(true)}
//                 className="bg-gradient-to-r from-red-600 to-red-700 text-white p-3 rounded-full shadow-lg hover:shadow-red-500/50 transition-all"
//               >
//                 <Plus size={24} strokeWidth={3} />
//               </motion.button>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-3 gap-3">
//               <div className="bg-gradient-to-br from-dark-800 to-dark-900 border border-red-500/20 rounded-xl p-3 text-center">
//                 <div className="text-xs text-red-300/80 font-semibold mb-1">Active</div>
//                 <div className="text-2xl font-black text-red-500">{activeGoals.length}</div>
//               </div>
//               <div className="bg-gradient-to-br from-dark-800 to-dark-900 border border-red-500/20 rounded-xl p-3 text-center">
//                 <div className="text-xs text-red-300/80 font-semibold mb-1">Achieved</div>
//                 <div className="text-2xl font-black text-green-500">{achievedGoals.length}</div>
//               </div>
//               <div className="bg-gradient-to-br from-dark-800 to-dark-900 border border-red-500/20 rounded-xl p-3 text-center">
//                 <div className="text-xs text-red-300/80 font-semibold mb-1">Total</div>
//                 <div className="text-2xl font-black text-white">{goals.length}</div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Active Goals */}
//           {activeGoals.length > 0 && (
//             <div className="mb-6">
//               <h2 className="text-xl font-black text-white mb-4">Active Goals</h2>
//               <div className="space-y-4">
//                 {activeGoals.map(goal => {
//                   const typeInfo = allGoalTypes[goal.type] || allGoalTypes.custom;
//                   return (
//                     <motion.div
//                       key={goal.id}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="bg-gradient-to-br from-dark-800 to-dark-900 border border-red-500/20 rounded-xl p-5 shadow-lg"
//                     >
//                       <div className="flex items-start gap-3 mb-4">
//                         <div className={`p-3 rounded-xl bg-gradient-to-br ${typeInfo.color} text-2xl`}>
//                           {typeInfo.icon}
//                         </div>
//                         <div className="flex-1">
//                           <h3 className="font-black text-white text-lg mb-1">{goal.title}</h3>
//                           <p className="text-sm text-gray-400">{goal.description}</p>
//                         </div>
//                         <button
//                           onClick={() => setDeleteGoalId(goal.id)}
//                           className="p-2 rounded-lg hover:bg-red-500/20 transition"
//                         >
//                           <Trash2 size={18} className="text-red-400" />
//                         </button>
//                       </div>

//                       {/* Metrics */}
//                       {goal.metrics.map((m, idx) => {
//                         const progress = getMetricProgress(m);
//                         return (
//                           <div key={idx} className="mb-4">
//                             <div className="flex justify-between text-sm font-semibold mb-2">
//                               <span className="text-red-300">
//                                 {m.name}: {m.current} / {m.target} {m.unit}
//                               </span>
//                               <span className="text-white">{Math.round(progress)}%</span>
//                             </div>
//                             <div className="w-full bg-dark-700 rounded-full h-3 overflow-hidden mb-2">
//                               <motion.div
//                                 initial={{ width: 0 }}
//                                 animate={{ width: `${progress}%` }}
//                                 className={`h-full bg-gradient-to-r ${typeInfo.color} rounded-full`}
//                               />
//                             </div>
//                             <input
//                               type="number"
//                               placeholder={`Update ${m.name}`}
//                               value={m.current}
//                               onChange={e => updateMetricProgress(goal.id, idx, e.target.value)}
//                               className="w-full px-3 py-2 bg-dark-700 border border-red-500/30 text-white rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none"
//                             />
//                           </div>
//                         );
//                       })}

//                       {goal.deadline && (
//                         <div className="px-3 py-2 bg-dark-700 rounded-lg text-xs text-gray-400 text-right">
//                           Deadline: {new Date(goal.deadline).toLocaleDateString()}
//                         </div>
//                       )}
//                     </motion.div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {/* Achieved Goals */}
//           {achievedGoals.length > 0 && (
//             <div>
//               <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
//                 <Trophy className="text-yellow-400" size={24} />
//                 Achieved
//               </h2>
//               <div className="space-y-3">
//                 {achievedGoals
//                   .slice() // to avoid mutating original
//                   .reverse()
//                   .slice(0, 5)
//                   .map(goal => {
//                     const typeInfo = allGoalTypes[goal.type] || allGoalTypes.custom;
//                     return (
//                       <motion.div
//                         key={goal.id}
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 border border-green-500/30 rounded-xl p-4 opacity-75"
//                       >
//                         <div className="flex items-center gap-3">
//                           <div className="text-2xl">{typeInfo.icon}</div>
//                           <div className="flex-1">
//                             <div className="font-bold text-white">{goal.title}</div>
//                             <div className="text-xs text-gray-400">{goal.description}</div>
//                           </div>
//                           <Trophy className="text-yellow-400" size={20} />
//                         </div>
//                       </motion.div>
//                     );
//                   })}
//               </div>
//             </div>
//           )}

//           {goals.length === 0 && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="text-center py-12"
//             >
//               <Target size={64} className="text-gray-600 mx-auto mb-4" />
//               <p className="text-red-300 font-bold text-lg mb-2">No goals yet</p>
//               <p className="text-gray-400 text-sm">Set your first goal to get started!</p>
//             </motion.div>
//           )}

//         </div>
//       </div>

//       {/* Goal Modal */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsModalOpen(false)}
//               className="fixed inset-0 bg-black/80 z-40"
//             />
//             <motion.div
//               initial={{ y: '100%' }}
//               animate={{ y: 0 }}
//               exit={{ y: '100%' }}
//               className="fixed bottom-0 left-0 top-4 right-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 border-t border-red-500/30 rounded-t-3xl p-6 z-50 shadow-2xl max-w-md mx-auto max-h-[78vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-black text-white">New Goal</h2>
//                 <button
//                   onClick={() => setIsModalOpen(false)}
//                   className="p-2 hover:bg-red-500/20 rounded-full"
//                 >
//                   <X size={24} className="text-red-400" />
//                 </button>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-4">

//                 <div>
//                   <label className="block text-sm font-bold text-red-300 mb-2">Goal Type</label>
//                   <select
//                     value={formData.type}
//                     onChange={(e) => {
//                       const type = e.target.value;
//                       const defaultUnit = getDefaultUnitForType(type);
//                       setFormData({
//                         ...formData,
//                         type,
//                         metrics: [{
//                           name: type.charAt(0).toUpperCase() + type.slice(1),
//                           current: 0,
//                           target: 0,
//                           unit: defaultUnit,
//                         }],
//                       });
//                     }}
//                     className="w-full px-4 py-3 bg-dark-700 border border-red-500/30 text-white rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
//                   >
//                     {Object.keys(allGoalTypes).map(t => (
//                       <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-bold text-red-300 mb-2">Title</label>
//                   <input
//                     type="text"
//                     value={formData.title}
//                     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                     placeholder="Lose 10kg"
//                     required
//                     className="w-full px-4 py-3 bg-dark-700 border border-red-500/30 text-white rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-bold text-red-300 mb-2">Description</label>
//                   <textarea
//                     value={formData.description}
//                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                     placeholder="Goal description..."
//                     rows={2}
//                     className="w-full px-4 py-3 bg-dark-700 border border-red-500/30 text-white rounded-xl focus:ring-2 focus:ring-red-500 outline-none resize-none"
//                   />
//                 </div>

//                 {/* Metrics */}
//                 {formData.metrics.map((m, idx) => (
//                   <div key={idx} className="grid grid-cols-4 gap-2 items-center">
//                     <input
//                       type="text"
//                       placeholder="Metric"
//                       value={m.name}
//                       onChange={(e) => {
//                         const newMetrics = [...formData.metrics];
//                         newMetrics[idx].name = e.target.value;
//                         setFormData({ ...formData, metrics: newMetrics });
//                       }}
//                       className="col-span-1 px-3 py-2 bg-dark-700 border border-red-500/30 text-white rounded-xl outline-none text-xs"
//                     />
//                     <input
//                       type="number"
//                       placeholder="Current"
//                       value={m.current}
//                       onChange={(e) => {
//                         const newMetrics = [...formData.metrics];
//                         newMetrics[idx].current = e.target.value;
//                         setFormData({ ...formData, metrics: newMetrics });
//                       }}
//                       className="px-3 py-2 bg-dark-700 border border-red-500/30 text-white rounded-xl outline-none text-xs"
//                     />
//                     <input
//                       type="number"
//                       placeholder="Target"
//                       value={m.target}
//                       onChange={(e) => {
//                         const newMetrics = [...formData.metrics];
//                         newMetrics[idx].target = e.target.value;
//                         setFormData({ ...formData, metrics: newMetrics });
//                       }}
//                       className="px-3 py-2 bg-dark-700 border border-red-500/30 text-white rounded-xl outline-none text-xs"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Unit"
//                       value={m.unit}
//                       onChange={(e) => {
//                         const newMetrics = [...formData.metrics];
//                         newMetrics[idx].unit = e.target.value;
//                         setFormData({ ...formData, metrics: newMetrics });
//                       }}
//                       className="px-3 py-2 bg-dark-700 border border-red-500/30 text-white rounded-xl outline-none text-xs"
//                     />
//                   </div>
//                 ))}

//                 <button
//                   type="button"
//                   onClick={() => {
//                     const lastMetric = formData.metrics[formData.metrics.length - 1];
//                     const defaultUnit = lastMetric?.unit || getDefaultUnitForType(formData.type);
//                     setFormData({
//                       ...formData,
//                       metrics: [
//                         ...formData.metrics,
//                         { name: '', current: 0, target: 0, unit: defaultUnit },
//                       ],
//                     });
//                   }}
//                   className="w-full bg-dark-700 text-white py-2 rounded-xl font-bold"
//                 >
//                   + Add Metric
//                 </button>

//                 <div>
//                   <label className="block text-sm font-bold text-red-300 mb-2">Deadline</label>
//                   <input
//                     type="date"
//                     value={formData.deadline}
//                     onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
//                     className="w-full px-4 py-3 bg-dark-700 border border-red-500/30 text-white rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white py-4 rounded-xl font-black text-lg shadow-lg shadow-red-500/50"
//                 >
//                   Create Goal
//                 </button>
//               </form>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Delete Confirmation Modal */}
//       <AnimatePresence>
//         {deleteGoalId && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setDeleteGoalId(null)}
//               className="fixed inset-0 bg-black/80 z-40"
//             />
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="fixed inset-0 z-50 flex items-center justify-center px-4"
//             >
//               <div className="bg-gradient-to-br from-dark-800 to-dark-900 border border-red-500/30 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
//                 <h3 className="text-xl font-black text-white mb-2">
//                   Delete Goal?
//                 </h3>
//                 <p className="text-sm text-gray-400 mb-6">
//                   This goal will be permanently removed.
//                 </p>
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => setDeleteGoalId(null)}
//                     className="flex-1 py-3 rounded-xl bg-dark-700 text-white font-bold hover:bg-dark-600"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={confirmDeleteGoal}
//                     className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Goals;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Plus, Trophy, X, Trash2 } from 'lucide-react';
import { getGoals, addGoal, saveGoals } from '../utils/workoutStorage';

const Goals = () => {
  const [goals, setGoals] = useState(getGoals());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteGoalId, setDeleteGoalId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'weight',
    metrics: [{ name: 'Weight', current: 0, target: 0, unit: 'kg' }],
    deadline: '',
  });

  // Dynamic goal types
  const [customGoalTypes, setCustomGoalTypes] = useState([]);
  const defaultGoalTypes = {
    weight: { icon: '⚖️', color: 'from-red-600 to-red-700' },
    strength: { icon: '💪', color: 'from-orange-600 to-orange-700' },
    endurance: { icon: '🏃', color: 'from-blue-600 to-blue-700' },
    flexibility: { icon: '🧘', color: 'from-purple-600 to-purple-700' },
    custom: { icon: '🎯', color: 'from-green-600 to-green-700' },
  };
  const allGoalTypes = {
    ...defaultGoalTypes,
    ...customGoalTypes.reduce((acc, t) => {
      acc[t.value] = { icon: t.icon, color: t.color };
      return acc;
    }, {}),
  };

  const activeGoals = goals.filter(g => !g.achieved);
  const achievedGoals = goals.filter(g => g.achieved);

  // Goal type ke hisaab se default unit
  const getDefaultUnitForType = (type) => {
    if (type === 'weight' || type === 'strength') return 'kg';
    if (type === 'endurance') return 'min';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const preparedMetrics = formData.metrics.map(m => ({
      ...m,
      current: parseFloat(m.current) || 0,
      target: parseFloat(m.target) || 0,
    }));

    const newGoal = addGoal({
      ...formData,
      metrics: preparedMetrics,
      achieved: preparedMetrics.every(m => m.current >= m.target),
    });

    const updated = [...goals, newGoal];
    setGoals(updated);
    saveGoals(updated);

    setIsModalOpen(false);
    setFormData({
      title: '',
      description: '',
      type: 'weight',
      metrics: [{ name: 'Weight', current: 0, target: 0, unit: 'kg' }],
      deadline: '',
    });
  };

  const updateMetricProgress = (goalId, metricIndex, newValue) => {
    const updated = goals.map(g => {
      if (g.id === goalId) {
        const newMetrics = [...g.metrics];
        newMetrics[metricIndex].current = parseFloat(newValue) || 0;
        const achieved = newMetrics.every(m => m.current >= m.target);
        return { ...g, metrics: newMetrics, achieved };
      }
      return g;
    });
    setGoals(updated);
    saveGoals(updated);
  };

  const getMetricProgress = (metric) => {
    if (!metric.target || metric.target === 0) return 0;
    return Math.min((metric.current / metric.target) * 100, 100);
  };

  const confirmDeleteGoal = () => {
    const updated = goals.filter(g => g.id !== deleteGoalId);
    setGoals(updated);
    saveGoals(updated);
    setDeleteGoalId(null);
  };

  // Sirf completed goals ka history clear karne ke liye
  const clearCompletedGoals = () => {
    if (!window.confirm('Saare completed goals history se delete ho jayenge. Continue?')) return;
    const remaining = goals.filter(g => !g.achieved);
    setGoals(remaining);
    saveGoals(remaining);
  };

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
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Target size={32} className="text-red-500" />
                <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
                  Goals
                </h1>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white p-3 rounded-full shadow-lg hover:shadow-red-500/50 transition-all"
              >
                <Plus size={24} strokeWidth={3} />
              </motion.button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-dark-800 to-dark-900 border border-red-500/20 rounded-xl p-3 text-center">
                <div className="text-xs text-red-300/80 font-semibold mb-1">Active</div>
                <div className="text-2xl font-black text-red-500">{activeGoals.length}</div>
              </div>
              <div className="bg-gradient-to-br from-dark-800 to-dark-900 border border-red-500/20 rounded-xl p-3 text-center">
                <div className="text-xs text-red-300/80 font-semibold mb-1">Achieved</div>
                <div className="text-2xl font-black text-green-500">{achievedGoals.length}</div>
              </div>
              <div className="bg-gradient-to-br from-dark-800 to-dark-900 border border-red-500/20 rounded-xl p-3 text-center">
                <div className="text-xs text-red-300/80 font-semibold mb-1">Total</div>
                <div className="text-2xl font-black text-white">{goals.length}</div>
              </div>
            </div>
          </motion.div>

          {/* Active Goals */}
          {activeGoals.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-black text-white mb-4">Active Goals</h2>
              <div className="space-y-4">
                {activeGoals.map(goal => {
                  const typeInfo = allGoalTypes[goal.type] || allGoalTypes.custom;
                  return (
                    <motion.div
                      key={goal.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-br from-dark-800 to-dark-900 border border-red-500/20 rounded-xl p-5 shadow-lg"
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${typeInfo.color} text-2xl`}>
                          {typeInfo.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-black text-white text-lg mb-1">{goal.title}</h3>
                          <p className="text-sm text-gray-400">{goal.description}</p>
                        </div>
                        <button
                          onClick={() => setDeleteGoalId(goal.id)}
                          className="p-2 rounded-lg hover:bg-red-500/20 transition"
                        >
                          <Trash2 size={18} className="text-red-400" />
                        </button>
                      </div>

                      {goal.metrics.map((m, idx) => {
                        const progress = getMetricProgress(m);
                        return (
                          <div key={idx} className="mb-4">
                            <div className="flex justify-between text-sm font-semibold mb-2">
                              <span className="text-red-300">
                                {m.name}: {m.current} / {m.target} {m.unit}
                              </span>
                              <span className="text-white">{Math.round(progress)}%</span>
                            </div>
                            <div className="w-full bg-dark-700 rounded-full h-3 overflow-hidden mb-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className={`h-full bg-gradient-to-r ${typeInfo.color} rounded-full`}
                              />
                            </div>
                            <input
                              type="number"
                              placeholder={`Update ${m.name}`}
                              value={m.current}
                              onChange={e => updateMetricProgress(goal.id, idx, e.target.value)}
                              className="w-full px-3 py-2 bg-dark-700 border border-red-500/30 text-white rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none"
                            />
                          </div>
                        );
                      })}

                      {goal.deadline && (
                        <div className="px-3 py-2 bg-dark-700 rounded-lg text-xs text-gray-400 text-right">
                          Deadline: {new Date(goal.deadline).toLocaleDateString()}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Achieved Goals + Clear history */}
          {achievedGoals.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Trophy className="text-yellow-400" size={24} />
                  Achieved
                </h2>
                <button
                  onClick={clearCompletedGoals}
                  className="text-xs px-3 py-1 rounded-full bg-red-700/70 text-white font-semibold hover:bg-red-600"
                >
                  Clear history
                </button>
              </div>

              <div className="space-y-3">
                {achievedGoals
                  .slice()
                  .reverse()
                  .slice(0, 5)
                  .map(goal => {
                    const typeInfo = allGoalTypes[goal.type] || allGoalTypes.custom;
                    return (
                      <motion.div
                        key={goal.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 border border-green-500/30 rounded-xl p-4 opacity-75"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{typeInfo.icon}</div>
                          <div className="flex-1">
                            <div className="font-bold text-white">{goal.title}</div>
                            <div className="text-xs text-gray-400">{goal.description}</div>
                          </div>
                          <Trophy className="text-yellow-400" size={20} />
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </div>
          )}

          {goals.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <Target size={64} className="text-gray-600 mx-auto mb-4" />
              <p className="text-red-300 font-bold text-lg mb-2">No goals yet</p>
              <p className="text-gray-400 text-sm">Set your first goal to get started!</p>
            </motion.div>
          )}

        </div>
      </div>

      {/* Goal Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/80 z-40"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 top-4 right-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 border-t border-red-500/30 rounded-t-3xl p-6 z-50 shadow-2xl max-w-md mx-auto max-h-[78vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-white">New Goal</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-red-500/20 rounded-full"
                >
                  <X size={24} className="text-red-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-red-300 mb-2">Goal Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => {
                      const type = e.target.value;
                      const defaultUnit = getDefaultUnitForType(type);
                      setFormData({
                        ...formData,
                        type,
                        metrics: [{
                          name: type.charAt(0).toUpperCase() + type.slice(1),
                          current: 0,
                          target: 0,
                          unit: defaultUnit,
                        }],
                      });
                    }}
                    className="w-full px-4 py-3 bg-dark-700 border border-red-500/30 text-white rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                  >
                    {Object.keys(allGoalTypes).map(t => (
                      <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-red-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Lose 10kg"
                    required
                    className="w-full px-4 py-3 bg-dark-700 border border-red-500/30 text-white rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-red-300 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Goal description..."
                    rows={2}
                    className="w-full px-4 py-3 bg-dark-700 border border-red-500/30 text-white rounded-xl focus:ring-2 focus:ring-red-500 outline-none resize-none"
                  />
                </div>

                {/* Metrics */}
                {formData.metrics.map((m, idx) => (
                  <div key={idx} className="grid grid-cols-4 gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Metric"
                      value={m.name}
                      onChange={(e) => {
                        const newMetrics = [...formData.metrics];
                        newMetrics[idx].name = e.target.value;
                        setFormData({ ...formData, metrics: newMetrics });
                      }}
                      className="col-span-1 px-3 py-2 bg-dark-700 border border-red-500/30 text-white rounded-xl outline-none text-xs"
                    />
                    <input
                      type="number"
                      placeholder="Current"
                      value={m.current}
                      onChange={(e) => {
                        const newMetrics = [...formData.metrics];
                        newMetrics[idx].current = e.target.value;
                        setFormData({ ...formData, metrics: newMetrics });
                      }}
                      className="px-3 py-2 bg-dark-700 border border-red-500/30 text-white rounded-xl outline-none text-xs"
                    />
                    <input
                      type="number"
                      placeholder="Target"
                      value={m.target}
                      onChange={(e) => {
                        const newMetrics = [...formData.metrics];
                        newMetrics[idx].target = e.target.value;
                        setFormData({ ...formData, metrics: newMetrics });
                      }}
                      className="px-3 py-2 bg-dark-700 border border-red-500/30 text-white rounded-xl outline-none text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Unit"
                      value={m.unit}
                      onChange={(e) => {
                        const newMetrics = [...formData.metrics];
                        newMetrics[idx].unit = e.target.value;
                        setFormData({ ...formData, metrics: newMetrics });
                      }}
                      className="px-3 py-2 bg-dark-700 border border-red-500/30 text-white rounded-xl outline-none text-xs"
                    />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    const lastMetric = formData.metrics[formData.metrics.length - 1];
                    const defaultUnit = lastMetric?.unit || getDefaultUnitForType(formData.type);
                    setFormData({
                      ...formData,
                      metrics: [
                        ...formData.metrics,
                        { name: '', current: 0, target: 0, unit: defaultUnit },
                      ],
                    });
                  }}
                  className="w-full bg-dark-700 text-white py-2 rounded-xl font-bold"
                >
                  + Add Metric
                </button>

                <div>
                  <label className="block text-sm font-bold text-red-300 mb-2">Deadline</label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-700 border border-red-500/30 text-white rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white py-4 rounded-xl font-black text-lg shadow-lg shadow-red-500/50"
                >
                  Create Goal
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal (single goal) */}
      <AnimatePresence>
        {deleteGoalId && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteGoalId(null)}
              className="fixed inset-0 bg-black/80 z-40"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
            >
              <div className="bg-gradient-to-br from-dark-800 to-dark-900 border border-red-500/30 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
                <h3 className="text-xl font-black text-white mb-2">
                  Delete Goal?
                </h3>
                <p className="text-sm text-gray-400 mb-6">
                  This goal will be permanently removed.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteGoalId(null)}
                    className="flex-1 py-3 rounded-xl bg-dark-700 text-white font-bold hover:bg-dark-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDeleteGoal}
                    className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Goals;
