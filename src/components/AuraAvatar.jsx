import { motion } from "framer-motion";

const auraColors = {
  1: "shadow-gray-400",
  2: "shadow-blue-400",
  3: "shadow-indigo-500",
  4: "shadow-purple-500",
  5: "shadow-yellow-400",
};

export default function AuraAvatar({ level }) {
  return (
    <motion.div
      animate={{
        boxShadow: `0 0 ${level * 25}px rgba(255,215,0,0.6)`
      }}
      className={`w-28 h-28 rounded-full bg-gradient-to-br 
      from-zinc-900 to-zinc-800 flex items-center justify-center 
      ${auraColors[level]}`}
    >
      <span className="text-4xl font-bold text-yellow-400">
        {level}
      </span>
    </motion.div>
  );
}
