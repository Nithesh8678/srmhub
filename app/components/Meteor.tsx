"use client";

import { useEffect, useState } from "react";
import { cn } from "@/app/utils/cn";

export const Meteors = ({ number = 20 }: { number?: number }) => {
  const [meteorStyles, setMeteorStyles] = useState<
    Array<{ top: string; left: string; delay: string }>
  >([]);

  useEffect(() => {
    const styles = [...Array(number)].map(() => ({
      top: Math.floor(Math.random() * 100) + "%",
      left: Math.floor(Math.random() * 100) + "%",
      delay: Math.floor(Math.random() * 2000) + "ms",
    }));
    setMeteorStyles(styles);
  }, [number]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          className={cn(
            "absolute h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent"
          )}
          style={{
            top: style.top,
            left: style.left,
            animationDelay: style.delay,
          }}
        />
      ))}
    </div>
  );
};
