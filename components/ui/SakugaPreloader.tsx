"use client";

import React, { useEffect, useState, useRef } from "react";

export function SakugaPreloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [speech, setSpeech] = useState("Waking up Sakuga engines... ✨");
  const progressRef = useRef<any>(null);

  // Loading quotes synchronized with percentage milestones
  const getSpeechForProgress = (p: number) => {
    if (p < 25) return "Waking up Sakuga engines... ✨";
    if (p < 55) return "Tuning design tokens & spring physics... 🎨";
    if (p < 85) return "Channeling cursed energy & icons... ⚡";
    if (p < 99) return "Preparing Domain Expansion... ドン!";
    return "Unlimited Void Active! ガチッ! 🚀";
  };

  useEffect(() => {
    // Snappy anime progress timer (takes ~1.3s to reach 100%)
    const startTime = performance.now();
    const duration = 1350; // 1.35s total for snappy experience

    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const rawPct = Math.min(100, Math.floor((elapsed / duration) * 100));

      setProgress(rawPct);
      setSpeech(getSpeechForProgress(rawPct));

      if (progressRef.current && typeof progressRef.current.set === "function") {
        progressRef.current.set(rawPct / 100);
      }

      if (rawPct < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        // Reached 100% -> Trigger SakugaFX canvas burst and exit
        const fx = (window as any).SakugaFX;
        if (fx) {
          const cx = window.innerWidth / 2;
          const cy = window.innerHeight / 2;
          if (typeof fx.burst === "function") {
            fx.burst(cx, cy, { r: 120, spikes: 24, life: 0.65 });
          }
          if (typeof fx.ticks === "function") {
            fx.ticks(cx, cy, { n: 12, r: 40, len: 32, life: 0.5 });
          }
          if (typeof fx.puff === "function") {
            fx.puff(cx, cy, { n: 8, size: 24, life: 0.6 });
          }
        }

        // Trigger dramatic anime exit blast
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setLoading(false);
          }, 450);
        }, 180);
      }
    };

    const animId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => setLoading(false), 250);
  };

  if (!loading) return null;

  return (
    <div
      id="sakuga-preloader"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2147483645, // right below custom cursor (2147483647)
        background: "var(--page)",
        color: "var(--sk-ink)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
        overflow: "hidden",
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? "scale(1.08)" : "scale(1)",
        filter: isExiting ? "blur(4px)" : "none",
        transition: "opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.4s ease",
        pointerEvents: isExiting ? "none" : "all",
      }}
    >
      {/* 1. Dynamic Manga Screentone & Speedlines Backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, var(--line) 2.2px, transparent 2.2px), linear-gradient(135deg, rgba(184, 179, 255, 0.12) 0%, transparent 70%)",
          backgroundSize: "28px 28px, 100% 100%",
          pointerEvents: "none",
          opacity: 0.75,
        }}
      />

      {/* 2. Floating Japanese Manga Onomatopoeia Lettering */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          left: "10%",
          writingMode: "vertical-rl",
          fontFamily: "'Avenir Next', 'Noto Serif JP', serif",
          fontSize: "clamp(24px, 3.2vw, 36px)",
          fontWeight: 900,
          color: "var(--sk-pri)",
          textShadow: "2px 2px 0 var(--sk-ink), -2px -2px 0 var(--sk-ink)",
          letterSpacing: "0.2em",
          transform: "rotate(-8deg)",
          pointerEvents: "none",
          animation: "sakuga-float-idle 2.4s ease-in-out infinite alternate",
        }}
      >
        シュッ!!
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "14%",
          right: "10%",
          writingMode: "vertical-rl",
          fontFamily: "'Avenir Next', 'Noto Serif JP', serif",
          fontSize: "clamp(24px, 3.2vw, 36px)",
          fontWeight: 900,
          color: "var(--sk-acc)",
          textShadow: "2px 2px 0 var(--sk-ink), -2px -2px 0 var(--sk-ink)",
          letterSpacing: "0.2em",
          transform: "rotate(6deg)",
          pointerEvents: "none",
          animation: "sakuga-float-idle 2.8s ease-in-out infinite alternate-reverse",
        }}
      >
        ロード中 · ドン!!
      </div>

      {/* 3. Central Stage Container */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "420px",
          width: "90%",
          padding: "20px",
        }}
      >
        {/* Dynamic Anime Speech Balloon */}
        <div
          className="mascot-speech-bubble"
          style={{
            background: "var(--sk-card)",
            border: "2.8px solid var(--sk-ink)",
            borderRadius: "18px",
            padding: "10px 20px",
            boxShadow: "4px 5px 0 var(--sk-soft)",
            fontSize: "14px",
            fontWeight: 800,
            color: "var(--sk-ink)",
            marginBottom: "16px",
            position: "relative",
            lineHeight: "1.4",
            textAlign: "center",
            transform: "translateY(0)",
            animation: "sakuga-bubble-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <span>{speech}</span>
          {/* Balloon pointer tail */}
          <div
            style={{
              position: "absolute",
              bottom: "-9px",
              left: "50%",
              transform: "translateX(-50%) rotate(45deg)",
              width: "14px",
              height: "14px",
              background: "var(--sk-card)",
              borderRight: "2.8px solid var(--sk-ink)",
              borderBottom: "2.8px solid var(--sk-ink)",
            }}
          />
        </div>

        {/* 4. The Cute Hero Section Cloud Mascot with Playful Kinetic Bounce */}
        <div
          style={{
            position: "relative",
            width: "240px",
            height: "190px",
            filter: "drop-shadow(6px 8px 0 var(--sk-soft))",
            animation: "sakuga-mascot-breathing 1.8s ease-in-out infinite",
          }}
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

            {/* Floating Mini SFX Kanji */}
            <text x="20" y="44" fill="var(--mute)" fontSize="13" fontWeight="800" fontStyle="italic">ピカッ</text>
            <text x="280" y="224" fill="var(--sk-acc)" fontSize="13" fontWeight="800" fontStyle="italic">カチッ</text>

            {/* Main Sakuga Cloud Body in Crisp Card White */}
            <path
              d="M 70 135 
                 C 48 114, 62 72, 104 78 
                 C 118 46, 172 38, 200 68 
                 C 234 52, 276 74, 268 116 
                 C 296 128, 296 176, 260 198 
                 C 252 232, 204 238, 178 220 
                 C 150 240, 104 230, 94 202 
                 C 58 200, 48 160, 70 135 Z"
              fill="var(--sk-card)"
              stroke="var(--sk-ink)"
              strokeWidth="3.8"
              strokeLinejoin="round"
            />

            {/* Solid 2-Tone Shading Plate (Lilac Shadow) */}
            <path
              d="M 94 202 
                 C 104 230, 150 240, 178 220 
                 C 204 238, 252 232, 260 198 
                 C 225 212, 142 216, 94 202 Z"
              fill="var(--sk-soft)"
              stroke="var(--sk-ink)"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />

            {/* Big Anime Expressive Eyes with Sparkles */}
            <g fill="var(--sk-ink)">
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
              stroke="var(--sk-ink)"
              strokeWidth="3.8"
              strokeLinecap="round"
              fill="none"
            />

            {/* Pinned Sakura Flower / Kira Star Hairpin Accessory (Top Right) */}
            <g transform="translate(242, 72) rotate(14)">
              <path
                d="M 0 -22 L 6 -6 L 22 0 L 6 6 L 0 22 L -6 6 L -22 0 L -6 -6 Z"
                fill="var(--sk-acc)"
                stroke="var(--sk-ink)"
                strokeWidth="2.6"
                strokeLinejoin="round"
              />
              <circle cx="0" cy="0" r="4.5" fill="#ffffff" stroke="var(--sk-ink)" strokeWidth="1.8" />
            </g>

            {/* Speed Wedge Accents */}
            <path d="M 42 90 L 26 84 L 40 78 Z" fill="var(--sk-acc)" />
            <path d="M 302 148 L 318 142 L 305 156 Z" fill="var(--sk-acc)" />
          </svg>
        </div>

        {/* 5. Sakuga High-Impact Progress Bar & Counter */}
        <div style={{ width: "100%", maxWidth: "340px", marginTop: "16px" }}>
          {/* Progress Frame */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "26px",
              background: "var(--sk-card)",
              border: "3px solid var(--sk-ink)",
              borderRadius: "999px",
              boxShadow: "4px 4px 0 var(--sk-soft)",
              overflow: "hidden",
            }}
          >
            {/* Animated Solid Color Fill Strip */}
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "linear-gradient(90deg, var(--sk-pri) 0%, var(--sk-acc) 100%)",
                transition: "width 0.08s linear",
                position: "relative",
              }}
            >
              {/* Kinetic Diagonal Anime Speed Glints */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.25) 0px, rgba(255, 255, 255, 0.25) 10px, transparent 10px, transparent 20px)",
                  backgroundSize: "28px 28px",
                }}
              />
            </div>
          </div>

          {/* Progress Meta Row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "10px",
              padding: "0 4px",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                fontWeight: 800,
                color: "var(--mute)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Krishna Sahoo · Portfolio
            </span>

            {/* Italic Display Percentage Tag */}
            <span
              style={{
                fontSize: "18px",
                fontWeight: 900,
                fontStyle: "italic",
                color: "var(--sk-ink)",
                fontFamily: "'Avenir Next', 'Nunito', sans-serif",
                background: "var(--chip)",
                border: "2px solid var(--sk-ink)",
                borderRadius: "8px",
                padding: "2px 8px",
                boxShadow: "2px 2px 0 var(--sk-soft)",
              }}
            >
              {progress}%
            </span>
          </div>
        </div>

        {/* 6. Skip Button for Impatient Visitors */}
        <button
          type="button"
          onClick={handleSkip}
          className="pill"
          style={{
            marginTop: "24px",
            background: "var(--sk-card)",
            border: "2px solid var(--sk-ink)",
            boxShadow: "2.5px 2.5px 0 var(--sk-soft)",
            fontSize: "12px",
            fontWeight: 800,
            color: "var(--mute)",
            padding: "0 18px",
            minHeight: "34px",
            cursor: "pointer",
            transition: "transform 0.15s ease, color 0.15s ease",
          }}
          onMouseEnter={(e) => ((e.currentTarget.style.color = "var(--sk-ink)"))}
          onMouseLeave={(e) => ((e.currentTarget.style.color = "var(--mute)"))}
        >
          Skip Intro ↗
        </button>
      </div>

      {/* Embedded Sakuga Keyframe Breathing CSS */}
      <style jsx>{`
        @keyframes sakuga-mascot-breathing {
          0%, 100% {
            transform: translateY(0px) scale(1, 1);
          }
          50% {
            transform: translateY(-9px) scale(1.03, 0.97);
          }
        }
        @keyframes sakuga-float-idle {
          0% {
            transform: translateY(0px) rotate(-8deg);
          }
          100% {
            transform: translateY(-12px) rotate(-6deg);
          }
        }
      `}</style>
    </div>
  );
}
