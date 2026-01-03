import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Trophy, BarChart3, Target, Calendar, Ruler } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const [showMore, setShowMore] = useState(false);

  const mainNavItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/goals', icon: Target, label: 'Goals' },
  ];

  const moreNavItems = [
    { path: '/calendar', icon: Calendar, label: 'Calendar' },
    { path: '/measurements', icon: Ruler, label: 'Measure' },
    { path: '/stats', icon: BarChart3, label: 'Stats' },
    { path: '/rewards', icon: Trophy, label: 'Rewards' },
  ];

  return (
    <>
      {/* More Menu Overlay */}
      <AnimatePresence>
        {showMore && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMore(false)}
              className="fixed inset-0 bg-black/60 z-40"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed bottom-16 left-0 right-0 bg-dark-900 border-t border-red-500/30 rounded-t-3xl p-4 z-50 max-w-md mx-auto shadow-2xl"
            >
              <div className="grid grid-cols-2 gap-3">
                {moreNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setShowMore(false)}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all touch-manipulation ${
                        isActive
                          ? 'bg-red-500/20 text-red-500 border-2 border-red-500/50'
                          : 'bg-dark-800 text-gray-400 hover:bg-dark-700 hover:text-red-400 border-2 border-dark-700'
                      }`}
                    >
                      <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                      <span className={`text-xs mt-2 font-semibold ${isActive ? 'text-red-500' : 'text-gray-400'}`}>
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-dark-900/95 backdrop-blur-xl border-t border-red-500/30 shadow-2xl z-50 safe-area-inset-bottom">
        <div className="flex justify-around items-center h-16 sm:h-20 max-w-md mx-auto px-2">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center px-3 sm:px-4 py-2 rounded-xl transition-all duration-200 touch-manipulation min-h-[56px] ${
                  isActive
                    ? 'text-red-500 scale-110 bg-red-500/10'
                    : 'text-gray-400 hover:text-red-400 active:scale-95'
                }`}
              >
                <Icon 
                  size={22} 
                  className={isActive ? 'fill-red-500' : ''} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className={`text-[10px] sm:text-xs mt-0.5 font-semibold ${isActive ? 'text-red-500' : 'text-gray-400'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
          <button
            onClick={() => setShowMore(!showMore)}
            className={`flex flex-col items-center justify-center px-3 sm:px-4 py-2 rounded-xl transition-all duration-200 touch-manipulation min-h-[56px] ${
              showMore
                ? 'text-red-500 scale-110 bg-red-500/10'
                : 'text-gray-400 hover:text-red-400 active:scale-95'
            }`}
          >
            <div className={`w-6 h-6 flex items-center justify-center ${showMore ? 'rotate-45' : ''} transition-transform`}>
              <span className="text-2xl font-bold">+</span>
            </div>
            <span className={`text-[10px] sm:text-xs mt-0.5 font-semibold ${showMore ? 'text-red-500' : 'text-gray-400'}`}>
              More
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

