"use client";

import AdminProtectedRoute from "@/app/components/AdminProtectedRoute";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { db } from "@/app/firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Event } from "@/app/types/event";
import AddEventModal from "@/app/components/AddEventModal";
import { deleteEvent } from "@/app/firebase/firestore";
import { CLUB_OPTIONS } from "@/app/types/event";

export default function AdminDashboardPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedClub, setSelectedClub] = useState("all");
  const [editingEvent, setEditingEvent] = useState<Event | undefined>(
    undefined
  );

  useEffect(() => {
    const q = query(collection(db, "events"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const eventsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Event[];

        setEvents(eventsList);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching events:", error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleDeleteEvent = async (eventId: string) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(eventId);
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  const filteredEvents = events
    .filter((event) =>
      selectedCategory === "all" ? true : event.category === selectedCategory
    )
    .filter((event) =>
      selectedClub === "all" ? true : event.club === selectedClub
    );

  const handleEditClick = (event: Event) => {
    setEditingEvent(event);
    setIsAddModalOpen(true);
  };

  const handleModalClose = () => {
    setIsAddModalOpen(false);
    setEditingEvent(undefined);
  };

  return (
    <AdminProtectedRoute>
      <main className="min-h-screen pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Admin Dashboard
            </h1>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
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
              className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-xl font-semibold text-white">
                  Manage Events
                </h2>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full sm:w-auto bg-black border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="all">All Categories</option>
                    <option value="Technical">Technical</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Sports">Sports</option>
                  </select>

                  <select
                    value={selectedClub}
                    onChange={(e) => setSelectedClub(e.target.value)}
                    className="w-full sm:w-auto bg-black border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="all">All Clubs</option>
                    {CLUB_OPTIONS.map((club) => (
                      <option key={club} value={club}>
                        {club}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Events Table */}
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="min-w-[800px] px-4 sm:px-0">
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
                          Club
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
                      {isLoading ? (
                        <tr>
                          <td colSpan={6} className="text-center py-8">
                            <div className="flex justify-center">
                              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                            </div>
                          </td>
                        </tr>
                      ) : filteredEvents.length === 0 ? (
                        <tr>
                          <td
                            colSpan={6}
                            className="text-center py-8 text-white/50"
                          >
                            No events found. Add your first event!
                          </td>
                        </tr>
                      ) : (
                        filteredEvents.map((event) => (
                          <tr
                            key={event.id}
                            className="border-b border-white/5 hover:bg-white/5 transition-colors"
                          >
                            <td className="py-4 px-4 text-white">
                              <div className="flex items-center gap-3">
                                {event.imageUrl && (
                                  <div className="relative w-12 aspect-[3/4] rounded-lg overflow-hidden flex-shrink-0">
                                    <img
                                      src={event.imageUrl}
                                      alt={event.title}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )}
                                <span>{event.title}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-white/70">
                              {event.date}
                            </td>
                            <td className="py-4 px-4">
                              <span
                                className={`px-3 py-1 rounded-full text-sm ${
                                  event.category === "Technical"
                                    ? "bg-blue-500/10 text-blue-400"
                                    : event.category === "Cultural"
                                    ? "bg-purple-500/10 text-purple-400"
                                    : "bg-green-500/10 text-green-400"
                                }`}
                              >
                                {event.category}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <span
                                className={`px-3 py-1 rounded-full text-sm bg-purple-500/10 text-purple-400`}
                              >
                                {event.club}
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
                                    handleEditClick(event);
                                  }}
                                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                >
                                  <PencilIcon className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteEvent(event.id)}
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
              </div>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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

        <AddEventModal
          isOpen={isAddModalOpen}
          onClose={handleModalClose}
          onEventAdded={() => {
            // The events list will automatically update through the snapshot listener
          }}
          editEvent={editingEvent}
        />
      </main>
    </AdminProtectedRoute>
  );
}
