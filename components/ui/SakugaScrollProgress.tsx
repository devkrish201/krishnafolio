"use client";

import { useEffect, useState } from "react";

export function SakugaScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "3.5px",
        zIndex: 999999,
        pointerEvents: "none",
        background: "transparent",
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          background: "linear-gradient(90deg, var(--sk-pri), var(--sk-acc))",
          boxShadow: "0 0 8px var(--sk-acc)",
          transition: "width 0.08s ease-out",
          position: "relative",
        }}
      >
        {progress > 0 && (
          <div
            style={{
              position: "absolute",
              right: "-4px",
              top: "-2.5px",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#ffffff",
              border: "1.5px solid var(--sk-ink)",
              boxShadow: "0 0 6px var(--sk-acc)",
            }}
          />
        )}
      </div>
    </div>
  );
}

