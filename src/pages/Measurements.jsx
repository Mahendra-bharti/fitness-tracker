import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, Plus, TrendingUp, TrendingDown, X, Eye, Trash2 } from 'lucide-react';
import { getMeasurements, addMeasurement, saveMeasurements } from '../utils/workoutStorage';
import { getTodayDate } from '../utils/storage';

const Measurements = () => {
  const [measurements, setMeasurements] = useState(getMeasurements());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: getTodayDate(),
    weight: '',
    bodyFat: '',
    measurements: { chest: '', waist: '', hips: '', arms: '', thighs: '' },
  });

  const [detailsModal, setDetailsModal] = useState({ open: false, measurement: null });

  useEffect(() => {
    saveMeasurements(measurements);
  }, [measurements]);

  const sortedMeasurements = [...measurements].sort((a, b) => new Date(b.date) - new Date(a.date));
  const latest = sortedMeasurements[0];
  const previous = sortedMeasurements[1];

  const getChange = (current, prev) => {
    if (current === null || prev === null || current === undefined || prev === undefined) return null;
    const change = current - prev;
    if (change === 0) return null;
    return { value: Math.abs(change).toFixed(1), positive: change > 0 };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmpty =
      !formData.weight &&
      !formData.bodyFat &&
      Object.values(formData.measurements).every((v) => !v);
    if (isEmpty) return;

    const newMeasurement = addMeasurement({
      ...formData,
      weight: formData.weight ? parseFloat(formData.weight) : null,
      bodyFat: formData.bodyFat ? parseFloat(formData.bodyFat) : null,
      measurements: Object.fromEntries(
        Object.entries(formData.measurements).map(([k, v]) => [k, v ? parseFloat(v) : null])
      ),
    });

    setMeasurements([...measurements, newMeasurement]);
    setIsModalOpen(false);
    setFormData({
      date: getTodayDate(),
      weight: '',
      bodyFat: '',
      measurements: { chest: '', waist: '', hips: '', arms: '', thighs: '' },
    });
  };

  const handleDelete = (id) => {
    const filtered = measurements.filter((m) => m.id !== id);
    setMeasurements(filtered);
  };

  const MeasurementCard = ({ label, value, unit = 'cm', change = null }) => {
    if (value === null || value === undefined || value === '') return null;
    return (
      <div className="bg-gradient-to-br from-dark-800 to-dark-900 border border-red-500/20 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-red-300/80 font-semibold uppercase">{label}</span>
          {change && (
            <div className={`flex items-center gap-1 text-xs font-bold ${change.positive ? 'text-green-400' : 'text-red-400'}`}>
              {change.positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {change.value} {unit}
            </div>
          )}
        </div>
        <div className="text-2xl font-black text-white">
          {value} <span className="text-sm text-gray-400">{unit}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-red-950/10 to-dark-950"></div>
        <div className="relative px-4 sm:px-6 pt-6 sm:pt-8 pb-6 max-w-md mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-white mb-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Ruler size={32} className="text-red-500" />
                <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
                  Measurements
                </h1>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white p-3 rounded-full shadow-lg hover:shadow-red-500/50 transition-all touch-manipulation"
              >
                <Plus size={24} strokeWidth={3} />
              </motion.button>
            </div>

            {/* Latest Measurement */}
            {latest && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-dark-800 to-dark-900 border border-red-500/20 rounded-xl p-5 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-black text-white">Latest Measurement</h2>
                    <p className="text-sm text-gray-400">{new Date(latest.date).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <MeasurementCard label="Weight" value={latest.weight} unit="kg" change={getChange(latest.weight, previous?.weight)} />
                  <MeasurementCard label="Body Fat" value={latest.bodyFat} unit="%" change={getChange(latest.bodyFat, previous?.bodyFat)} />
                </div>

                {latest.measurements && Object.values(latest.measurements).some((v) => v !== null) && (
                  <div className="mt-4 pt-4 border-t border-red-500/20">
                    <h3 className="text-sm font-bold text-red-300 mb-3 uppercase">Body Measurements</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(latest.measurements).map(([key, value]) => {
                        const prevVal = previous && previous.measurements ? previous.measurements[key] : null;
                        return (
                          <MeasurementCard
                            key={key}
                            label={key.charAt(0).toUpperCase() + key.slice(1)}
                            value={value}
                            change={prevVal !== null ? getChange(value, prevVal) : null}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* History */}
            <div>
              <h2 className="text-xl font-black text-white mb-4">History</h2>
              {sortedMeasurements.length > 0 ? (
                <div className="space-y-3">
                  {sortedMeasurements.map((measurement) => (
                    <motion.div key={measurement.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-dark-800 to-dark-900 border border-red-500/20 rounded-xl p-4 flex justify-between items-center">
                      <div>
                        <span className="font-bold text-white">{new Date(measurement.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setDetailsModal({ open: true, measurement })}
                          className="flex items-center gap-1 px-3 py-1 bg-red-600/70 hover:bg-red-700 rounded-lg text-white text-sm font-semibold"
                        >
                          <Eye size={16} /> Details
                        </button>
                        <button
                          onClick={() => handleDelete(measurement.id)}
                          className="flex items-center gap-1 px-3 py-1 bg-red-700/70 hover:bg-red-800 rounded-lg text-white text-sm font-semibold"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
                  <Ruler size={64} className="text-gray-600 mx-auto mb-4" />
                  <p className="text-red-300 font-bold text-lg mb-2">No measurements yet</p>
                  <p className="text-gray-400 text-sm">Track your body measurements!</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* === New Measurement Modal === */}
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
              className="fixed bottom-0 top-5 left-0 right-0 bg-gradient-to-br from-transparent via-dark-800 to-dark-900 border-t border-red-500/30 rounded-t-3xl p-6 z-50 shadow-2xl max-w-md mx-auto max-h-[78vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-white">New Measurement</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-red-500/20 rounded-full">
                  <X size={24} className="text-red-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-red-300 mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-700 border border-red-500/30 text-white rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-bold text-red-300 mb-2">Weight (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      placeholder="70.5"
                      className="w-full px-4 py-3 bg-dark-700 border border-red-500/30 text-white rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-red-300 mb-2">Body Fat (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.bodyFat}
                      onChange={(e) => setFormData({ ...formData, bodyFat: e.target.value })}
                      placeholder="15.0"
                      className="w-full px-4 py-3 bg-dark-700 border border-red-500/30 text-white rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-red-300 mb-3 uppercase">Body Measurements (cm)</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(formData.measurements).map(([key, value]) => (
                      <div key={key}>
                        <label className="block text-xs text-gray-400 mb-1">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                        <input
                          type="number"
                          step="0.1"
                          value={value}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              measurements: { ...formData.measurements, [key]: e.target.value },
                            })
                          }
                          placeholder="0"
                          className="w-full px-3 py-2 bg-dark-700 border border-red-500/30 text-white rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white py-4 rounded-xl font-black text-lg shadow-lg shadow-red-500/50"
                >
                  Save Measurement
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* === Details Modal === */}
      <AnimatePresence>
        {detailsModal.open && detailsModal.measurement && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDetailsModal({ open: false, measurement: null })} className="fixed inset-0 bg-black/80 z-40" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
            >
              <div className="bg-gradient-to-br from-dark-800 to-dark-900 border border-red-500/30 rounded-2xl p-6 w-full max-w-sm shadow-2xl overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-black text-white">Measurement Details</h3>
                  <button onClick={() => setDetailsModal({ open: false, measurement: null })} className="p-2 hover:bg-red-500/20 rounded-full">
                    <X size={20} className="text-red-400" />
                  </button>
                </div>

                <div className="mb-3 text-white font-semibold">{new Date(detailsModal.measurement.date).toLocaleDateString()}</div>
                <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                  {detailsModal.measurement.weight !== null && <div>Weight: <span className="font-bold">{detailsModal.measurement.weight} kg</span></div>}
                  {detailsModal.measurement.bodyFat !== null && <div>Body Fat: <span className="font-bold">{detailsModal.measurement.bodyFat}%</span></div>}
                </div>
                {detailsModal.measurement.measurements && (
                  <>
                    <h4 className="text-sm font-bold text-red-300 mb-2 uppercase">Body Measurements</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(detailsModal.measurement.measurements).map(([key, value]) => value !== null && (
                        <div key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}: <span className="font-bold">{value} cm</span></div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Measurements;
