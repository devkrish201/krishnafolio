import React, { useState } from "react";
import { PROFILE_DATA } from "@/data/portfolioData";
import { SakugaBurstAvatar } from "@/components/ui/SakugaBurstAvatar";
import { SakugaMangaPoster } from "@/components/ui/SakugaMangaPoster";

interface AboutSectionProps {
  onToast: (msg: string) => void;
}

export function AboutSection({ onToast }: AboutSectionProps) {
  const [visualMode, setVisualMode] = useState<"burst" | "manga">("manga");

  return (
    <section className="studio-about" id="about">
      {/* Left Column: Bold Organic Blossom Burst or JJK Manga Poster */}
      <div className="studio-about-profile">
        {/* Visual Switcher Pills */}
        <div
          style={{
            display: "inline-flex",
            gap: "6px",
            background: "var(--chip)",
            padding: "4px 6px",
            borderRadius: "999px",
            border: "1.5px solid var(--line)",
            marginBottom: "24px",
          }}
        >
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
              onToast("JJK Manga Domain Poster active!");
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
              onToast("Sunflower Blossom Cutout active!");
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

        {visualMode === "manga" ? (
          <SakugaMangaPoster onToast={onToast} />
        ) : (
          <SakugaBurstAvatar
            imageSrc="/krishna-cutout.png"
            onToast={onToast}
            size={540}
          />
        )}
      </div>

      {/* Right Column: Editorial Narrative & Career Highlights */}
      <div className="studio-about-copy">
        <p className="eyebrow">ABOUT KRISHNA SAHOO</p>
        <h2>
          A little about me.<br />
          Curiosity is a useful <em>habit.</em>
        </h2>

        <p className="about-lead">
          I have a soft spot for complicated problems, and making them feel simple.
        </p>

        <p>
          I&apos;m Krishna Sahoo, a <strong>Product &amp; Systems Designer</strong> with a background spanning enterprise design systems, frontend architecture, illustration, and tactile storytelling. My journey through engineering and design has shaped how I see, think, and create.
        </p>

        <p>
          For the past 3.5+ years, I&apos;ve been designing experiences for enterprise platforms and high-scale productivity tools—simplifying multifaceted challenges and exploring how AI can solve real problems in meaningful ways (from natural language semantic icon search to Copilot template validators).
        </p>

        <p>
          When not shipping product design systems, you will find me following another curiosity: exploring spring physics, building kinetic anime micro-interactions, experimenting with new recipes, or sketching little quirks in pocket notebooks.
        </p>

        {/* The Gojo Infinity Philosophy */}
        <div
          style={{
            margin: "20px 0",
            padding: "14px 18px",
            background: "rgba(0, 229, 255, 0.06)",
            borderRadius: "var(--sk-r)",
            border: "2px solid #00e5ff",
            boxShadow: "3px 3px 0 var(--sk-soft)",
          }}
        >
          <span className="project-badge" style={{ background: "#0c0a24", color: "#00e5ff", borderColor: "#00e5ff", fontSize: "10.5px" }}>
            The Infinity Principle · 無量空処
          </span>
          <p
            style={{
              marginTop: "8px",
              fontSize: "13px",
              lineHeight: "1.55",
              color: "var(--sk-ink)",
              fontWeight: 600,
            }}
          >
            Like Gojo&apos;s Infinity, great design systems make deep structural complexity feel completely weightless and intuitive.
          </p>
        </div>

        {/* Experience Focus Badges Strip */}
        <div className="about-pills-row">
          <span className="project-badge">Product &amp; Systems Designer</span>
          <span className="project-badge">3.5+ Yrs Enterprise &amp; AI</span>
          <span className="project-badge">Design Systems Scale</span>
          <span className="project-badge">Sakuga VFX / React 19</span>
        </div>

        {/* Daily Cadence Card Matching Tanuja's Motto */}
        <div className="about-cadence-card">
          <span className="cadence-label">Daily Cadence</span>
          <p className="cadence-text">
            Eat · Create · Explore · Code · Chill · Sleep · Repeat
          </p>
        </div>

        {/* Interactive Action Links */}
        <div className="studio-about-links">
          <sakuga-button
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              onToast("Let's talk!");
            }}
          >
            Start a Conversation ↗
          </sakuga-button>
          <a className="pill" href="/about">
            Full Story &amp; Philosophy ↗
          </a>
          <a
            className="pill"
            href={PROFILE_DATA.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
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
  );
}
