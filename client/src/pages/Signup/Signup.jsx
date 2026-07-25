import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import AuthLayout from "../../components/layout/AuthLayout";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        email,
        role: "staff",
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message.includes("email-already") ? "Email already in use" : "Signup failed, try again");
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const userRef = doc(db, "users", result.user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: result.user.displayName || "New User",
          email: result.user.email,
          role: "staff",
        });
      }
      navigate("/dashboard");
    } catch (err) {
      setError("Google sign-in failed, try again");
    }
    setGoogleLoading(false);
  };

  return (
    <AuthLayout>
      <h1 className="font-display text-2xl font-semibold text-[var(--text)] mb-1">
        Create your account
      </h1>
      <p className="text-[var(--text-dim)] text-sm mb-6">
        Start tracking inventory in minutes
      </p>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-3 py-2 rounded-lg mb-4">
          {error}
        </div>
      )}

      <button
        onClick={handleGoogleSignIn}
        disabled={googleLoading}
        className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-[var(--text)] py-2.5 rounded-lg transition mb-5 disabled:opacity-50"
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.48c-.28 1.5-1.13 2.78-2.42 3.63v3h3.92c2.29-2.11 3.61-5.22 3.61-8.82z"/>
          <path fill="#34A853" d="M12 24c3.27 0 6.01-1.08 8.01-2.93l-3.92-3c-1.08.73-2.47 1.16-4.09 1.16-3.14 0-5.8-2.12-6.75-4.97H1.2v3.1C3.19 21.3 7.28 24 12 24z"/>
          <path fill="#FBBC05" d="M5.25 14.26c-.25-.73-.38-1.51-.38-2.26s.14-1.53.38-2.26v-3.1H1.2A11.96 11.96 0 0 0 0 12c0 1.93.46 3.76 1.2 5.36l4.05-3.1z"/>
          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.45-3.45C18 1.19 15.27 0 12 0 7.28 0 3.19 2.7 1.2 6.64l4.05 3.1c.95-2.85 3.61-4.99 6.75-4.99z"/>
        </svg>
        <span className="text-sm font-medium">
          {googleLoading ? "Signing in..." : "Continue with Google"}
        </span>
      </button>

      <div className="flex items-center gap-3 mb-5">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-[var(--text-dim)] font-mono">OR</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-mono text-[var(--text-dim)] mb-1.5 tracking-wide">
            FULL NAME
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-[var(--text)] focus:outline-none focus:border-[var(--accent-2)] focus:ring-1 focus:ring-[var(--accent-2)] transition"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-[var(--text-dim)] mb-1.5 tracking-wide">
            EMAIL
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-[var(--text)] focus:outline-none focus:border-[var(--accent-2)] focus:ring-1 focus:ring-[var(--accent-2)] transition"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-[var(--text-dim)] mb-1.5 tracking-wide">
            PASSWORD
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-[var(--text)] focus:outline-none focus:border-[var(--accent-2)] focus:ring-1 focus:ring-[var(--accent-2)] transition"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--accent)] text-[#0B1220] font-semibold py-2.5 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </motion.button>
      </form>

      <p className="text-sm text-[var(--text-dim)] mt-6 text-center">
        Already have an account?{" "}
        <Link to="/" className="text-[var(--accent-2)] font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}