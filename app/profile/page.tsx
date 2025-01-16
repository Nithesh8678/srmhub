"use client";

import { useState, ChangeEvent, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import {
  UserIcon,
  EnvelopeIcon,
  BellIcon,
  KeyIcon,
  CameraIcon,
  ArrowPathIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { uploadToCloudinary } from "../utils/cloudinary";
import {
  updateUserProfile as updateFirestoreProfile,
  getUserProfile,
} from "@/app/firebase/firestore";
import { toast } from "react-hot-toast";
import ChangePasswordModal from "../components/ChangePasswordModal";

interface NotificationSetting {
  id: "eventUpdates" | "newNotices" | "registrationConfirmations";
  title: string;
  description: string;
}

export default function ProfilePage() {
  const { user, updateUserProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "general" | "security" | "notifications"
  >("general");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    bio: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    eventUpdates: false,
    newNotices: false,
    registrationConfirmations: false,
  });

  const NOTIFICATION_SETTINGS: NotificationSetting[] = [
    {
      id: "eventUpdates",
      title: "Event Updates",
      description: "Receive notifications about event updates",
    },
    {
      id: "newNotices",
      title: "New Notices",
      description: "Receive notifications about new notices",
    },
    {
      id: "registrationConfirmations",
      title: "Registration Confirmations",
      description: "Receive notifications about registration confirmations",
    },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.uid) return;
      try {
        const profile = await getUserProfile(user.uid);
        if (profile) {
          setFormData({
            displayName: profile.displayName || user.displayName || "",
            email: user.email || "",
            phone: profile.phone || "",
            bio: profile.bio || "",
          });
          setNotificationSettings(
            profile.notificationPreferences || {
              eventUpdates: false,
              newNotices: false,
              registrationConfirmations: false,
            }
          );
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile");
      } finally {
        setIsProfileLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid) return;

    setIsLoading(true);
    try {
      await updateUserProfile({ displayName: formData.displayName });

      await updateFirestoreProfile(user.uid, {
        displayName: formData.displayName,
        phone: formData.phone,
        bio: formData.bio,
        email: user.email || "",
      });

      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const imageUrl = await uploadToCloudinary(file);
      await updateUserProfile({ photoURL: imageUrl });
      toast.success("Profile photo updated successfully");
    } catch (error) {
      console.error("Error uploading photo:", error);
      toast.error("Failed to update profile photo");
    } finally {
      setIsUploading(false);
    }
  };

  const handleNotificationToggle = async (
    settingId: keyof typeof notificationSettings
  ) => {
    if (!user?.uid) return;

    const newSettings = {
      ...notificationSettings,
      [settingId]: !notificationSettings[settingId],
    };

    try {
      await updateFirestoreProfile(user.uid, {
        notificationPreferences: newSettings,
      });
      setNotificationSettings(newSettings);
      toast.success("Notification settings updated");
    } catch (error) {
      console.error("Error updating notification settings:", error);
      toast.error("Failed to update notification settings");
    }
  };

  const tabContent = {
    general: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            General Information
          </h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        <form onSubmit={handleUpdateProfile}>
          <div className="mb-8">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <img
                src={
                  user?.photoURL ||
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=" +
                    user?.email
                }
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-2 border-primary"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="absolute bottom-0 right-0 p-2 bg-primary rounded-full text-white hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isUploading ? (
                  <ArrowPathIcon className="w-4 h-4 animate-spin" />
                ) : (
                  <CameraIcon className="w-4 h-4" />
                )}
              </button>
            </div>
            {isUploading && (
              <p className="text-center text-sm text-white/70">
                Uploading photo...
              </p>
            )}
          </div>

          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-white/70 text-sm">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    type="text"
                    value={formData.displayName}
                    onChange={(e) =>
                      setFormData({ ...formData, displayName: e.target.value })
                    }
                    disabled={!isEditing}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-white/70 text-sm">Email</label>
                <div className="relative">
                  <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white/50 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-white/70 text-sm">Phone</label>
                <div className="relative">
                  <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    disabled={!isEditing}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                    placeholder="+1 (234) 567-8900"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white/70 text-sm">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                disabled={!isEditing}
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-primary transition-colors disabled:opacity-50 resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>

            {isEditing && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                //@ts-expect-error
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-white py-2.5 rounded-lg transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <ArrowPathIcon className="w-5 h-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Save Changes"
                )}
              </motion.button>
            )}
          </div>
        </form>
      </motion.div>
    ),
    security: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <h2 className="text-xl font-semibold text-white mb-6">
          Security Settings
        </h2>
        <div className="space-y-6">
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <h3 className="text-white font-medium mb-2">Change Password</h3>
            <p className="text-white/70 text-sm mb-4">
              Ensure your account is using a long, random password to stay
              secure.
            </p>
            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
            >
              Update Password
            </button>
          </div>
        </div>
      </motion.div>
    ),
    notifications: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <h2 className="text-xl font-semibold text-white mb-6">
          Notification Preferences
        </h2>
        <div className="space-y-4">
          {NOTIFICATION_SETTINGS.map((setting) => (
            <div
              key={setting.id}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <div>
                <h3 className="text-white font-medium">{setting.title}</h3>
                <p className="text-white/70 text-sm">{setting.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notificationSettings[setting.id]}
                  onChange={() => handleNotificationToggle(setting.id)}
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          ))}
        </div>
      </motion.div>
    ),
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            //@ts-expect-error
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <div className="flex flex-wrap gap-4 mb-8 border-b border-white/10 pb-4">
              {(["general", "security", "notifications"] as const).map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors capitalize ${
                      activeTab === tab
                        ? "bg-primary text-white"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {tab === "general" && <UserIcon className="w-5 h-5" />}
                    {tab === "security" && <KeyIcon className="w-5 h-5" />}
                    {tab === "notifications" && (
                      <BellIcon className="w-5 h-5" />
                    )}
                    {tab}
                  </button>
                )
              )}
            </div>

            <AnimatePresence mode="wait">
              {tabContent[activeTab]}
            </AnimatePresence>
          </motion.div>
        </div>
        <ChangePasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
        />
      </main>
    </ProtectedRoute>
  );
}
