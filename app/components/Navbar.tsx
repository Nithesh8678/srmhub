"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const ADMIN_EMAILS = ["admin@srm.edu.in", "nitheshnithesh56@gmail.com"];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsScrolled(currentScrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleDashboardClick = () => {
    if (user && ADMIN_EMAILS.includes(user.email || "")) {
      router.push("/admin/dashboard");
    } else {
      router.push("/dashboard");
    }
    setIsDropdownOpen(false);
  };

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-5xl z-50">
      <div
        className={`rounded-full ${
          isScrolled ? "bg-black/80" : "bg-black/50"
        } backdrop-blur-md shadow-lg transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <span className="text-white text-xl font-bold">LOGO</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/events"
                className="text-white hover:text-primary transition-colors"
              >
                Events
              </Link>
              <Link
                href="/notices"
                className="text-white hover:text-primary transition-colors"
              >
                Notices
              </Link>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full transition-colors flex items-center gap-2"
                  >
                    <UserIcon className="h-5 w-5" />
                    <span>
                      {ADMIN_EMAILS.includes(user.email || "")
                        ? "Admin"
                        : user.displayName || "Dashboard"}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        //@ts-expect-error
                        className="absolute right-0 mt-2 w-48 py-2 bg-black/90 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl"
                      >
                        <button
                          onClick={handleDashboardClick}
                          className="w-full text-left px-4 py-2 text-white hover:bg-white/10 transition-colors"
                        >
                          {ADMIN_EMAILS.includes(user.email || "")
                            ? "Admin Dashboard"
                            : "Dashboard"}
                        </button>
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-white hover:bg-white/10 transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={() => router.push("/login")}
                  className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full transition-colors flex items-center gap-2"
                >
                  <UserIcon className="h-5 w-5" />
                  <span>Login</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                className="text-white p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <div
            className={`md:hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen
                ? "max-h-64 opacity-100 pb-4"
                : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            <div className="flex flex-col space-y-4 px-2">
              <Link
                href="/events"
                className="text-white hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Events
              </Link>
              <Link
                href="/notices"
                className="text-white hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Notices
              </Link>
              {user ? (
                <>
                  <button
                    onClick={() => {
                      handleDashboardClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-white hover:text-primary transition-colors py-2 text-left"
                  >
                    {ADMIN_EMAILS.includes(user.email || "")
                      ? "Admin Dashboard"
                      : "Dashboard"}
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-red-400 hover:text-red-300 transition-colors py-2 text-left"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    router.push("/login");
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full transition-colors flex items-center gap-2 justify-center"
                >
                  <UserIcon className="h-5 w-5" />
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
