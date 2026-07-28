import { motion } from "framer-motion";

export default function AuthInput({
  icon,
  placeholder,
  value,
  setValue,
  type = "text",
}) {
  return (
    <motion.div
      whileFocus={{ scale: 1.01 }}
      className="
        group
        flex
        items-center
        gap-3
        rounded-2xl
        border
        border-white/10
        bg-white/[0.04]
        px-4
        transition-all
        duration-300
        focus-within:border-sky-400/60
        focus-within:bg-white/[0.07]
        focus-within:shadow-lg
        focus-within:shadow-sky-500/10
      "
    >
      <span
        className="
          text-slate-400
          text-xl
          transition-colors
          duration-300
          group-focus-within:text-sky-400
        "
      >
        {icon}
      </span>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="
          w-full
          bg-transparent
          py-4
          text-white
          outline-none
          placeholder:text-slate-500
        "
      />
    </motion.div>
  );
}