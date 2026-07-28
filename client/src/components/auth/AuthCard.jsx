import { motion } from "framer-motion";

export default function AuthCard({
  title,
  subtitle,
  children,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="
        relative
        z-10
        w-full
        max-w-lg
        rounded-[28px]
        overflow-hidden
        border
        border-white/10
        bg-white/[0.06]
        backdrop-blur-3xl
        shadow-2xl
        shadow-black/40
        p-8
      "
    >
      <div
        className="
          absolute
          inset-0
          rounded-[28px]
          bg-gradient-to-br
          from-sky-500/10
          via-transparent
          to-indigo-500/10
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          top-0
          left-0
          right-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-sky-400/50
          to-transparent
        "
      />

      <div className="relative z-10">
        <h1
          className="
            text-center
            text-4xl
            font-black
            bg-gradient-to-r
            from-sky-300
            via-blue-400
            to-indigo-400
            bg-clip-text
            text-transparent
          "
        >
          Inventra
        </h1>

        <p className="text-center text-lg font-semibold text-white mt-3">
          {title}
        </p>

        <p className="text-center text-sm text-slate-400 mt-2 mb-8">
          {subtitle}
        </p>

        {children}
      </div>
    </motion.div>
  );
}