"use client";

import React, { useRef, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SakugaMangaPoster } from "@/components/ui/SakugaMangaPoster";
import { SakugaBurstAvatar } from "@/components/ui/SakugaBurstAvatar";
import { PROFILE_DATA } from "@/data/portfolioData";

export default function AboutPage() {
  const toastRef = useRef<any>(null);
  const [visualMode, setVisualMode] = useState<"burst" | "manga">("manga");

  const showToast = (msg: string) => {
    toastRef.current?.show(msg);
  };

  return (
    <>
      <Header onToast={showToast} activePath="/about" />

      <div className="wrap">
        <section
          className="studio-about"
          style={{
            borderTop: "none",
            alignItems: "center",
          }}
        >
          {/* Left: Sunflower Blossom Cutout or JJK Gojo Manga Poster */}
          <div className="studio-about-profile">
            {/* Visual Switcher Pills */}
            <div className="about-visual-switcher">
              <button
                type="button"
                className="pill"
                style={{
                  minHeight: "34px",
                  padding: "0 16px",
                  fontSize: "12.5px",
                  fontWeight: 800,
                  border: "none",
                  background: visualMode === "manga" ? "var(--sk-card)" : "transparent",
                  color: visualMode === "manga" ? "var(--sk-ink)" : "var(--mute)",
                  boxShadow: visualMode === "manga" ? "0 2px 8px rgba(29, 26, 74, 0.12)" : "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setVisualMode("manga");
                  showToast("JJK Manga Domain Poster active!");
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
                JJK Manga Poster
              </button>
              <button
                type="button"
                className="pill"
                style={{
                  minHeight: "34px",
                  padding: "0 16px",
                  fontSize: "12.5px",
                  fontWeight: 800,
                  border: "none",
                  background: visualMode === "burst" ? "var(--sk-card)" : "transparent",
                  color: visualMode === "burst" ? "var(--sk-ink)" : "var(--mute)",
                  boxShadow: visualMode === "burst" ? "0 2px 8px rgba(29, 26, 74, 0.12)" : "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setVisualMode("burst");
                  showToast("Sunflower Blossom Cutout active!");
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M12 2a4 4 0 0 0-4 4v1.5a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z"></path>
                  <path d="M12 16.5a4 4 0 0 0-4 4V22h8v-1.5a4 4 0 0 0-4-4z"></path>
                  <path d="M2 12a4 4 0 0 0 4-4h1.5a4 4 0 0 0 0 8H6a4 4 0 0 0-4-4z"></path>
                  <path d="M16.5 12a4 4 0 0 0 0-4H18a4 4 0 0 0 4 4 4 4 0 0 0-4 4h-1.5z"></path>
                </svg>
                Sunflower Blossom
              </button>
            </div>

            {/* Display Active Visual */}
            {visualMode === "manga" ? (
              <SakugaMangaPoster onToast={showToast} />
            ) : (
              <SakugaBurstAvatar
                imageSrc="/krishna-cutout.png"
                onToast={showToast}
                size={540}
              />
            )}
          </div>

          {/* Right: Narrative matching the uploaded screenshot layout */}
          <div className="studio-about-copy">
            <p className="eyebrow">ABOUT</p>
            <h1 style={{ marginTop: "10px", marginBottom: "20px" }}>
              A little<br />
              about <em>me.</em>
            </h1>

            <p className="about-lead">
              I have a soft spot for complicated problems, and making them feel simple.
            </p>

            <p style={{ marginTop: "16px" }}>
              I&apos;m Krishna Sahoo, a <strong>Product &amp; Systems Designer</strong> with a background spanning design systems, frontend architecture, illustration, and tactile storytelling. My journey through engineering and design has shaped how I see, think, and create.
            </p>

            <p style={{ marginTop: "16px" }}>
              For the past 3.5+ years, I&apos;ve been designing experiences for high-scale enterprise applications, simplifying complex challenges and exploring how AI can solve real problems in meaningful ways.
            </p>

            <p style={{ marginTop: "16px" }}>
              When not designing, you will find me following another curiosity: exploring spring physics, building kinetic manga micro-interactions, experimenting with new recipes, or sketching little quirks in pocket notebooks.
            </p>

            {/* Satoru Gojo Design Philosophy Card */}
            <div className="about-philosophy-card">
              <span className="project-badge" style={{ background: "#0c0a24", color: "#00e5ff", borderColor: "#00e5ff" }}>
                The Infinity Principle · 無量空処
              </span>
              <p
                style={{
                  marginTop: "10px",
                  fontSize: "13.5px",
                  lineHeight: "1.6",
                  color: "var(--sk-ink)",
                  fontWeight: 600,
                }}
              >
                Much like Gojo&apos;s Infinity, great design systems make immense architectural complexity feel completely weightless, intuitive, and second nature to everyone who touches them.
              </p>
            </div>

            {/* Experience Focus Badges Strip */}
            <div className="about-pills-row">
              <span className="project-badge">Product &amp; Systems Designer</span>
              <span className="project-badge">3.5+ Yrs Enterprise &amp; AI</span>
              <span className="project-badge">Design Systems Scale</span>
              <span className="project-badge">Sakuga VFX / React 19</span>
            </div>

            {/* Core Cadence Card */}
            <div className="about-cadence-card">
              <span className="cadence-label">Daily Cadence</span>
              <p className="cadence-text">
                Eat · Create · Explore · Code · Chill · Sleep · Repeat
              </p>
            </div>

            <div className="studio-about-links">
              <sakuga-button
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  showToast("Let's talk!");
                }}
              >
                Start a Conversation ↗
              </sakuga-button>
              <a
                className="pill"
                href={PROFILE_DATA.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn Profile ↗
              </a>
              <a
                className="pill"
                href={PROFILE_DATA.socials.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer onToast={showToast} />

      <sakuga-toast
        ref={toastRef}
        style={{ position: "fixed", left: "24px", bottom: "24px", zIndex: 99999 }}
      ></sakuga-toast>
    </>
  );
}
