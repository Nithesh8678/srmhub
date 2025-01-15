"use client";

import ProtectedRoute from "../components/ProtectedRoute";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <main className="min-h-screen pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <h1 className="text-3xl font-bold text-white mb-6">
              Welcome, {user?.displayName || "User"}!
            </h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Add your dashboard content here */}
              <div className="bg-white/5 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-2">
                  Your Events
                </h2>
                <p className="text-gray-400">
                  View and manage your registered events
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-2">
                  Notifications
                </h2>
                <p className="text-gray-400">
                  Stay updated with latest notices
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-2">
                  Profile
                </h2>
                <p className="text-gray-400">Manage your account settings</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
