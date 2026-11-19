"use client";

import React, { useState } from "react";

interface SakugaMascotProps {
  onToast: (msg: string) => void;
}

export function SakugaMascot({ onToast }: SakugaMascotProps) {
  const [fedCount, setFedCount] = useState(0);
  const [isWiggling, setIsWiggling] = useState(false);
  const [speech, setSpeech] = useState("Ready to craft kinetic UI!");

  const responses = [
    "Nom nom! That was clean TypeScript!",
    "Crunch! Delicious spring haptics!",
    "Slurp! Pure neo-manga aesthetics!",
    "Powering up! Ready to ship production code!",
    "Zoom! Zero-dependency Web Components!",
    "Kira! Design tokens aligned perfectly!",
  ];

  const handleFeed = (e: React.MouseEvent) => {
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 550);

    const nextCount = fedCount + 1;
    setFedCount(nextCount);
    const quote = responses[nextCount % responses.length];
    setSpeech(quote);
    onToast(`Sakuga Spark: "${quote}"`);

    // Fire Sakuga canvas puff & ticks
    const fx = (window as any).SakugaFX;
    if (fx) {
      if (typeof fx.puff === "function") {
        fx.puff(e.pageX, e.pageY, { n: 6, size: 18, life: 0.65 });
      }
      if (typeof fx.ticks === "function") {
        fx.ticks(e.pageX, e.pageY, { n: 5, r: 16, len: 20, life: 0.45 });
      }
      if (typeof fx.burst === "function") {
        fx.burst(e.pageX, e.pageY, { r: 35, spikes: 10, life: 0.35 });
      }
    }
  };

  return (
    <div
      className="sakuga-mascot-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        width: "100%",
        padding: "16px 10px",
        position: "relative",
      }}
    >
      {/* Dynamic Anime Speech Balloon */}
      <div
        className="mascot-speech-bubble"
        style={{
          background: "var(--sk-card)",
          border: "2.5px solid var(--sk-ink)",
          borderRadius: "16px",
          padding: "10px 18px",
          boxShadow: "3px 4px 0 var(--sk-soft)",
          fontSize: "13.5px",
          fontWeight: 700,
          color: "var(--sk-ink)",
          marginBottom: "18px",
          position: "relative",
          maxWidth: "300px",
          lineHeight: "1.4",
          animation: "sakuga-bubble-pop 0.3s ease-out",
        }}
      >
        <span>{speech}</span>
        {/* Balloon pointer tail */}
        <div
          style={{
            position: "absolute",
            bottom: "-8px",
            left: "50%",
            transform: "translateX(-50%) rotate(45deg)",
            width: "12px",
            height: "12px",
            background: "var(--sk-card)",
            borderRight: "2.5px solid var(--sk-ink)",
            borderBottom: "2.5px solid var(--sk-ink)",
          }}
        />
      </div>

      {/* Prominent Bolder Anime Cloud Mascot with Rich Aura */}
      <div
        className={`sakuga-mascot-cloud ${isWiggling ? "wiggling" : ""}`}
        style={{
          position: "relative",
          width: "clamp(300px, 34vw, 440px)",
          height: "clamp(240px, 26vw, 330px)",
          cursor: "pointer",
          filter: "drop-shadow(7px 9px 0 var(--sk-soft))",
          transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
        onClick={handleFeed}
        title="Click to interact with Sakuga Spark!"
      >
        <svg
          viewBox="0 0 340 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%", overflow: "visible" }}
        >
          {/* Outer Kinetic Speed Aura Trails */}
          <path
            d="M 36 115 C 10 78, 56 30, 118 35 C 160 10, 225 16, 255 58 C 306 65, 325 125, 296 174 C 316 224, 260 262, 212 248 C 166 265, 110 248, 80 220 C 32 226, 12 174, 36 115 Z"
            stroke="var(--sk-soft)"
            strokeWidth="2.4"
            strokeDasharray="7 6"
            fill="none"
          />

          {/* Floating Manga SFX Stamps */}
          <text x="20" y="44" fill="var(--mute)" fontSize="13" fontWeight="800" fontStyle="italic">シュッ</text>
          <text x="280" y="224" fill="var(--sk-acc)" fontSize="13" fontWeight="800" fontStyle="italic">カチッ</text>

          {/* Main Sakuga Cloud Body in Crisp White (Original Character Aesthetic) */}
          <path
            d="M 70 135 
               C 48 114, 62 72, 104 78 
               C 118 46, 172 38, 200 68 
               C 234 52, 276 74, 268 116 
               C 296 128, 296 176, 260 198 
               C 252 232, 204 238, 178 220 
               C 150 240, 104 230, 94 202 
               C 58 200, 48 160, 70 135 Z"
            fill="#ffffff"
            stroke="#1d1a4a"
            strokeWidth="3.8"
            strokeLinejoin="round"
          />

          {/* Solid 2-Tone Shading Plate (Lilac Shadow) */}
          <path
            d="M 94 202 
               C 104 230, 150 240, 178 220 
               C 204 238, 252 232, 260 198 
               C 225 212, 142 216, 94 202 Z"
            fill="#b8b3ff"
            stroke="#1d1a4a"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />

          {/* Big Anime Expressive Eyes */}
          <g fill="#1d1a4a">
            <ellipse cx="140" cy="132" rx="9.5" ry="12.5" />
            <ellipse cx="202" cy="132" rx="9.5" ry="12.5" />
            {/* Eye sparkle highlights */}
            <circle cx="137" cy="126" r="3.6" fill="#ffffff" />
            <circle cx="199" cy="126" r="3.6" fill="#ffffff" />
            <circle cx="143" cy="136" r="1.8" fill="#ffffff" />
            <circle cx="205" cy="136" r="1.8" fill="#ffffff" />
          </g>

          {/* Rosy Electric Pink Anime Blush Cheeks */}
          <ellipse cx="118" cy="150" rx="12" ry="8" fill="var(--sk-acc)" opacity="0.85" />
          <ellipse cx="224" cy="150" rx="12" ry="8" fill="var(--sk-acc)" opacity="0.85" />

          {/* Cute Confident Anime Smile */}
          <path
            d="M 160 150 Q 171 166 182 150"
            stroke="#1d1a4a"
            strokeWidth="3.8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Pinned Sakura Flower / Kira Star Hairpin Accessory (Top Right) */}
          <g transform="translate(242, 72) rotate(14)">
            {/* 5-Petal Anime Flower / Star */}
            <path
              d="M 0 -22 L 6 -6 L 22 0 L 6 6 L 0 22 L -6 6 L -22 0 L -6 -6 Z"
              fill="var(--sk-acc)"
              stroke="#1d1a4a"
              strokeWidth="2.6"
              strokeLinejoin="round"
            />
            <circle cx="0" cy="0" r="4.5" fill="#ffffff" stroke="#1d1a4a" strokeWidth="1.8" />
          </g>

          {/* Speed Wedge Accents */}
          <path d="M 42 90 L 26 84 L 40 78 Z" fill="var(--sk-acc)" />
          <path d="M 302 148 L 318 142 L 305 156 Z" fill="var(--sk-acc)" />
        </svg>
      </div>

      {/* Interactive Button Matching Reference: "Feed me code" */}
      <div style={{ marginTop: "20px" }}>
        <sakuga-button
          variant="secondary"
          onClick={handleFeed}
        >
          Feed me code ⚡
        </sakuga-button>
      </div>

      {/* Subtext Caption Matching Reference */}
      <p
        style={{
          marginTop: "14px",
          color: "var(--mute)",
          fontSize: "14.5px",
          maxWidth: "320px",
          lineHeight: "1.6",
          fontWeight: 600,
        }}
      >
        Turning thoughts into kinetic interfaces with code.
      </p>

      {/* Substantial Pill Tags to Anchor Hero Balance */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "16px",
          maxWidth: "360px",
        }}
      >
        <span className="project-badge" style={{ fontSize: "11px" }}>3.5+ Yrs Systems</span>
        <span className="project-badge" style={{ fontSize: "11px" }}>React 19 / TS</span>
        <span className="project-badge" style={{ fontSize: "11px" }}>Sakuga Physics</span>
        <span className="project-badge" style={{ fontSize: "11px" }}>Fed {fedCount}x</span>
      </div>
    </div>
  );
}
