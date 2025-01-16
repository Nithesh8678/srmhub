"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { db } from "@/app/firebase/config";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { Event } from "@/app/types/event";

export default function FeaturedEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Query to get the 4 most recent events
    const q = query(
      collection(db, "events"),
      orderBy("createdAt", "desc"),
      limit(4)
    );

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

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden animate-pulse"
            >
              <div className="aspect-[3/4] bg-white/5" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-white/5 rounded w-3/4" />
                <div className="space-y-2">
                  <div className="h-3 bg-white/5 rounded" />
                  <div className="h-3 bg-white/5 rounded w-4/5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-white mb-6">Featured Events</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            //@ts-expect-error
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
            <div className="p-4">
              <h3 className="text-sm font-semibold text-white mb-2 line-clamp-1">
                {event.title}
              </h3>

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
    </div>
  );
}
