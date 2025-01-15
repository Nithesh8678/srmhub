"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { db } from "@/app/firebase/config";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { Event, CLUB_OPTIONS } from "@/app/types/event";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const searchParams = useSearchParams();
  const router = useRouter();
  const clubParam = searchParams.get("club");
  const [selectedClub, setSelectedClub] = useState(clubParam || "all");

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

  const handleClubChange = (club: string) => {
    setSelectedClub(club);
    if (club === "all") {
      router.push("/events");
    } else {
      router.push(`/events?club=${club}`);
    }
  };

  const filteredEvents = events
    .filter((event) =>
      selectedCategory === "all" ? true : event.category === selectedCategory
    )
    .filter((event) =>
      selectedClub === "all" ? true : event.club === selectedClub
    );

  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Events</h1>
            <p className="text-sm text-white/70">
              Discover and register for upcoming events
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-black border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
            >
              <option value="all">All Categories</option>
              <option value="Technical">Technical</option>
              <option value="Cultural">Cultural</option>
              <option value="Sports">Sports</option>
            </select>

            <select
              value={selectedClub}
              onChange={(e) => handleClubChange(e.target.value)}
              className="bg-black border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
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

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/50">No events found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden group"
              >
                {event.imageUrl && (
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                )}
                <div className="p-3">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-white line-clamp-1">
                      {event.title}
                    </h3>
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-xs ${
                        event.category === "Technical"
                          ? "bg-blue-500/10 text-blue-400"
                          : event.category === "Cultural"
                          ? "bg-purple-500/10 text-purple-400"
                          : "bg-green-500/10 text-green-400"
                      }`}
                    >
                      {event.category}
                    </span>
                  </div>

                  <p className="text-xs text-white/70 mb-3 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-1 mb-3 text-xs">
                    <div className="flex items-center gap-1.5 text-white/70">
                      <CalendarIcon className="w-3.5 h-3.5" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/70">
                      <ClockIcon className="w-3.5 h-3.5" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/70">
                      <MapPinIcon className="w-3.5 h-3.5" />
                      <span className="line-clamp-1">{event.venue}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        event.registrationOpen
                          ? "bg-green-500/10 text-green-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {event.registrationOpen ? "Open" : "Closed"}
                    </span>
                    <Link
                      href={`/events/${event.id}`}
                      className="bg-primary hover:bg-primary/90 text-white px-2.5 py-1 rounded text-xs transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
