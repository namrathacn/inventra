import AuthBackground from "./AuthBackground";

export default function AuthLayout({ children }) {
  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        flex
        items-center
        justify-center
        bg-[#020617]
        px-5
        py-4
      "
    >
      <AuthBackground />

      <div
        className="
          absolute
          inset-0
          opacity-[0.03]
          [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)]
          [background-size:40px_40px]
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-transparent
          via-transparent
          to-black/30
        "
      />

      <div className="relative z-10 w-full max-w-lg">
        {children}
      </div>
    </div>
  );
}