import React from "react";
import { Project } from "@/data/portfolioData";

interface MockupRibbonProps {
  project: Project;
  onToast: (msg: string) => void;
  accentColor?: string;
}

export function MockupRibbon({ project, onToast, accentColor = "var(--sk-pri)" }: MockupRibbonProps) {
  // 1. FOX Icons: Office Dual Ribbon with real SVG formatting icons
  if (project.interactiveType === "button") {
    return (
      <div className="mockup-ribbon" style={{ borderTop: `4px solid ${accentColor}` }}>
        <div className="mockup-toolbar">
          <span
            className="mockup-chip"
            style={{
              background: accentColor,
              color: "#ffffff",
              fontWeight: 800,
              border: "1.5px solid var(--sk-ink)",
              boxShadow: "2px 2px 0 var(--sk-ink)",
            }}
          >
            FOX Studio
          </span>
          <span className="mockup-chip">Clipboard</span>
          <span className="mockup-chip">Typography</span>
          <span className="mockup-chip">Grid Layout</span>
          <span className="mockup-chip">AI Copilot</span>
        </div>

        {/* Real SVG Vector Icon Grid */}
        <div className="mockup-icon-row" style={{ justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
            {/* Bold SVG Icon */}
            <button
              type="button"
              className="mockup-chip"
              onClick={() => onToast("FOX Icon: Font Bold · 24px SVG")}
              title="Font Bold"
              style={{ padding: "6px 10px", display: "inline-flex", alignItems: "center", cursor: "pointer" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
                <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
              </svg>
            </button>

            {/* Italic SVG Icon */}
            <button
              type="button"
              className="mockup-chip"
              onClick={() => onToast("FOX Icon: Font Italic · 24px SVG")}
              title="Font Italic"
              style={{ padding: "6px 10px", display: "inline-flex", alignItems: "center", cursor: "pointer" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="4" x2="10" y2="4"></line>
                <line x1="14" y1="20" x2="5" y2="20"></line>
                <line x1="15" y1="4" x2="9" y2="20"></line>
              </svg>
            </button>

            {/* Underline SVG Icon */}
            <button
              type="button"
              className="mockup-chip"
              onClick={() => onToast("FOX Icon: Font Underline · 24px SVG")}
              title="Font Underline"
              style={{ padding: "6px 10px", display: "inline-flex", alignItems: "center", cursor: "pointer" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path>
                <line x1="4" y1="21" x2="20" y2="21"></line>
              </svg>
            </button>

            {/* Paint Palette SVG Icon */}
            <button
              type="button"
              className="mockup-chip"
              onClick={() => onToast("FOX Icon: Color Palette · 24px SVG")}
              title="Color Palette"
              style={{ padding: "6px 10px", display: "inline-flex", alignItems: "center", cursor: "pointer" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
                <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
                <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
                <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
              </svg>
            </button>

            {/* Align Center SVG Icon */}
            <button
              type="button"
              className="mockup-chip"
              onClick={() => onToast("FOX Icon: Text Alignment · 24px SVG")}
              title="Text Alignment"
              style={{ padding: "6px 10px", display: "inline-flex", alignItems: "center", cursor: "pointer" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="10" x2="6" y2="10"></line>
                <line x1="21" y1="6" x2="3" y2="6"></line>
                <line x1="21" y1="14" x2="3" y2="14"></line>
                <line x1="18" y1="18" x2="6" y2="18"></line>
              </svg>
            </button>
          </div>

          <span
            style={{
              fontSize: "11px",
              color: accentColor,
              fontWeight: 800,
              background: "var(--chip)",
              padding: "3px 8px",
              borderRadius: "6px",
              border: "1px solid var(--line)",
            }}
          >
            5,000+ Scaled
          </span>
        </div>
      </div>
    );
  }

  // 2. Making Icons Searchable: Figma AI Plugin with vector search icons
  if (project.interactiveType === "slider") {
    return (
      <div className="mockup-ribbon" style={{ maxWidth: "420px", borderTop: `4px solid ${accentColor}` }}>
        <div className="mockup-toolbar">
          <span
            className="mockup-chip"
            style={{
              background: accentColor,
              color: "#0c0a24",
              fontWeight: 800,
              border: "1.5px solid var(--sk-ink)",
              boxShadow: "2px 2px 0 var(--sk-ink)",
            }}
          >
            Figma AI
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 700 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span>Semantic Vector Search</span>
          </div>
        </div>

        <div style={{ padding: "6px 0", width: "100%" }}>
          <sakuga-slider
            label="Vector similarity match"
            value="85"
            unit="%"
            onChange={(e: any) => onToast(`Vector cosine similarity: ${e.target.value}%`)}
          ></sakuga-slider>
        </div>

        {/* Vector SVG Icon Match Results */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
          <span className="mockup-chip" style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
            spreadsheets
          </span>
          <span className="mockup-chip" style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="20" x2="18" y2="10"></line>
              <line x1="12" y1="20" x2="12" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
            charts
          </span>
          <span className="mockup-chip" style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="12 8 8 12 12 16 12 8"></polygon>
            </svg>
            pivot-matrix
          </span>
        </div>
      </div>
    );
  }

  // 3. Template Validator: Copilot AI Slide Health
  if (project.interactiveType === "checkbox") {
    return (
      <div className="mockup-ribbon" style={{ maxWidth: "420px", borderTop: `4px solid ${accentColor}`, gap: "10px" }}>
        <div className="mockup-toolbar">
          <span
            className="mockup-chip"
            style={{
              background: accentColor,
              color: "#ffffff",
              fontWeight: 800,
              border: "1.5px solid var(--sk-ink)",
              boxShadow: "2px 2px 0 var(--sk-ink)",
            }}
          >
            Copilot Validator
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 700, color: "var(--sk-ink)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <polyline points="9 12 11 14 15 10"></polyline>
            </svg>
            <span>Audit Health: 98%</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-start", width: "100%" }}>
          <sakuga-checkbox
            checked
            onChange={(e: any) => onToast(`Heading hierarchy rule: ${e.target.checked ? "pass" : "fail"}`)}
          >
            Heading hierarchy valid
          </sakuga-checkbox>
          <sakuga-checkbox
            checked
            onChange={(e: any) => onToast(`Slide density rule: ${e.target.checked ? "pass" : "fail"}`)}
          >
            Slide density compliant
          </sakuga-checkbox>
          <sakuga-checkbox
            checked
            onChange={(e: any) => onToast(`Contrast rule: ${e.target.checked ? "pass" : "fail"}`)}
          >
            Color contrast verified
          </sakuga-checkbox>
        </div>
      </div>
    );
  }

  // 4. Bug Logger: Automated triage ingestion stream
  return (
    <div className="mockup-ribbon" style={{ maxWidth: "420px", borderTop: `4px solid ${accentColor}` }}>
      <div className="mockup-toolbar">
        <span
          className="mockup-chip"
          style={{
            background: accentColor,
            color: "#291e14",
            fontWeight: 800,
            border: "1.5px solid var(--sk-ink)",
            boxShadow: "2px 2px 0 var(--sk-ink)",
          }}
        >
          Bug Logger
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 700 }}>
          {/* Bug Beetle SVG */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect width="8" height="14" x="8" y="6" rx="4"></rect>
            <path d="m19 7-3 2"></path>
            <path d="m5 7 3 2"></path>
            <path d="m19 19-3-2"></path>
            <path d="m5 19 3-2"></path>
            <path d="M20 13h-4"></path>
            <path d="M4 13h4"></path>
            <path d="m10 4 1 2"></path>
            <path d="m14 4-1 2"></path>
          </svg>
          <span>Automated AI Triage</span>
        </div>
      </div>

      <div style={{ padding: "8px 0", width: "100%" }}>
        <sakuga-progress
          label="AI Bug Stream Ingestion"
          demo
          onClick={() => onToast("Bug stream queue synced!")}
        ></sakuga-progress>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", fontSize: "11px", color: "var(--mute)" }}>
        <span>⚡ Real-time triage active</span>
        <span style={{ fontWeight: 800, color: accentColor }}>Zero-friction capture</span>
      </div>
    </div>
  );
}
