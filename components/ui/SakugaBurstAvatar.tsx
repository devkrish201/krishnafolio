"use client";

import React, { useState } from "react";

interface SakugaBurstAvatarProps {
  imageSrc?: string;
  onToast?: (msg: string) => void;
  size?: number;
}

export function SakugaBurstAvatar({
  imageSrc = "/krishna-cutout.png",
  onToast,
  size = 540,
}: SakugaBurstAvatarProps) {
  const [useGojo, setUseGojo] = useState(false);
  const [blossomTheme, setBlossomTheme] = useState<"yellow" | "lilac" | "white">("yellow");

  const toggleAvatarMode = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !useGojo;
    setUseGojo(nextState);
    if (onToast) {
      onToast(
        nextState
          ? "Switched to Gojo Sakuga Anime Mode! ドン!"
          : "Switched to Natural Cutout Avatar!"
      );
    }

    const fx = (window as any).SakugaFX;
    if (fx && typeof fx.burst === "function") {
      fx.burst(e.pageX, e.pageY, { r: 100, spikes: 18, life: 0.52 });
    }
    if (fx && typeof fx.ticks === "function") {
      fx.ticks(e.pageX, e.pageY, { n: 8, r: 24, len: 24, life: 0.45 });
    }
  };

  const cycleTheme = (e: React.MouseEvent) => {
    e.stopPropagation();
    const themes: ("yellow" | "lilac" | "white")[] = ["yellow", "lilac", "white"];
    const nextIdx = (themes.indexOf(blossomTheme) + 1) % themes.length;
    const nextTheme = themes[nextIdx];
    setBlossomTheme(nextTheme);

    const labels = {
      yellow: "Sunny Sunflower Motif",
      lilac: "Sakura Lilac Motif",
      white: "Clean Ink Motif",
    };
    if (onToast) onToast(`Theme changed: ${labels[nextTheme]}`);

    const fx = (window as any).SakugaFX;
    if (fx && typeof fx.ticks === "function") {
      fx.ticks(e.pageX, e.pageY, { n: 6, r: 18, len: 18, life: 0.4 });
    }
  };

  const currentImage = useGojo ? "/krishna-gojo-cutout.png" : imageSrc;

  // Background color fills matching Tanuja's portfolio reference or Sakuga lilac/card
  const fillColor =
    blossomTheme === "yellow"
      ? "#ffd23f" // Warm sunny yellow
      : blossomTheme === "lilac"
      ? "var(--sk-soft)" // Soft pastel lilac
      : "var(--sk-card)"; // Pure clean card (adapts to light and dark themes)

  return (
    <div
      className="sakuga-burst-container"
      style={{
        position: "relative",
        width: "100%",
        maxWidth: `${size}px`,
        aspectRatio: "1 / 1.14",
        margin: "0 auto",
        userSelect: "none",
        display: "grid",
        placeItems: "center",
      }}
    >
      {/* Background Halftone Dot Grid Frame */}
      <div
        className="sakuga-halftone-grid"
        style={{
          position: "absolute",
          inset: "-16px",
          backgroundImage: "radial-gradient(var(--line) 2px, transparent 2px)",
          backgroundSize: "22px 22px",
          borderRadius: "36px",
          zIndex: 0,
          opacity: 0.85,
          pointerEvents: "none",
        }}
      />

      {/* SVG Scalloped Blossom Motif & Circular Rotating Typography */}
      <svg
        viewBox="0 0 500 500"
        className="sakuga-burst-svg"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 1,
          overflow: "visible",
        }}
        aria-hidden="true"
      >
        <defs>
          {/* Circular Path for Rotating Perimeter Typography (R = 222) */}
          <path
            id="avatarCirclePath500"
            d="M 250, 250 m -222, 0 a 222,222 0 1,1 444,0 a 222,222 0 1,1 -444,0"
          />

          {/* Sakuga Flat Lilac Offset Shadow */}
          <filter id="sakugaShadowXLarge" x="-25%" y="-25%" width="160%" height="160%">
            <feDropShadow dx="8" dy="9" stdDeviation="0" floodColor="#b8b3ff" />
          </filter>
        </defs>

        {/* 8-Lobed Organic Scalloped Blossom Backdrop (Matching Tanuja's Portfolio Layout) */}
        <g filter="url(#sakugaShadowXLarge)">
          <path
            d="M 250 48
               C 285 48, 310 92, 335 102
               C 365 112, 412 96, 432 126
               C 452 156, 432 204, 446 234
               C 460 264, 452 312, 426 338
               C 400 364, 362 352, 336 378
               C 310 404, 285 448, 250 448
               C 215 448, 190 404, 164 378
               C 138 352, 100 364, 74 338
               C 48 312, 40 264, 54 234
               C 68 204, 48 156, 68 126
               C 88 96, 135 112, 165 102
               C 190 92, 215 48, 250 48 Z"
            fill={fillColor}
            stroke="#1d1a4a"
            strokeWidth="4"
            strokeLinejoin="round"
            style={{
              transition: "fill 0.35s ease",
            }}
          />

          {/* Inner Dashed Accent Ring */}
          <circle
            cx="250"
            cy="250"
            r="160"
            fill="none"
            stroke={blossomTheme === "yellow" ? "rgba(29, 26, 74, 0.22)" : "#b8b3ff"}
            strokeWidth="2.5"
            strokeDasharray="8 6"
          />
        </g>

        {/* Continuous Curved Running Typography (Matching Tanuja's Perimeter Text) */}
        <text
          className="rotating-text-path"
          fill="#1d1a4a"
          style={{
            fontFamily: "var(--font-heading), 'Avenir Next', -apple-system, sans-serif",
            fontSize: "12.8px",
            fontWeight: 800,
            letterSpacing: "4px",
            textTransform: "uppercase",
          }}
        >
          <textPath href="#avatarCirclePath500" startOffset="0%">
            Craft · Eat · Create · Explore · Code · Chill · Repeat · Craft · Eat · Create · Explore · Code · Chill · Repeat ·
          </textPath>
        </text>

        {/* Anime Spiky Kinetic Energy Accents */}
        <g stroke="#ff5fa8" strokeWidth="3" strokeLinecap="round">
          <line x1="432" y1="104" x2="462" y2="76" />
          <line x1="448" y1="126" x2="480" y2="112" />
          <line x1="68" y1="392" x2="38" y2="422" />
          <line x1="88" y1="412" x2="60" y2="446" />
        </g>

        {/* Manga SFX Stamps */}
        <text x="36" y="68" fill="#8580b0" fontSize="15" fontWeight="800" fontStyle="italic">ドドド</text>
        <text x="430" y="440" fill="#ff5fa8" fontSize="15" fontWeight="800" fontStyle="italic">ドン!</text>
      </svg>

      {/* Confident Cutout Avatar (Breaking out of the scallop shape at the top) */}
      <div
        className="avatar-cutout-wrapper"
        onClick={toggleAvatarMode}
        style={{
          position: "relative",
          zIndex: 2,
          width: "90%",
          height: "98%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          overflow: "visible",
          cursor: "pointer",
        }}
        title="Click photo to toggle between Natural Cutout and Gojo Anime Mode!"
      >
        <img
          src={currentImage}
          alt={useGojo ? "Krishna Sahoo - Gojo Anime Mode" : "Krishna Sahoo - Natural Cutout"}
          className="avatar-cutout-img"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "bottom center",
            filter: "drop-shadow(0 16px 32px rgba(29, 26, 74, 0.22))",
            transition: "transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />

        {/* Floating Confident Mode Badge */}
        <div
          style={{
            position: "absolute",
            bottom: "8px",
            background: useGojo ? "var(--sk-pri)" : "var(--sk-ink)",
            color: "#ffffff",
            fontSize: "12px",
            fontWeight: 800,
            padding: "6px 16px",
            borderRadius: "999px",
            boxShadow: "3px 3px 0 var(--sk-soft)",
            border: "2px solid #ffffff",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            zIndex: 3,
            cursor: "pointer",
          }}
          onClick={toggleAvatarMode}
        >
          <span style={{ fontSize: "11px" }}>{useGojo ? "⚡" : "✨"}</span>
          <span>{useGojo ? "Gojo Anime Mode" : "Natural Cutout"}</span>
          <span style={{ opacity: 0.7, fontSize: "10px", marginLeft: "4px" }}>[Click to swap]</span>
        </div>
      </div>

      {/* Mini Color Theme Switcher Pill (Top Right) */}
      <button
        type="button"
        onClick={cycleTheme}
        className="pill"
        style={{
          position: "absolute",
          top: "-12px",
          right: "6px",
          zIndex: 5,
          background: "var(--sk-card)",
          border: "2px solid var(--sk-ink)",
          boxShadow: "2px 2px 0 var(--sk-soft)",
          padding: "4px 10px",
          fontSize: "11px",
          fontWeight: 800,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
        title="Cycle Blossom Background Theme"
      >
        <span
          style={{
            display: "inline-block",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: fillColor,
            border: "1px solid var(--sk-ink)",
          }}
        />
        <span>Color Theme</span>
      </button>
    </div>
  );
}
