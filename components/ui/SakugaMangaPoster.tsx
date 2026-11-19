"use client";

import React, { useState } from "react";

interface SakugaMangaPosterProps {
  onToast: (msg: string) => void;
}

export function SakugaMangaPoster({ onToast }: SakugaMangaPosterProps) {
  // Modes: "gojo" = Original Satoru Gojo Poster, "krishna" = Krishna Sahoo Gojo Style Poster (with exact Gojo skin color)
  const [posterMode, setPosterMode] = useState<"krishna" | "gojo">("gojo");
  const [isSparking, setIsSparking] = useState(false);

  const togglePoster = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSparking(true);
    setTimeout(() => setIsSparking(false), 550);

    const nextMode = posterMode === "krishna" ? "gojo" : "krishna";
    setPosterMode(nextMode);

    if (nextMode === "krishna") {
      onToast("クリシュナ領域展開 — Krishna Sahoo Gojo-Mode Active! ドン!");
    } else {
      onToast("無量空処 — Satoru Gojo: Unlimited Void Active! ガチッ!");
    }

    // Trigger SakugaFX Canvas explosion
    const fx = (window as any).SakugaFX;
    if (fx) {
      if (typeof fx.burst === "function") {
        fx.burst(e.pageX, e.pageY, { r: 110, spikes: 20, life: 0.55 });
      }
      if (typeof fx.ticks === "function") {
        fx.ticks(e.pageX, e.pageY, { n: 10, r: 28, len: 26, life: 0.45 });
      }
    }
  };

  const imageSrc =
    posterMode === "krishna"
      ? "/krishna-manga-poster.jpg"
      : "/gojo-manga-poster.jpg";

  return (
    <div
      className="manga-splash-stage"
      onClick={togglePoster}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "460px",
        margin: "0 auto",
        cursor: "pointer",
        userSelect: "none",
      }}
      title="Click anywhere to trigger Sakuga Domain Expansion & swap posters!"
    >
      {/* 1. Dynamic Manga Screentone & Speedlines Backdrop (Unboxed) */}
      <div
        className="manga-speedline-backdrop"
        style={{
          position: "absolute",
          inset: "-20px -28px",
          backgroundImage:
            "radial-gradient(circle, var(--line) 2px, transparent 2px), linear-gradient(135deg, rgba(184, 179, 255, 0.12) 0%, transparent 70%)",
          backgroundSize: "22px 22px, 100% 100%",
          zIndex: 0,
          borderRadius: "36px",
          pointerEvents: "none",
        }}
      />

      {/* 2. Left Floating Japanese Vertical Calligraphy: 呪術廻戦 */}
      <div
        className="floating-manga-kanji-left"
        style={{
          position: "absolute",
          left: "-26px",
          top: "16px",
          zIndex: 4,
          writingMode: "vertical-rl",
          fontFamily: "'Avenir Next', 'Noto Serif JP', serif",
          fontSize: "clamp(22px, 2.8vw, 32px)",
          fontWeight: 900,
          color: "#ffffff",
          textShadow:
            "2px 2px 0 var(--sk-ink), -2px -2px 0 var(--sk-ink), 2px -2px 0 var(--sk-ink), -2px 2px 0 var(--sk-ink), 0 0 16px rgba(0, 229, 255, 0.65)",
          letterSpacing: "0.22em",
          pointerEvents: "none",
          transform: "rotate(-3deg)",
        }}
      >
        呪術廻戦
      </div>

      {/* 3. Right Floating Japanese Vertical Kanji: 五条 悟 / クリシュナ */}
      <div
        className="floating-manga-kanji-right"
        style={{
          position: "absolute",
          right: "-26px",
          bottom: "40px",
          zIndex: 4,
          writingMode: "vertical-rl",
          fontFamily: "'Avenir Next', 'Noto Serif JP', serif",
          fontSize: "clamp(20px, 2.5vw, 28px)",
          fontWeight: 900,
          color: "var(--sk-acc)",
          textShadow:
            "2px 2px 0 var(--sk-ink), -2px -2px 0 var(--sk-ink), 0 0 16px rgba(255, 95, 168, 0.7)",
          letterSpacing: "0.2em",
          pointerEvents: "none",
          transform: "rotate(2deg)",
        }}
      >
        {posterMode === "krishna" ? "クリシュナ" : "五条 悟"}
      </div>

      {/* 4. Giant Floating SFX Stamps Breaking Out of Bounds */}
      <div
        style={{
          position: "absolute",
          top: "-14px",
          right: "20px",
          zIndex: 4,
          fontSize: "clamp(26px, 3.2vw, 36px)",
          fontWeight: 900,
          fontStyle: "italic",
          color: "#ffffff",
          textShadow:
            "3px 3px 0 var(--sk-ink), -2px -2px 0 var(--sk-ink), 0 0 18px #00e5ff",
          pointerEvents: "none",
          transform: "rotate(12deg)",
        }}
      >
        ズン!!
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "16px",
          left: "14px",
          zIndex: 4,
          fontSize: "clamp(24px, 3vw, 34px)",
          fontWeight: 900,
          fontStyle: "italic",
          color: "var(--sk-acc)",
          textShadow:
            "3px 3px 0 var(--sk-ink), -2px -2px 0 var(--sk-ink), 0 0 16px #ff5fa8",
          pointerEvents: "none",
          transform: "rotate(-8deg)",
        }}
      >
        ドッ!!
      </div>

      {/* 5. The Main Asymmetrical Manga Action Artwork (No generic box, no headers/footers) */}
      <div
        className={`manga-action-canvas ${isSparking ? "domain-blast" : ""}`}
        style={{
          position: "relative",
          zIndex: 2,
          aspectRatio: "3 / 4",
          width: "100%",
          overflow: "hidden",
          clipPath:
            "polygon(0 3%, 3% 0, 97% 0, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0 97%)",
          border: "3.6px solid var(--sk-ink)",
          background: "#08061a",
          boxShadow:
            "0 0 36px rgba(0, 229, 255, 0.5), 8px 9px 0 var(--sk-soft)",
          transition: "transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.28s ease",
        }}
      >
        <img
          src={imageSrc}
          alt={
            posterMode === "krishna"
              ? "Krishna Sahoo - Gojo Style Manga Cover Art"
              : "Satoru Gojo - Jujutsu Kaisen Manga Art"
          }
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
            transform: isSparking ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.3s ease",
          }}
        />

        {/* Dynamic Cursed Energy Radiant Glow Inset */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            boxShadow:
              "inset 0 0 30px rgba(0, 229, 255, 0.45), inset 0 0 60px rgba(29, 26, 74, 0.5)",
            pointerEvents: "none",
          }}
        />

        {/* Top-Right Chapter Ribbon Badge */}
        <div
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            background: "rgba(12, 10, 36, 0.9)",
            border: "1.8px solid #00e5ff",
            color: "#00e5ff",
            padding: "4px 10px",
            fontSize: "10.5px",
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            borderRadius: "6px",
            boxShadow: "0 0 10px rgba(0, 229, 255, 0.35)",
            pointerEvents: "none",
          }}
        >
          特級呪術師 · UNLIMITED VOID
        </div>

        {/* Floating Interactive Domain Seal (Seamless Anime Stamp, NOT a boring card footer) */}
        <div
          style={{
            position: "absolute",
            bottom: "16px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(29, 26, 74, 0.92)",
            backdropFilter: "blur(8px)",
            border: "2px solid #00e5ff",
            borderRadius: "999px",
            padding: "6px 16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 0 14px rgba(0, 229, 255, 0.45), 3px 3px 0 var(--sk-ink)",
            zIndex: 5,
          }}
        >
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "#00e5ff",
              boxShadow: "0 0 8px #00e5ff",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontSize: "11.5px",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "0.05em",
              whiteSpace: "nowrap",
            }}
          >
            {posterMode === "krishna" ? "Krishna (Gojo Palette) ⇄ Gojo" : "Satoru Gojo ⇄ Krishna"}
          </span>
          <span
            style={{
              fontSize: "10.5px",
              background: "var(--sk-acc)",
              color: "#ffffff",
              padding: "2px 7px",
              borderRadius: "999px",
              fontWeight: 800,
            }}
          >
            Click
          </span>
        </div>
      </div>
    </div>
  );
}
