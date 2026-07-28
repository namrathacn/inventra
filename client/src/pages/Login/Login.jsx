import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { auth } from "../../firebase";

import {
  FiArrowRight,
  FiLock,
  FiMail,
} from "react-icons/fi";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import AuthLayout from "../../components/auth/AuthLayout";
import AuthCard from "../../components/auth/AuthCard";
import AuthInput from "../../components/auth/AuthInput";
import GoogleButton from "../../components/auth/GoogleButton";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [googleLoading, setGoogleLoading] = useState(false);
    const login = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      toast.success("Welcome back to Inventra");

      navigate("/dashboard");
    } catch (error) {
      toast.error("Invalid login details");
    }

    setLoading(false);
  };

  const googleLogin = async () => {
    try {
      setGoogleLoading(true);

      const provider = new GoogleAuthProvider();

      await signInWithPopup(
        auth,
        provider
      );

      toast.success("Google login successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error("Google login failed");
    }

    setGoogleLoading(false);
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Welcome Back"
        subtitle="Sign in to access your inventory dashboard and continue managing your business."
      >
        <GoogleButton
          onClick={googleLogin}
          loading={googleLoading}
          text="Continue with Google"
        />

        <div className="flex items-center gap-3 my-8">
          <div className="flex-1 h-px bg-white/10" />

          <span className="text-xs tracking-widest text-slate-500">
            OR
          </span>

          <div className="flex-1 h-px bg-white/10" />
        </div>

        <form
          onSubmit={login}
          className="space-y-4"
        >
          <AuthInput
            icon={<FiMail />}
            placeholder="Email Address"
            value={email}
            setValue={setEmail}
          />

          <AuthInput
            icon={<FiLock />}
            placeholder="Password"
            type="password"
            value={password}
            setValue={setPassword}
          />
                    <motion.button
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            disabled={loading}
            className="
              mt-3
              w-full
              rounded-2xl
              bg-gradient-to-r
              from-sky-500
              to-blue-600
              py-4
              font-semibold
              text-white
              shadow-lg
              shadow-sky-500/20
              transition-all
              duration-300
              hover:shadow-sky-500/30
              disabled:cursor-not-allowed
              disabled:opacity-60
              flex
              items-center
              justify-center
              gap-3
            "
          >
            {loading ? "Signing In..." : "Login"}

            <FiArrowRight />
          </motion.button>

          

          <p className="mt-8 text-center text-sm text-slate-400">
            Don't have an account?

            <Link
              to="/signup"
              className="
                ml-2
                font-semibold
                text-sky-400
                transition-colors
                hover:text-sky-300
              "
            >
              Sign Up
            </Link>
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}