import { motion } from "framer-motion";

const getDisciplineTitle = (streak) => {
  if (streak >= 90) return { text: "🧘 Ascended", color: "text-purple-400" };
  if (streak >= 30) return { text: "👑 Monk Mode", color: "text-yellow-300" };
  if (streak >= 21) return { text: "⚡ Beast Mode", color: "text-blue-400" };
  if (streak >= 7) return { text: "🔥 Iron Will", color: "text-red-400" };
  return null;
};
export default function DisciplineCard({ progress }) {


  return (
    <motion.div
      className="bg-gradient-to-br from-dark-800/90 to-dark-900/90 
      backdrop-blur-lg border border-red-500/20 
      rounded-xl sm:rounded-2xl p-5 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm uppercase tracking-wider text-red-300/80 font-semibold">
            Discipline Aura
          </h3>

          <p className="text-2xl font-black text-red-500 mt-1">
            Level {progress.auraLevel}
          </p>

          <p className="text-sm text-zinc-400 mt-1">
            Streak: <span className="text-red-400 font-semibold">
              {progress.disciplineStreak} days
            </span>
          </p>

          <p className="text-xs text-zinc-500 mt-1">
            Aura XP: {progress.auraXP}
          </p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <p className="text-sm text-red-300">
              Aura Power:
              <span className="ml-1 font-bold text-red-500">
                {progress.disciplineStreak * 10}
              </span>
            </p>

            {getDisciplineTitle(progress.disciplineStreak) && (
              <span
                className={`text-[10px] sm:text-xs font-semibold px-2 py-0.5 
      rounded-full border backdrop-blur 
      ${getDisciplineTitle(progress.disciplineStreak).color}
      border-current/30 bg-current/10
      animate-pulse`}
              >
                {getDisciplineTitle(progress.disciplineStreak).text}
              </span>
            )}
          </div>



        </div>

        {/* 🔥 RED AURA GLOW WITH YOUR 5 LEVEL IMAGES */}
        <motion.div
          animate={{
            boxShadow: `0 0 ${progress.auraLevel * 18}px rgba(220,38,38,${0.7 + progress.auraLevel * 0.06})`
          }}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full 
    bg-gradient-to-br from-red-600 to translate-x-0 
    flex items-center justify-center relative overflow-hidden
    border-2 border-red-400/50"
        >
          {/* YOUR LEVEL IMAGES - PERFECT SIZE */}
          <img
            src={`/levels/level${progress.auraLevel}.jpg`}
            alt={`Aura Level ${progress.auraLevel}`}
            className="
    w-20 h-20 
    sm:w-24 sm:h-24 
    md:w-28 md:h-28 
    rounded-full 
    object-cover 
    border-2 border-white/30 
    shadow-2xl
  "
            draggable="false"
          />


          {/* RED AURA WAVE RING - Increases with level */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/40 via-transparent to-red-500/40"
            animate={{
              scale: [1, 1.1 + progress.auraLevel * 0.01, 1]
            }}
            transition={{
              duration: 2.5 + progress.auraLevel * 0.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

      </div>
    </motion.div>
  );
}
