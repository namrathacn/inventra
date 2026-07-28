import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

export default function AuthBackground() {
  return (
    <>
      {/* Soft Glow Top */}
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -top-56
          -left-56
          w-[600px]
          h-[600px]
          rounded-full
          bg-sky-500/15
          blur-[180px]
        "
      />

      {/* Soft Glow Bottom */}
      <motion.div
        animate={{
          x: [0, -90, 0],
          y: [0, 70, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -bottom-56
          -right-56
          w-[600px]
          h-[600px]
          rounded-full
          bg-indigo-500/12
          blur-[180px]
        "
      />

      {/* Floating Stars */}
      {[...Array(8)].map((_, index) => (
        <motion.div
          key={index}
          animate={{
            y: [0, -25, 0],
            opacity: [0.2, 0.7, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 5 + index,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            top: `${12 + index * 9}%`,
            left: `${8 + index * 10}%`,
          }}
          className="
            absolute
            text-slate-300/30
          "
        >
          <FiStar size={15} />
        </motion.div>
      ))}

      {/* Floating Glass Square */}
      <motion.div
        animate={{
          y: [0, -40, 0],
          rotate: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          top-20
          right-24
          w-24
          h-24
          rounded-3xl
          bg-white/5
          border
          border-white/10
          backdrop-blur-xl
        "
      />

      {/* Floating Glass Circle */}
      <motion.div
        animate={{
          y: [0, 40, 0],
          rotate: [0, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          bottom-24
          left-20
          w-28
          h-28
          rounded-full
          bg-slate-400/5
          border
          border-white/10
          backdrop-blur-xl
        "
      />
    </>
  );
}