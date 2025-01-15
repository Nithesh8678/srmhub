"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const events = [
  {
    id: 1,
    title: "Tech Summit 2024",
    date: "2024-03-15",
    time: "09:00 AM - 05:00 PM",
    venue: "Main Auditorium",
    category: "Technical",
    description:
      "Join us for a day of innovation and technology with industry experts and hands-on workshops.",
    registrationOpen: true,
  },
  {
    id: 2,
    title: "Cultural Night",
    date: "2024-03-20",
    time: "06:00 PM - 10:00 PM",
    venue: "Open Air Theatre",
    category: "Cultural",
    description:
      "Experience the vibrant cultural diversity through music, dance, and theatrical performances.",
    registrationOpen: true,
  },
  {
    id: 3,
    title: "Hackathon 2024",
    date: "2024-04-01",
    time: "48 Hours",
    venue: "CS Block",
    category: "Technical",
    description:
      "48-hour coding marathon to solve real-world problems. Amazing prizes to be won!",
    registrationOpen: false,
  },
];

export default function EventsPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Technical", "Cultural"];

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
          <h1 className="text-4xl font-bold text-white">Upcoming Events</h1>

          {/* Mobile Dropdown */}
          <div className="relative w-full md:hidden">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors flex items-center justify-between"
            >
              <span>{selectedCategory}</span>
              <ChevronDownIcon
                className={`w-5 h-5 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 z-50"
                >
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className={`w-full px-4 py-2 text-left hover:bg-white/10 transition-colors ${
                        selectedCategory === category
                          ? "text-primary"
                          : "text-white"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-white/5 hover:bg-white/10 text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10"
            >
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <span className="text-5xl opacity-50">🎉</span>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-white">
                    {event.title}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      event.registrationOpen
                        ? "bg-green-500/10 text-green-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {event.registrationOpen ? "Open" : "Coming Soon"}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-400 text-sm flex items-center gap-2">
                    <span>📅</span> {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-400 text-sm flex items-center gap-2">
                    <span>⏰</span> {event.time}
                  </p>
                  <p className="text-gray-400 text-sm flex items-center gap-2">
                    <span>📍</span> {event.venue}
                  </p>
                </div>
                <p className="text-gray-300 mb-4">{event.description}</p>
                <Link
                  href={`/events/${event.id}`}
                  className={`w-full py-2 rounded-lg text-center transition-colors ${
                    event.registrationOpen
                      ? "bg-primary hover:bg-primary/90 text-white"
                      : "bg-white/5 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {event.registrationOpen ? "View Details" : "Coming Soon"}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
