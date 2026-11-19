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
      title="Click anywhere to trigger Sakuga Domain Expansion & swap posters!"
    >
      {/* 1. Dynamic Manga Screentone & Speedlines Backdrop (Unboxed) */}
      <div className="manga-speedline-backdrop" />

      {/* 2. Left Floating Japanese Vertical Calligraphy: 呪術廻戦 */}
      <div className="floating-manga-kanji-left">
        呪術廻戦
      </div>

      {/* 3. Right Floating Japanese Vertical Kanji: 五条 悟 / クリシュナ */}
      <div className="floating-manga-kanji-right">
        {posterMode === "krishna" ? "クリシュナ" : "五条 悟"}
      </div>

      {/* 4. Giant Floating SFX Stamps Breaking Out of Bounds */}
      <div className="manga-sfx-stamp-top">
        ズン!!
      </div>

      <div className="manga-sfx-stamp-bottom">
        ドッ!!
      </div>

      {/* 5. The Main Asymmetrical Manga Action Artwork */}
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

        {/* Floating Interactive Domain Seal */}
        <div className="domain-seal-pill">
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "#00e5ff",
              boxShadow: "0 0 8px #00e5ff",
              display: "inline-block",
              flexShrink: 0,
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
            {posterMode === "krishna" ? "Krishna (Gojo) ⇄ Gojo" : "Satoru Gojo ⇄ Krishna"}
          </span>
          <span
            style={{
              fontSize: "10.5px",
              background: "var(--sk-acc)",
              color: "#ffffff",
              padding: "2px 7px",
              borderRadius: "999px",
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            Click
          </span>
        </div>
      </div>
    </div>
  );
}
