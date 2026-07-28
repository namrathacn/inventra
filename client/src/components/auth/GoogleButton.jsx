import { motion } from "framer-motion";
import { FiChrome } from "react-icons/fi";

export default function GoogleButton({
  onClick,
  loading = false,
  text = "Continue with Google",
}) {
  return (
    <motion.button
      type="button"
      whileHover={{
        scale: 1.015,
      }}
      whileTap={{
        scale: 0.98,
      }}
      onClick={onClick}
      disabled={loading}
      className="
        w-full
        py-4
        rounded-2xl
        border
        border-white/10
        bg-white/[0.05]
        backdrop-blur-xl
        flex
        items-center
        justify-center
        gap-3
        text-white
        font-semibold
        transition-all
        duration-300
        hover:bg-white/[0.08]
        hover:border-sky-400/40
        hover:shadow-lg
        hover:shadow-sky-500/10
        disabled:opacity-60
        disabled:cursor-not-allowed
      "
    >
      <FiChrome
        className="
          text-xl
          text-sky-400
        "
      />

      <span>
        {loading ? "Connecting..." : text}
      </span>
    </motion.button>
  );
}