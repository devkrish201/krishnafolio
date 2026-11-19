import React, { useState } from "react";
import { PROJECTS_DATA } from "@/data/portfolioData";
import { ProjectCard } from "@/components/ui/ProjectCard";

interface WorkSectionProps {
  onToast: (msg: string) => void;
}

export function WorkSection({ onToast }: WorkSectionProps) {
  const [filter, setFilter] = useState("all");

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    if (filter === "systems") return project.category === "Design Systems";
    if (filter === "ai") return project.category === "AI Tooling";
    if (filter === "ux") return project.category === "UX Design";
    return true;
  });

  return (
    <section className="studio-work" id="work">
      <div className="section-heading">
        <div>
          <p className="eyebrow">SELECTED CASE STUDIES</p>
          <h2>Work</h2>
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button
            className="pill"
            type="button"
            style={{
              borderColor: filter === "all" ? "var(--sk-ink)" : "var(--line)",
              background: filter === "all" ? "var(--chip)" : "none",
            }}
            onClick={() => setFilter("all")}
          >
            All (04)
          </button>
          <button
            className="pill"
            type="button"
            style={{
              borderColor: filter === "systems" ? "var(--sk-ink)" : "var(--line)",
              background: filter === "systems" ? "var(--chip)" : "none",
            }}
            onClick={() => setFilter("systems")}
          >
            Design Systems
          </button>
          <button
            className="pill"
            type="button"
            style={{
              borderColor: filter === "ai" ? "var(--sk-ink)" : "var(--line)",
              background: filter === "ai" ? "var(--chip)" : "none",
            }}
            onClick={() => setFilter("ai")}
          >
            AI Tooling
          </button>
        </div>
      </div>

      <div className="project-grid">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} onToast={onToast} />
        ))}
      </div>
    </section>
  );
}

