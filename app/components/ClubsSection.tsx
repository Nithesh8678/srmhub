"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CLUB_OPTIONS } from "../types/event";

export default function ClubsSection() {
  const [hoveredClub, setHoveredClub] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-white mb-6">Our Clubs</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {CLUB_OPTIONS.map((club) => (
          <Link key={club} href={`/events?club=${club}`}>
            <motion.div
              onMouseEnter={() => setHoveredClub(club)}
              onMouseLeave={() => setHoveredClub(null)}
              className={`relative bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-4 text-center transition-colors ${
                hoveredClub === club ? "bg-white/10" : ""
              }`}
            >
              <h3 className="text-sm font-medium text-white">{club}</h3>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
