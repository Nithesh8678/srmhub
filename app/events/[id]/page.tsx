"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
  DocumentTextIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

// This would typically come from an API/database
const eventDetails = {
  id: 1,
  title: "Tech Summit 2024",
  date: "2024-03-15",
  time: "09:00 AM - 05:00 PM",
  venue: "Main Auditorium",
  category: "Technical",
  description: `Join us for the biggest tech event of the year! The Tech Summit 2024 brings together industry leaders, innovators, and tech enthusiasts for a day of learning, networking, and inspiration.

  What to expect:
  • Keynote speeches from industry leaders
  • Interactive workshops and demos
  • Networking opportunities
  • Latest tech showcases
  • Q&A sessions with experts`,
  registrationDeadline: "2024-03-10",
  capacity: "500 participants",
  requirements: [
    "Valid college ID",
    "Laptop for workshops",
    "Basic programming knowledge",
    "Pre-event assignment completion",
  ],
  images: [
    "/events/tech-summit-1.jpg",
    "/events/tech-summit-2.jpg",
    "/events/tech-summit-3.jpg",
  ],
  schedule: [
    {
      time: "09:00 AM - 09:30 AM",
      title: "Registration & Breakfast",
    },
    {
      time: "09:30 AM - 10:30 AM",
      title: "Keynote Speech",
    },
    {
      time: "10:45 AM - 12:30 PM",
      title: "Technical Workshops",
    },
    {
      time: "12:30 PM - 01:30 PM",
      title: "Lunch Break & Networking",
    },
    {
      time: "01:30 PM - 04:30 PM",
      title: "Hands-on Sessions",
    },
    {
      time: "04:30 PM - 05:00 PM",
      title: "Closing Ceremony",
    },
  ],
  organizers: [
    {
      name: "Dr. Jane Smith",
      role: "Event Coordinator",
      contact: "jane.smith@srm.edu.in",
    },
    {
      name: "Prof. John Doe",
      role: "Technical Head",
      contact: "john.doe@srm.edu.in",
    },
  ],
  links: {
    registration: "https://forms.google.com/register",
    resources: "https://drive.google.com/resources",
    telegram: "https://t.me/techsummit2024",
    whatsapp: "https://chat.whatsapp.com/group",
  },
  faqs: [
    {
      question: "Is this event open to all departments?",
      answer: "Yes, students from all departments can participate.",
    },
    {
      question: "Will certificates be provided?",
      answer: "Yes, digital certificates will be provided to all participants.",
    },
    {
      question: "Is there a registration fee?",
      answer: "Yes, there is a nominal fee of ₹500 for registration.",
    },
  ],
};

export default function EventPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white/80 hover:text-white mb-6 group"
        >
          <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Events
        </button>

        {/* Header Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold text-white mb-4">
              {eventDetails.title}
            </h1>
            <div className="space-y-3 text-gray-300">
              <p className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                {new Date(eventDetails.date).toLocaleDateString()}
              </p>
              <p className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5" />
                {eventDetails.time}
              </p>
              <p className="flex items-center gap-2">
                <MapPinIcon className="w-5 h-5" />
                {eventDetails.venue}
              </p>
              <p className="flex items-center gap-2">
                <UserGroupIcon className="w-5 h-5" />
                {eventDetails.capacity}
              </p>
            </div>
          </motion.div>

          {/* Registration Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
          >
            <h2 className="text-xl font-semibold text-white mb-4">
              Registration Details
            </h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                Deadline:{" "}
                {new Date(
                  eventDetails.registrationDeadline
                ).toLocaleDateString()}
              </p>
              <Link
                href={eventDetails.links.registration}
                target="_blank"
                className="block w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg text-center transition-colors"
              >
                Register Now
              </Link>
              <div className="flex gap-2 justify-center">
                {Object.entries(eventDetails.links).map(
                  ([platform, url]) =>
                    platform !== "registration" && (
                      <Link
                        key={platform}
                        href={url}
                        target="_blank"
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <LinkIcon className="w-5 h-5 text-white" />
                      </Link>
                    )
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Image Gallery */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Gallery</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {eventDetails.images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-video rounded-lg overflow-hidden"
              >
                <Image
                  src={image}
                  alt={`${eventDetails.title} - Image ${index + 1}`}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Description and Requirements */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              About the Event
            </h2>
            <p className="text-gray-300 whitespace-pre-line">
              {eventDetails.description}
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Requirements
            </h2>
            <ul className="space-y-2">
              {eventDetails.requirements.map((req, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-gray-300"
                >
                  <DocumentTextIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </motion.section>
        </div>

        {/* Schedule */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">
            Event Schedule
          </h2>
          <div className="space-y-4">
            {eventDetails.schedule.map((item, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-4 flex flex-col md:flex-row md:items-center gap-4"
              >
                <div className="font-mono text-primary">{item.time}</div>
                <div className="text-white">{item.title}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Organizers */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Organizers</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {eventDetails.organizers.map((organizer, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-4"
              >
                <h3 className="font-semibold text-white">{organizer.name}</h3>
                <p className="text-gray-400">{organizer.role}</p>
                <p className="text-primary">{organizer.contact}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* FAQs */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-semibold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {eventDetails.faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-6"
              >
                <h3 className="font-semibold text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
}
