"use client";

import { motion } from "framer-motion";

const notices = [
  {
    id: 1,
    title: "Semester Registration",
    date: "2024-02-15",
    category: "Academic",
    content:
      "Registration for the upcoming semester begins next week. Please ensure all dues are cleared.",
    important: true,
  },
  {
    id: 2,
    title: "Campus Maintenance Notice",
    date: "2024-02-14",
    category: "Facility",
    content:
      "The main library will be closed for renovations from 20th to 25th February.",
    important: false,
  },
  {
    id: 3,
    title: "Scholarship Applications Open",
    date: "2024-02-13",
    category: "Financial",
    content:
      "Merit scholarship applications for the academic year 2024-25 are now open.",
    important: true,
  },
  // Add more notices as needed
];

export default function NoticesPage() {
  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          //@ts-expect-error
          className="text-4xl font-bold text-white mb-8"
        >
          Notices & Announcements
        </motion.h1>

        <div className="grid gap-6">
          {notices.map((notice) => (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              //@ts-expect-error
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-1">
                    {notice.title}
                  </h2>
                  <p className="text-sm text-gray-400">
                    Posted on {new Date(notice.date).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    notice.important
                      ? "bg-red-500/10 text-red-400"
                      : "bg-blue-500/10 text-blue-400"
                  }`}
                >
                  {notice.category}
                </span>
              </div>
              <p className="text-gray-300">{notice.content}</p>
              <div className="mt-4 flex justify-end">
                <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
                  Read More →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
