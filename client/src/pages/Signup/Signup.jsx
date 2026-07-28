import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { auth, db } from "../../firebase";

import { FiArrowRight, FiLock, FiMail, FiUser } from "react-icons/fi";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import AuthLayout from "../../components/auth/AuthLayout";
import AuthCard from "../../components/auth/AuthCard";
import AuthInput from "../../components/auth/AuthInput";
import GoogleButton from "../../components/auth/GoogleButton";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [googleLoading, setGoogleLoading] = useState(false);
    const signup = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      await setDoc(
        doc(
          db,
          "users",
          userCredential.user.uid
        ),
        {
          name,
          email,
          role: "staff",
        }
      );

      toast.success("Account created successfully");

      navigate("/dashboard");
    } catch (error) {
      toast.error("Signup failed");
    }

    setLoading(false);
  };

  const googleSignup = async () => {
    try {
      setGoogleLoading(true);

      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(
        auth,
        provider
      );

      const userRef = doc(
        db,
        "users",
        result.user.uid
      );

      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: result.user.displayName || "User",
          email: result.user.email,
          role: "staff",
        });
      }

      toast.success("Google signup successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error("Google signup failed");
    }

    setGoogleLoading(false);
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Create Account"
        subtitle="Create your Inventra account to manage inventory, sales and business insights."
      >
        <GoogleButton
          onClick={googleSignup}
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
          onSubmit={signup}
          className="space-y-4"
        >
          <AuthInput
            icon={<FiUser />}
            placeholder="Full Name"
            value={name}
            setValue={setName}
          />

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
            {loading ? "Creating Account..." : "Create Account"}

            <FiArrowRight />
          </motion.button>

          

          <p className="mt-8 text-center text-sm text-slate-400">
            Already have an account?

            <Link
              to="/login"
              className="
                ml-2
                font-semibold
                text-sky-400
                transition-colors
                hover:text-sky-300
              "
            >
              Login
            </Link>
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}