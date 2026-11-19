import React from "react";
import { Project } from "@/data/portfolioData";
import { MockupRibbon } from "./MockupRibbon";

interface ProjectCardProps {
  project: Project;
  onToast: (msg: string) => void;
  index?: number;
}

const SAKUGA_CARD_PALETTES = [
  {
    bg: "rgba(143, 141, 247, 0.16)",
    accent: "var(--sk-pri)",
    shadow: "var(--sk-soft)",
  },
  {
    bg: "rgba(0, 229, 255, 0.14)",
    accent: "#00e5ff",
    shadow: "rgba(0, 229, 255, 0.4)",
  },
  {
    bg: "rgba(255, 95, 168, 0.14)",
    accent: "var(--sk-acc)",
    shadow: "rgba(255, 95, 168, 0.4)",
  },
  {
    bg: "rgba(255, 210, 63, 0.18)",
    accent: "#f59e0b",
    shadow: "#ffd23f",
  },
  {
    bg: "rgba(143, 141, 247, 0.16)",
    accent: "var(--sk-acc)",
    shadow: "var(--sk-soft)",
  },
];

export function ProjectCard({ project, onToast, index = 0 }: ProjectCardProps) {
  const palette = SAKUGA_CARD_PALETTES[index % SAKUGA_CARD_PALETTES.length];

  return (
    <article
      className={`project-card ${project.featured ? "featured" : ""}`}
      style={{
        boxShadow: `6px 7px 0 ${palette.shadow}`,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      {/* Sakuga Colored Art Container with custom background */}
      <div
        className="project-art"
        style={{
          background: palette.bg,
          borderBottom: "3px solid var(--sk-ink)",
        }}
      >
        <MockupRibbon project={project} onToast={onToast} accentColor={palette.accent} />
      </div>

      <div className="project-copy">
        <div className="project-meta-row">
          <span
            className="project-badge"
            style={{
              color: palette.accent,
              borderColor: palette.accent,
              background: "var(--chip)",
            }}
          >
            {project.number} · {project.badge}
          </span>
          <span className="project-disciplines">{project.disciplines}</span>
        </div>
        <h3>{project.title}</h3>
        <p style={{ color: "var(--mute)" }}>{project.description}</p>
      </div>

      <div className="project-acts">
        {project.interactiveType === "button" ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "12px", color: "var(--mute)", fontWeight: 600 }}>System Rating:</span>
              <sakuga-rating
                label={`${project.title} Rating`}
                value="5"
                onChange={() => onToast("5/5 rating verified!")}
              ></sakuga-rating>
            </div>
            <sakuga-button
              onClick={(e: any) => {
                setTimeout(() => e.target.done(), 700);
                onToast(`${project.title} Case Study opened!`);
              }}
            >
              View Case Study
            </sakuga-button>
          </>
        ) : (
          <>
            <span style={{ fontSize: "12px", color: "var(--mute)" }}>
              {project.tags[0]}
            </span>
            <sakuga-button
              variant="secondary"
              onClick={() => onToast(`Exploring ${project.title}...`)}
            >
              Explore Project ↗
            </sakuga-button>
          </>
        )}
      </div>
    </article>
  );
}

