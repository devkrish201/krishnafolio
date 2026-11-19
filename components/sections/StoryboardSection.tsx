import React from "react";
import { MEMORIES_DATA } from "@/data/portfolioData";

interface StoryboardSectionProps {
  onToast: (msg: string) => void;
}

export function StoryboardSection({ onToast }: StoryboardSectionProps) {
  return (
    <section className="storyboard-section" id="storyboard">
      <div className="section-heading">
        <div>
          <p className="eyebrow">CREATIVE EXPLORATIONS</p>
          <h2>Illustrated Memories &amp; Kinetic Play</h2>
        </div>
        <p style={{ color: "var(--mute)", maxWidth: "420px", fontSize: "14px" }}>
          &quot;Some experiences stay with you. I draw and build mine.&quot;
        </p>
      </div>

      <div className="storyboard-canvas">
        <div className="storyboard-row">
          {MEMORIES_DATA.map((mem, i) => (
            <sakuga-button
              key={i}
              variant="secondary"
              onClick={() => onToast(`${mem.title}: ${mem.note}`)}
            >
              {mem.title}
            </sakuga-button>
          ))}
        </div>

        <div style={{ textAlign: "center", borderTop: "1.5px solid var(--line)", paddingTop: "18px" }}>
          <span style={{ fontSize: "13px", color: "var(--mute)" }}>
            Click any storyboard memory to reveal illustrated notes with anime sound effects.
          </span>
        </div>
      </div>
    </section>
  );
}

