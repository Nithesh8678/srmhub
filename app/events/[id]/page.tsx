"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { Event } from "@/app/types/event";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getEvent, registerForEvent } from "@/app/firebase/firestore";
import { useAuth } from "@/app/context/AuthContext";

interface PageProps {
  params: {
    id: string;
  };
}

export default function EventDetailPage({ params }: PageProps) {
  const { user } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEvent(params.id);
        if (eventData) {
          setEvent(eventData);
        } else {
          router.push("/events");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        router.push("/events");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [params.id, router]);

  const handleRegistration = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (!event) return;

    if (event.registrationLink) {
      window.open(event.registrationLink, "_blank");
    } else {
      setIsRegistering(true);
      try {
        await registerForEvent(params.id, user.uid);
      } catch (error: any) {
        console.error("Registration error:", error);
      } finally {
        setIsRegistering(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!event) return null;

  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Events
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          //@ts-expect-error
          className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
        >
          {event.imageUrl && (
            <div className="relative">
              <div className="aspect-[3/4] md:aspect-[2/3] lg:aspect-[16/9] overflow-hidden">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-contain bg-black/40"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
            </div>
          )}

          <div className="p-8">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
              <h1 className="text-3xl font-bold text-white">{event.title}</h1>
              <span
                className={`px-4 py-1.5 rounded-full text-sm ${
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

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-white/70">
                  <CalendarIcon className="w-6 h-6" />
                  <div>
                    <p className="text-sm">Date</p>
                    <p className="text-white">{event.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-white/70">
                  <ClockIcon className="w-6 h-6" />
                  <div>
                    <p className="text-sm">Time</p>
                    <p className="text-white">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-white/70">
                  <MapPinIcon className="w-6 h-6" />
                  <div>
                    <p className="text-sm">Venue</p>
                    <p className="text-white">{event.venue}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white mb-3">
                  About the Event
                </h2>
                <p className="text-white/70 whitespace-pre-wrap">
                  {event.description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-8">
              <span
                className={`px-4 py-2 rounded-full text-sm ${
                  event.registrationOpen
                    ? "bg-green-500/10 text-green-400"
                    : "bg-yellow-500/10 text-yellow-400"
                }`}
              >
                {event.registrationOpen
                  ? "Registration Open"
                  : "Registration Closed"}
              </span>
              {event.registrationOpen && (
                <button
                  onClick={handleRegistration}
                  disabled={isRegistering}
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-70"
                >
                  {isRegistering
                    ? "Registering..."
                    : event.registrationLink
                    ? "Register on Form"
                    : "Register Now"}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
