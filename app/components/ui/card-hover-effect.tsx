"use client";

import { cn } from "@/app/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    image: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-10 gap-4",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item.link}
          key={item.link}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                style={{
                  position: "absolute",
                  inset: 0,
                  height: "100%",
                  width: "100%",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  borderRadius: "1.5rem",
                }}
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <div
            className={cn(
              "rounded-2xl h-full w-full p-4 overflow-hidden bg-gradient-to-br from-neutral-900/90 to-neutral-900/50 backdrop-blur-sm border border-neutral-800 relative z-10 transition-all duration-500",
              hoveredIndex === idx && "border-neutral-700"
            )}
          >
            <div className="relative z-10">
              <div
                className="h-40 w-full rounded-xl mb-4 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="p-4">
                <h4 className="text-zinc-100 font-bold tracking-wide mb-2">
                  {item.title}
                </h4>
                <p className="text-neutral-300 text-sm line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
