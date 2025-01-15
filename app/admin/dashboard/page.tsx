"use client";

import AdminProtectedRoute from "@/app/components/AdminProtectedRoute";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  description: string;
  registrationOpen: boolean;
}

export default function AdminDashboardPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <AdminProtectedRoute>
      <main className="min-h-screen pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <PlusIcon className="w-5 h-5" />
              Add Event
            </button>
          </div>

          {/* Event Management Section */}
          <div className="grid gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">
                  Manage Events
                </h2>
                <div className="flex gap-2">
                  <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors">
                    <option value="all">All Categories</option>
                    <option value="technical">Technical</option>
                    <option value="cultural">Cultural</option>
                  </select>
                </div>
              </div>

              {/* Events Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-white/70">
                        Title
                      </th>
                      <th className="text-left py-3 px-4 text-white/70">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 text-white/70">
                        Category
                      </th>
                      <th className="text-left py-3 px-4 text-white/70">
                        Status
                      </th>
                      <th className="text-right py-3 px-4 text-white/70">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center py-8 text-white/50"
                        >
                          No events found. Add your first event!
                        </td>
                      </tr>
                    ) : (
                      events.map((event) => (
                        <tr
                          key={event.id}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        >
                          <td className="py-4 px-4 text-white">
                            {event.title}
                          </td>
                          <td className="py-4 px-4 text-white/70">
                            {event.date}
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm ${
                                event.category === "Technical"
                                  ? "bg-blue-500/10 text-blue-400"
                                  : "bg-purple-500/10 text-purple-400"
                              }`}
                            >
                              {event.category}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm ${
                                event.registrationOpen
                                  ? "bg-green-500/10 text-green-400"
                                  : "bg-yellow-500/10 text-yellow-400"
                              }`}
                            >
                              {event.registrationOpen ? "Open" : "Closed"}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => {
                                  /* Handle edit */
                                }}
                                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                              >
                                <PencilIcon className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => {
                                  /* Handle delete */
                                }}
                                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                              >
                                <TrashIcon className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  Total Events
                </h3>
                <p className="text-3xl font-bold text-primary">
                  {events.length}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  Active Events
                </h3>
                <p className="text-3xl font-bold text-green-400">
                  {events.filter((e) => e.registrationOpen).length}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  Upcoming Events
                </h3>
                <p className="text-3xl font-bold text-yellow-400">
                  {events.filter((e) => new Date(e.date) > new Date()).length}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </AdminProtectedRoute>
  );
}
