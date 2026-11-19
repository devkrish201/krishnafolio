"use client";

import React, { useEffect, useRef, useState } from "react";

export function SakugaCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ghost1Ref = useRef<HTMLDivElement>(null);
  const ghost2Ref = useRef<HTMLDivElement>(null);
  const ghost3Ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let mouseX = -100;
    let mouseY = -100;
    let lastX = -100;
    let rotation = 0;
    let isHovering = false;

    // Trail positions for Dandadan turbo spirit streak
    let t1X = -100, t1Y = -100;
    let t2X = -100, t2Y = -100;
    let t3X = -100, t3Y = -100;

    let rafId: number;

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;

      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!document.body.classList.contains("has-dandadan-cursor")) {
        document.body.classList.add("has-dandadan-cursor");
        setEnabled(true);
      }

      const target = e.target as HTMLElement | null;
      isHovering = Boolean(
        target?.closest(
          "a, button, sakuga-button, sakuga-toggle, sakuga-slider, sakuga-checkbox, sakuga-radio, input, select, textarea, .pill, [role='button']"
        )
      );

      const dx = mouseX - lastX;
      lastX = mouseX;
      rotation = Math.max(-28, Math.min(28, dx * 1.6));

      if (!rafId) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const animate = () => {
      // Smooth spring lag for Dandadan ghost trails
      t1X += (mouseX - t1X) * 0.45;
      t1Y += (mouseY - t1Y) * 0.45;

      t2X += (t1X - t2X) * 0.4;
      t2Y += (t1Y - t2Y) * 0.4;

      t3X += (t2X - t3X) * 0.35;
      t3Y += (t2Y - t3Y) * 0.35;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX - 20}px, ${mouseY - 20}px, 0) rotate(${rotation}deg) scale(${isHovering ? 1.4 : 1})`;
        cursorRef.current.classList.toggle("is-locked", isHovering);
      }

      if (ghost1Ref.current) {
        ghost1Ref.current.style.transform = `translate3d(${t1X - 8}px, ${t1Y - 8}px, 0)`;
      }
      if (ghost2Ref.current) {
        ghost2Ref.current.style.transform = `translate3d(${t2X - 5}px, ${t2Y - 5}px, 0)`;
      }
      if (ghost3Ref.current) {
        ghost3Ref.current.style.transform = `translate3d(${t3X - 3}px, ${t3Y - 3}px, 0)`;
      }

      // Keep animating if trail hasn't caught up
      const dist = Math.abs(mouseX - t3X) + Math.abs(mouseY - t3Y);
      if (dist > 0.5) {
        rafId = requestAnimationFrame(animate);
      } else {
        rafId = 0;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;

      if (cursorRef.current) {
        cursorRef.current.classList.add("is-charging");
      }

      // 1. Native SakugaFX Canvas explosion
      const fx = (window as any).SakugaFX;
      if (fx) {
        if (typeof fx.ticks === "function") {
          fx.ticks(e.pageX, e.pageY, { n: 7, r: 14, len: 20, life: 0.42, fan: 0.6 });
        }
        if (typeof fx.burst === "function") {
          fx.burst(e.pageX, e.pageY, { r: 45, spikes: 12, life: 0.35 });
        }
      }

      // 2. Dandadan Psychic Blast Ring
      const burst = document.createElement("div");
      burst.className = "dandadan-blast";
      burst.style.left = `${e.clientX}px`;
      burst.style.top = `${e.clientY}px`;
      document.body.appendChild(burst);
      setTimeout(() => burst.remove(), 450);
    };

    const onPointerUp = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove("is-charging");
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.body.classList.remove("has-dandadan-cursor");
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Dandadan Turbo Ghost Streak Trails */}
      <div
        ref={ghost3Ref}
        className="dandadan-ghost dandadan-ghost-3"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "7px",
          height: "7px",
          borderRadius: "50%",
          background: "var(--sk-acc)",
          opacity: enabled ? 0.3 : 0,
          pointerEvents: "none",
          zIndex: 2147483645,
          boxShadow: "0 0 6px var(--sk-acc)",
          willChange: "transform",
        }}
      />
      <div
        ref={ghost2Ref}
        className="dandadan-ghost dandadan-ghost-2"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "11px",
          height: "11px",
          borderRadius: "50%",
          background: "var(--sk-pri)",
          opacity: enabled ? 0.55 : 0,
          pointerEvents: "none",
          zIndex: 2147483646,
          boxShadow: "0 0 8px var(--sk-pri)",
          willChange: "transform",
        }}
      />
      <div
        ref={ghost1Ref}
        className="dandadan-ghost dandadan-ghost-1"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          background: "var(--sk-acc)",
          opacity: enabled ? 0.75 : 0,
          pointerEvents: "none",
          zIndex: 2147483646,
          boxShadow: "0 0 10px var(--sk-acc)",
          willChange: "transform",
        }}
      />

      {/* Main Dandadan Occult Spirit Crosshair Cursor with Rapid Circling Animation on Clickable */}
      <div
        ref={cursorRef}
        id="dandadan-cursor"
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "40px",
          height: "40px",
          pointerEvents: "none",
          zIndex: 2147483647,
          willChange: "transform",
          opacity: enabled ? 1 : 0,
          transition: "opacity 0.2s ease, transform 0.04s ease-out",
        }}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            overflow: "visible",
            filter: "drop-shadow(0 2px 8px rgba(29, 26, 74, 0.55))",
          }}
        >
          {/* Round Circling Targeting Orbit that spins rapidly when hovering clickable targets */}
          <g className="cursor-circling-group">
            <circle
              cx="20"
              cy="20"
              r="17"
              stroke="#ff5fa8"
              strokeWidth="2.4"
              strokeDasharray="8 6"
              fill="none"
            />
            {/* 4 Orbit Satellite Points to make circling rotation very distinct */}
            <circle cx="20" cy="3" r="2" fill="#ff5fa8" />
            <circle cx="37" cy="20" r="2" fill="#8f8df7" />
            <circle cx="20" cy="37" r="2" fill="#ff5fa8" />
            <circle cx="3" cy="20" r="2" fill="#8f8df7" />
          </g>

          {/* Inner Occult Targeting Ring */}
          <circle
            cx="20"
            cy="20"
            r="12"
            stroke="#1d1a4a"
            strokeWidth="1.8"
            strokeDasharray="4 3"
          />

          {/* 4 Sharp Dandadan Spirit Blades / Star Horns */}
          <path
            d="M 20 2 L 23.5 13 L 38 20 L 23.5 27 L 20 38 L 16.5 27 L 2 20 L 16.5 13 Z"
            fill="#ff5fa8"
            stroke="#1d1a4a"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />

          {/* Inner Psychic Core */}
          <circle
            cx="20"
            cy="20"
            r="7"
            fill="#8f8df7"
            stroke="#1d1a4a"
            strokeWidth="2"
          />

          {/* Central Pupil Highlight Glint */}
          <circle cx="20" cy="20" r="3" fill="#ffffff" stroke="#1d1a4a" strokeWidth="1.2" />

          {/* Diagonal Occult Accent Radians */}
          <line x1="9" y1="9" x2="12" y2="12" stroke="#ff5fa8" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="31" y1="9" x2="28" y2="12" stroke="#ff5fa8" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="9" y1="31" x2="12" y2="28" stroke="#ff5fa8" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="31" y1="31" x2="28" y2="28" stroke="#ff5fa8" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </div>
    </>
  );
}
