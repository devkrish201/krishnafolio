import React, { useState, useEffect, useRef } from "react";
import { PROJECTS_DATA } from "@/data/portfolioData";
import { ProjectCard } from "@/components/ui/ProjectCard";

interface WorkSectionProps {
  onToast: (msg: string) => void;
}

export function WorkSection({ onToast }: WorkSectionProps) {
  const [filter, setFilter] = useState("all");
  const tabsRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;
    const handleChange = (e: any) => {
      const val = e.detail?.value || (el as any).value;
      if (val === "all" || val === "systems" || val === "ai") {
        setFilter(val);
        onToast(`Filtered by ${e.detail?.label || val}`);
      }
    };
    el.addEventListener("change", handleChange);
    return () => el.removeEventListener("change", handleChange);
  }, [onToast]);

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
        <sakuga-tabs
          ref={tabsRef}
          label="Filter work categories"
          selected={filter === "all" ? 0 : filter === "systems" ? 1 : 2}
        >
          <option value="all">All (05)</option>
          <option value="systems">Design Systems</option>
          <option value="ai">AI Tooling</option>
        </sakuga-tabs>
      </div>

      <div className="project-grid">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} onToast={onToast} />
        ))}
      </div>
    </section>
  );
}

