"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { EventFormData, CLUB_OPTIONS } from "../types/event";
import { addEvent, updateEvent } from "../firebase/firestore";
import { uploadToCloudinary } from "../utils/cloudinary";

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEventAdded: () => void;
  editEvent?: Event;
}

export default function AddEventModal({
  isOpen,
  onClose,
  onEventAdded,
  editEvent,
}: AddEventModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    category: "Technical",
    club: CLUB_OPTIONS[0],
    registrationOpen: true,
  });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (editEvent) {
      setFormData({
        title: editEvent.title,
        description: editEvent.description,
        date: editEvent.date,
        time: editEvent.time,
        venue: editEvent.venue,
        category: editEvent.category,
        club: editEvent.club,
        registrationOpen: editEvent.registrationOpen,
        imageUrl: editEvent.imageUrl,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        venue: "",
        category: "Technical",
        club: CLUB_OPTIONS[0],
        registrationOpen: true,
      });
    }
  }, [editEvent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      let imageUrl = formData.imageUrl || "";
      if (imageFile) {
        setIsUploading(true);
        try {
          imageUrl = await uploadToCloudinary(imageFile);
        } catch (error) {
          throw new Error("Image upload failed. Please try again.");
        } finally {
          setIsUploading(false);
        }
      }

      if (editEvent) {
        await updateEvent(editEvent.id, {
          ...formData,
          imageUrl,
        });
      } else {
        await addEvent({
          ...formData,
          imageUrl,
        });
      }

      onEventAdded();
      onClose();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-black/80 backdrop-blur-sm rounded-2xl p-4 sm:p-8 border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editEvent ? "Edit Event" : "Add New Event"}
              </h2>
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {error && (
              <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <label className="text-white/70 text-sm">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-white/70 text-sm">Description</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <label className="text-white/70 text-sm">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-white/70 text-sm">Time</label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-white/70 text-sm">Venue</label>
                <input
                  type="text"
                  required
                  value={formData.venue}
                  onChange={(e) =>
                    setFormData({ ...formData, venue: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <label className="text-white/70 text-sm">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="Technical">Technical</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Sports">Sports</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-white/70 text-sm">
                    Organizing Club
                  </label>
                  <select
                    value={formData.club}
                    onChange={(e) =>
                      setFormData({ ...formData, club: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-primary transition-colors"
                  >
                    {CLUB_OPTIONS.map((club) => (
                      <option key={club} value={club}>
                        {club}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-white/70 text-sm">Status</label>
                <select
                  value={formData.registrationOpen.toString()}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      registrationOpen: e.target.value === "true",
                    })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="true">Open</option>
                  <option value="false">Closed</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-white/70 text-sm">Event Image</label>
                <div className="space-y-4">
                  {(formData.imageUrl || imageFile) && (
                    <div className="relative aspect-[3/4] w-full max-w-[200px] mx-auto overflow-hidden rounded-lg border border-white/10">
                      <img
                        src={
                          imageFile
                            ? URL.createObjectURL(imageFile)
                            : formData.imageUrl
                        }
                        alt="Preview"
                        className="w-full h-full object-contain bg-black/40"
                      />
                    </div>
                  )}

                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 5 * 1024 * 1024) {
                            setError("Image size should be less than 5MB");
                            return;
                          }
                          setImageFile(file);
                        }
                      }}
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-primary transition-colors"
                      disabled={isUploading}
                    />
                    {isUploading && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-white/50">
                    Recommended: Portrait orientation (3:4 ratio), max 5MB.
                    Supported formats: JPG, PNG
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-white py-2.5 rounded-lg transition-colors disabled:opacity-70 mt-6"
              >
                {isLoading
                  ? editEvent
                    ? "Updating Event..."
                    : "Adding Event..."
                  : editEvent
                  ? "Update Event"
                  : "Add Event"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
