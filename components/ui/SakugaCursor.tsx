"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSakugaTheme } from "@/components/ui/SakugaThemeContext";

export function SakugaCursor() {
  const { currentMeta } = useSakugaTheme();
  const { family, palette } = currentMeta;
  const { pri, acc, soft, ink } = palette;

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

    // Trail positions for kinetic spirit streak
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
      // Smooth spring lag for theme ghost trails
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

      // 2. Kinetic Theme Psychic Blast Ring
      const burst = document.createElement("div");
      burst.className = "dandadan-blast";
      burst.style.left = `${e.clientX}px`;
      burst.style.top = `${e.clientY}px`;
      burst.style.borderColor = acc;
      burst.style.boxShadow = `0 0 16px ${acc}, inset 0 0 8px ${pri}`;
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
  }, [acc, pri]);

  // Renders a distinct kinetic vector geometry pattern for each theme family
  const renderCursorPattern = () => {
    switch (family) {
      // 1. SUNFLOWER: 8-Lobed Solar Blossom & Revolving Golden Seed Orbit
      case "sunflower":
        return (
          <>
            <g className="cursor-circling-group">
              {/* Scalloped Floral Orbit Ring */}
              <path
                d="M 20 3 C 24 3, 26 7, 30 5 C 33 8, 37 7, 37 12 C 39 16, 37 20, 37 24 C 35 29, 32 30, 30 35 C 26 33, 24 37, 20 37 C 16 37, 14 33, 10 35 C 8 30, 5 29, 3 24 C 3 20, 1 16, 3 12 C 3 7, 7 8, 10 5 C 14 7, 16 3, 20 3 Z"
                stroke={pri}
                strokeWidth="2.2"
                fill="none"
                strokeDasharray="6 4"
              />
              {/* 6 Revolving Golden Pollen Seeds */}
              <circle cx="20" cy="3" r="2.2" fill={acc} />
              <circle cx="34" cy="11" r="2.2" fill={pri} />
              <circle cx="37" cy="25" r="2.2" fill={acc} />
              <circle cx="26" cy="36" r="2.2" fill={pri} />
              <circle cx="10" cy="33" r="2.2" fill={acc} />
              <circle cx="3" cy="18" r="2.2" fill={pri} />
            </g>

            {/* Inner Ring */}
            <circle cx="20" cy="20" r="11" stroke={ink} strokeWidth="1.8" strokeDasharray="3 3" />

            {/* 8-Petal Blossom Star Silhouette */}
            <path
              d="M 20 5 L 23 13 L 31 9 L 27 17 L 35 20 L 27 23 L 31 31 L 23 27 L 20 35 L 17 27 L 9 31 L 13 23 L 5 20 L 13 17 L 9 9 L 17 13 Z"
              fill={pri}
              stroke={ink}
              strokeWidth="2.2"
              strokeLinejoin="round"
            />

            {/* Central Coral Pollen Core */}
            <circle cx="20" cy="20" r="6.5" fill={acc} stroke={ink} strokeWidth="1.8" />
            <circle cx="20" cy="20" r="2.8" fill="#ffffff" />

            {/* 4 Diagonal Solar Flares */}
            <line x1="8" y1="8" x2="11" y2="11" stroke={acc} strokeWidth="2.2" strokeLinecap="round" />
            <line x1="32" y1="8" x2="29" y2="11" stroke={acc} strokeWidth="2.2" strokeLinecap="round" />
            <line x1="8" y1="32" x2="11" y2="29" stroke={acc} strokeWidth="2.2" strokeLinecap="round" />
            <line x1="32" y1="32" x2="29" y2="29" stroke={acc} strokeWidth="2.2" strokeLinecap="round" />
          </>
        );

      // 2. CYBER: Precision HUD Crosshair with [ ] Locking Brackets & Laser Reticle
      case "cyber":
        return (
          <>
            <g className="cursor-circling-group">
              {/* Radar Sweep Circle */}
              <circle cx="20" cy="20" r="17" stroke={pri} strokeWidth="1.8" strokeDasharray="4 8" fill="none" />
              {/* 4 Corner Locking Brackets [  ] */}
              <path d="M 6 12 V 6 H 12" stroke={pri} strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 28 6 H 34 V 12" stroke={pri} strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 34 28 V 34 H 28" stroke={pri} strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 12 34 H 6 V 28" stroke={pri} strokeWidth="2.5" strokeLinecap="round" />
            </g>

            {/* Geometric Diamond Crosshair Blades */}
            <polygon points="20,4 27,20 20,36 13,20" fill={pri} stroke={ink} strokeWidth="2" />
            <polygon points="4,20 20,27 36,20 20,13" fill={pri} stroke={ink} strokeWidth="2" />

            {/* Laser Optic Center Reticle */}
            <circle cx="20" cy="20" r="5.5" fill={acc} stroke={ink} strokeWidth="1.8" />
            <circle cx="20" cy="20" r="2.2" fill="#ffffff" />

            {/* Crosshair Hairlines */}
            <line x1="20" y1="9" x2="20" y2="14" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
            <line x1="20" y1="26" x2="20" y2="31" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
            <line x1="9" y1="20" x2="14" y2="20" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
            <line x1="26" y1="20" x2="31" y2="20" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
          </>
        );

      // 3. EVA: Evangelion Unit-01 A.T. Field Hexagon Barrier & Berserk Chevrons
      case "eva":
        return (
          <>
            <g className="cursor-circling-group">
              {/* Outer Hexagon A.T. Barrier */}
              <polygon
                points="20,3 34,11 34,29 20,37 6,29 6,11"
                stroke={pri}
                strokeWidth="2.2"
                fill="none"
                strokeDasharray="5 4"
              />
              {/* 6 A.T. Sync Nodes */}
              <circle cx="20" cy="3" r="2.2" fill={acc} />
              <circle cx="34" cy="11" r="2.2" fill={pri} />
              <circle cx="34" cy="29" r="2.2" fill={acc} />
              <circle cx="20" cy="37" r="2.2" fill={pri} />
              <circle cx="6" cy="29" r="2.2" fill={acc} />
              <circle cx="6" cy="11" r="2.2" fill={pri} />
            </g>

            {/* Inner Hexagonal Shield Ring */}
            <polygon points="20,8 30,14 30,26 20,32 10,26 10,14" stroke={ink} strokeWidth="1.8" fill="none" />

            {/* 4 Sharp Mecha Berserk Chevrons */}
            <path
              d="M 20 2 L 24 12 L 38 20 L 24 28 L 20 38 L 16 28 L 2 20 L 16 12 Z"
              fill={pri}
              stroke={ink}
              strokeWidth="2.2"
              strokeLinejoin="round"
            />

            {/* Sync Core with Warning Hazard Triangle */}
            <circle cx="20" cy="20" r="6.5" fill={soft} stroke={ink} strokeWidth="1.8" />
            <polygon points="20,16 24,23 16,23" fill={acc} stroke={ink} strokeWidth="1" />
          </>
        );

      // 4. CRIMSON: Nichirin Katana Tsuba & Blood Moon Shuriken Pinwheel
      case "crimson":
        return (
          <>
            <g className="cursor-circling-group">
              {/* 4 Dynamic Sweeping Slash Arc Curves */}
              <path
                d="M 20 3 A 17 17 0 0 1 37 20 M 37 20 A 17 17 0 0 1 20 37 M 20 37 A 17 17 0 0 1 3 20 M 3 20 A 17 17 0 0 1 20 3"
                stroke={acc}
                strokeWidth="2.4"
                strokeDasharray="9 7"
                fill="none"
              />
              {/* Revolving Crimson Ember Sparks */}
              <circle cx="20" cy="3" r="2.2" fill={pri} />
              <circle cx="37" cy="20" r="2.2" fill={acc} />
              <circle cx="20" cy="37" r="2.2" fill={pri} />
              <circle cx="3" cy="20" r="2.2" fill={acc} />
            </g>

            {/* 4-Bladed Aerodynamic Katana Pinwheel */}
            <path
              d="M 20 3 C 24 10, 30 14, 37 20 C 30 24, 26 30, 20 37 C 16 30, 10 26, 3 20 C 10 16, 14 10, 20 3 Z"
              fill={pri}
              stroke={ink}
              strokeWidth="2.2"
              strokeLinejoin="round"
            />

            {/* Inner Blood Moon Blade Eye */}
            <circle cx="20" cy="20" r="6.5" fill={acc} stroke={ink} strokeWidth="2" />
            <path d="M 20 15 Q 23 20 20 25 Q 17 20 20 15 Z" fill="#ffffff" />

            {/* 4 Katana Slash Marks */}
            <line x1="7" y1="7" x2="11" y2="11" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
            <line x1="33" y1="7" x2="29" y2="11" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
            <line x1="7" y1="33" x2="11" y2="29" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
            <line x1="33" y1="33" x2="29" y2="29" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
          </>
        );

      // 5. DEFAULT / SAKURA: Dandadan Occult Spirit Blade & Gojo Void Orbit
      case "sakura":
      default:
        return (
          <>
            {/* Round Circling Targeting Orbit that spins rapidly when hovering clickable targets */}
            <g className="cursor-circling-group">
              <circle
                cx="20"
                cy="20"
                r="17"
                stroke={acc}
                strokeWidth="2.4"
                strokeDasharray="8 6"
                fill="none"
              />
              {/* 4 Orbit Satellite Points */}
              <circle cx="20" cy="3" r="2.2" fill={acc} />
              <circle cx="37" cy="20" r="2.2" fill={pri} />
              <circle cx="20" cy="37" r="2.2" fill={acc} />
              <circle cx="3" cy="20" r="2.2" fill={pri} />
            </g>

            {/* Inner Occult Targeting Ring */}
            <circle
              cx="20"
              cy="20"
              r="12"
              stroke={ink}
              strokeWidth="1.8"
              strokeDasharray="4 3"
            />

            {/* 4 Sharp Dandadan Spirit Blades / Star Horns */}
            <path
              d="M 20 2 L 23.5 13 L 38 20 L 23.5 27 L 20 38 L 16.5 27 L 2 20 L 16.5 13 Z"
              fill={acc}
              stroke={ink}
              strokeWidth="2.2"
              strokeLinejoin="round"
            />

            {/* Inner Psychic Core */}
            <circle
              cx="20"
              cy="20"
              r="7"
              fill={pri}
              stroke={ink}
              strokeWidth="2"
            />

            {/* Central Pupil Highlight Glint */}
            <circle cx="20" cy="20" r="3" fill="#ffffff" stroke={ink} strokeWidth="1.2" />

            {/* Diagonal Occult Accent Radians */}
            <line x1="9" y1="9" x2="12" y2="12" stroke={acc} strokeWidth="2.2" strokeLinecap="round" />
            <line x1="31" y1="9" x2="28" y2="12" stroke={acc} strokeWidth="2.2" strokeLinecap="round" />
            <line x1="9" y1="31" x2="12" y2="28" stroke={acc} strokeWidth="2.2" strokeLinecap="round" />
            <line x1="31" y1="31" x2="28" y2="28" stroke={acc} strokeWidth="2.2" strokeLinecap="round" />
          </>
        );
    }
  };

  return (
    <>
      {/* Theme Ghost Streak Trails */}
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
          background: acc,
          opacity: enabled ? 0.3 : 0,
          pointerEvents: "none",
          zIndex: 2147483645,
          boxShadow: `0 0 6px ${acc}`,
          willChange: "transform",
          transition: "background 0.25s ease, box-shadow 0.25s ease",
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
          background: pri,
          opacity: enabled ? 0.55 : 0,
          pointerEvents: "none",
          zIndex: 2147483646,
          boxShadow: `0 0 8px ${pri}`,
          willChange: "transform",
          transition: "background 0.25s ease, box-shadow 0.25s ease",
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
          background: acc,
          opacity: enabled ? 0.75 : 0,
          pointerEvents: "none",
          zIndex: 2147483646,
          boxShadow: `0 0 10px ${acc}`,
          willChange: "transform",
          transition: "background 0.25s ease, box-shadow 0.25s ease",
        }}
      />

      {/* Main Kinetic Theme Crosshair Cursor */}
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
            filter: `drop-shadow(0 2px 8px ${soft})`,
            transition: "filter 0.25s ease",
          }}
        >
          {renderCursorPattern()}
        </svg>
      </div>
    </>
  );
}
