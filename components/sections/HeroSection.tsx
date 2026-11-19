import React, { useState, useEffect, useRef } from "react";
import { PROFILE_DATA } from "@/data/portfolioData";
import { SakugaMascot } from "@/components/ui/SakugaMascot";

interface HeroSectionProps {
  onToast: (msg: string) => void;
}

export function HeroSection({ onToast }: HeroSectionProps) {
  const [available, setAvailable] = useState(PROFILE_DATA.isAvailable);
  const toggleRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = toggleRef.current;
    if (!el) return;
    const handleChange = () => {
      const state = (el as any).checked;
      setAvailable(state);
      onToast(state ? "Status: Available for projects" : "Status: Busy shipping products");
    };
    el.addEventListener("change", handleChange);
    return () => el.removeEventListener("change", handleChange);
  }, [onToast]);

  return (
    <section className="studio-hero">
      <div className="studio-intro-copy">
        {/* Availability Switch */}
        <div className="hero-status-row">
          <span className={`status-dot ${available ? "is-available" : "is-busy"}`}></span>
          <span className="eyebrow">
            {available ? "Available for projects" : "Busy shipping products"}
          </span>
          <sakuga-toggle
            ref={toggleRef}
            label="Availability toggle"
            checked={available}
            onChange={(e: any) => {
              const state = e.target.checked;
              setAvailable(state);
              onToast(state ? "Status: Available for projects" : "Status: Busy shipping products");
            }}
          ></sakuga-toggle>
        </div>

        {/* Playful Handwritten Kicker Matching Tanuja's Signature Header */}
        <div className="hero-kicker-row">
          <span className="hero-script-greeting">
            Hi, I am {PROFILE_DATA.name}
          </span>
          <span className="hero-role-tag">
            Product &amp; Systems Designer
          </span>
          {/* 4-Tile Sakuga Studio Monogram matching Microsoft 4-color icon */}
          <div
            className="hero-studio-icon"
            title="Sakuga VFX Design System"
            aria-label="Sakuga Studio Icon"
          >
            <span style={{ background: "var(--sk-acc)" }} />
            <span style={{ background: "var(--sk-pri)" }} />
            <span style={{ background: "var(--sk-soft)" }} />
            <span style={{ background: "var(--sk-ink)" }} />
          </div>
        </div>

        {/* Bold Impactful Headline */}
        <h1>
          Solving real problems with AI.<br />
          Crafting stories that <em>connect.</em>
        </h1>

        {/* Rich Introductory Copy */}
        <p className="hero-intro-text">
          {PROFILE_DATA.intro}
        </p>



        {/* Action Link Buttons */}
        <div className="studio-hero-links">
          <sakuga-button
            onClick={() => {
              document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
              onToast("Jumping to selected work");
            }}
          >
            Explore my work ↓
          </sakuga-button>
          <a
            className="pill"
            href={PROFILE_DATA.socials.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
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
            href="#contact"
            onClick={() => onToast("Let's talk!")}
          >
            Get in touch ↗
          </a>
          <sakuga-tooltip
            text="Plain at rest, kinetic in action"
            label="Design Philosophy"
          ></sakuga-tooltip>
        </div>
      </div>

      {/* Right Column: Clean & Minimal Sakuga Mascot Character Stage */}
      <div className="hero-mascot-stage">
        <SakugaMascot onToast={onToast} />
      </div>
    </section>
  );
}
