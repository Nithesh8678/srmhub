"use client";

import { motion } from "framer-motion";
import { HoverEffect } from "./ui/card-hover-effect";

const featuredEvents = [
  {
    title: "Tech Summit 2024",
    description: "Join us for the biggest tech event of the year",
    link: "/events/tech-summit",
    image: "/events/tech-summit.jpg",
  },
  {
    title: "Cultural Fest",
    description: "Experience the diversity of our campus culture",
    link: "/events/cultural-fest",
    image: "/events/cultural-fest.jpg",
  },
  {
    title: "Hackathon",
    description: "48 hours of coding, innovation, and fun",
    link: "/events/hackathon",
    image: "/events/hackathon.jpg",
  },
  {
    title: "Sports Meet",
    description: "Annual inter-college sports competition",
    link: "/events/sports-meet",
    image: "/events/sports-meet.jpg",
  },
];

export function FeaturedEvents() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center text-4xl font-bold text-white mb-8"
      >
        Featured Events
      </motion.h2>
      <HoverEffect items={featuredEvents} />
    </div>
  );
}
