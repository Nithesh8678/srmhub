"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { EnvelopeIcon, KeyIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

const ADMIN_EMAILS = ["admin@srm.edu.in", "nitheshnithesh56@gmail.com"];

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user, signIn } = useAuth();

  // Check if user is already logged in and is an admin
  useEffect(() => {
    if (user && ADMIN_EMAILS.includes(user.email || "")) {
      console.log("User is already logged in as admin, redirecting...");
      router.push("/admin/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!ADMIN_EMAILS.includes(email)) {
        throw new Error("Unauthorized access");
      }

      await signIn(email, password);

      // Add a small delay to ensure Firebase auth state is updated
      setTimeout(() => {
        console.log("Login successful, redirecting to dashboard...");
        router.push("/admin/dashboard");
      }, 1000);
    } catch (error: any) {
      console.error("Login error:", error);
      setError(
        error.message === "Unauthorized access"
          ? "You are not authorized to access admin panel"
          : "Invalid email or password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // If user is already logged in as admin, show loading state
  if (user && ADMIN_EMAILS.includes(user.email || "")) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Rest of your component remains the same
  return (
    <main className="min-h-screen pt-24 pb-12 flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
        >
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            Admin Login
          </h1>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-white/70 text-sm">Email</label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-primary transition-colors"
                  placeholder="admin@srm.edu.in"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white/70 text-sm">Password</label>
              <div className="relative">
                <KeyIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-primary transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full bg-primary hover:bg-primary/90 text-white py-2.5 rounded-lg transition-colors disabled:opacity-70"
            >
              {isLoading ? (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </motion.div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
