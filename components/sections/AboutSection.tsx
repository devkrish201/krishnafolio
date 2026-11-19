import React, { useState, useEffect, useRef } from "react";
import { PROFILE_DATA } from "@/data/portfolioData";
import { SakugaBurstAvatar } from "@/components/ui/SakugaBurstAvatar";
import { SakugaMangaPoster } from "@/components/ui/SakugaMangaPoster";

interface AboutSectionProps {
  onToast: (msg: string) => void;
}

export function AboutSection({ onToast }: AboutSectionProps) {
  const [visualMode, setVisualMode] = useState<"burst" | "manga">("manga");
  const visualTabsRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = visualTabsRef.current;
    if (!el) return;
    const handleChange = (e: any) => {
      const val = e.detail?.value || (el as any).value;
      if (val === "manga" || val === "burst") {
        setVisualMode(val);
        onToast(val === "manga" ? "JJK Manga Domain Poster active!" : "Sunflower Blossom Cutout active!");
      }
    };
    el.addEventListener("change", handleChange);
    return () => el.removeEventListener("change", handleChange);
  }, [onToast]);

  return (
    <section className="studio-about" id="about">
      {/* Left Column: Bold Organic Blossom Burst or JJK Manga Poster */}
      <div className="studio-about-profile">
        {/* Visual Switcher Sakuga Tabs */}
        <div className="about-visual-switcher">
          <sakuga-tabs
            ref={visualTabsRef}
            label="Visual Avatar Mode"
            selected={visualMode === "manga" ? 0 : 1}
          >
            <option value="manga">JJK Manga Poster</option>
            <option value="burst">Sunflower Blossom</option>
          </sakuga-tabs>
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
        <div className="about-philosophy-card">
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
          <sakuga-button
            variant="secondary"
            href="/about"
            onClick={() => onToast("Opening full story & philosophy...")}
          >
            Full Story &amp; Philosophy ↗
          </sakuga-button>
          <sakuga-button
            variant="secondary"
            href={PROFILE_DATA.socials.linkedin}
            target="_blank"
            onClick={() => {
              window.open(PROFILE_DATA.socials.linkedin, "_blank", "noopener,noreferrer");
              onToast("Opening LinkedIn profile...");
            }}
          >
            LinkedIn ↗
          </sakuga-button>
          <sakuga-button
            variant="secondary"
            href={PROFILE_DATA.socials.github}
            target="_blank"
            onClick={() => {
              window.open(PROFILE_DATA.socials.github, "_blank", "noopener,noreferrer");
              onToast("Opening GitHub profile...");
            }}
          >
            GitHub ↗
          </sakuga-button>
        </div>
      </div>
    </section>
  );
}
