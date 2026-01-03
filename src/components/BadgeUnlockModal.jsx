import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const BadgeUnlockModal = ({ badges, onClose }) => {
  return (
    <AnimatePresence>
      {badges && badges.length > 0 && (
        <>
          {/* Background Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
             onClick={onClose}
             className="fixed inset-0 bg-black/80 z-40"
           />
 
           {/* Modal */}
           <motion.div
             initial={{ scale: 0, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             exit={{ scale: 0, opacity: 0 }}
             transition={{ type: "spring", damping: 15, stiffness: 200 }}
             className="fixed inset-0 z-50 flex items-center justify-center p-4"
             onClick={onClose}
           >
             <div
               className="bg-gradient-to-br from-red-600 via-red-700 to-red-900
               rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm w-full text-center relative overflow-hidden border-2 border-red-500"
               onClick={(e) => e.stopPropagation()}
             >
               <motion.div
                 animate={{ scale: [1, 1.1, 1] }}
                 transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                 className="absolute inset-0 bg-gradient-to-r
                 from-red-400/30 via-red-500/30 to-red-600/30"
               />
 
               <div className="relative z-10">
                 <motion.div
                   animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                   transition={{ repeat: Infinity, duration: 2 }}
                   className="text-6xl sm:text-7xl mb-4 drop-shadow-lg"
                 >
                   {badges[0].icon}
                 </motion.div>
 
                 <motion.h2
                   initial={{ y: -20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   className="text-2xl sm:text-3xl font-black text-white mb-2 drop-shadow-lg"
                 >
                   BADGE UNLOCKED!
                 </motion.h2>
 
                 <motion.h3
                   initial={{ y: 20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.1 }}
                   className="text-xl sm:text-2xl font-bold text-white mb-3"
                 >
                   {badges[0].name}
                 </motion.h3>
 
                 <motion.p
                   initial={{ y: 20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.2 }}
                   className="text-white/90 text-sm sm:text-base font-semibold"
                 >
                   {badges[0].description}
                 </motion.p>
               </div>
             </div>
           </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BadgeUnlockModal;
