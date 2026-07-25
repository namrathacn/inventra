import { motion } from "framer-motion";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-[var(--bg)] relative overflow-hidden flex items-center justify-center px-4">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(var(--text-dim) 1px, transparent 1px), linear-gradient(90deg, var(--text-dim) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--accent)] opacity-[0.08] blur-[120px] rounded-full pointer-events-none" />

      <div className="absolute top-20 left-16 w-10 h-10 border-2 border-[var(--accent-2)] opacity-20 rounded-md animate-float-slow hidden md:block" />
      <div className="absolute bottom-24 left-1/4 w-6 h-6 border-2 border-[var(--accent)] opacity-25 rounded-md animate-float hidden md:block" />
      <div className="absolute top-1/3 right-20 w-8 h-8 border-2 border-[var(--accent-2)] opacity-20 rounded-md animate-float-slower hidden md:block" />
      <div className="absolute bottom-16 right-1/4 w-5 h-5 border-2 border-[var(--accent)] opacity-20 rounded-md animate-float-slow hidden md:block" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm"
      >
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-8 h-8 rounded-md bg-[var(--accent)] flex items-center justify-center font-display font-bold text-[#0B1220]">
            I
          </div>
          <span className="font-display text-xl font-semibold tracking-tight text-[var(--text)]">
            Inventra
          </span>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-[var(--surface)]/80 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-2)] to-transparent animate-scanline" />
          <div className="p-8">{children}</div>
        </div>

        <p className="text-center text-xs font-mono text-[var(--text-dim)] mt-6 tracking-wide">
          STOCK · SALES · CONTROL
        </p>
      </motion.div>
    </div>
  );
}