"use client";

import React, { useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CREATIVE_PROJECTS } from "@/data/creativeData";

// Interactive Demo 1: Brand Packaging & Mineral Swatches
function PackagingBrandDemo({ onToast, accentColor }: { onToast: (msg: string) => void; accentColor: string }) {
  const swatches = [
    { name: "Kesar Saffron", color: "#f59e0b" },
    { name: "Rose Petal", color: "#ff5fa8" },
    { name: "Peacock Indigo", color: "#8f8df7" },
    { name: "Mint Herbal", color: "#10b981" },
  ];

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
          Brand &amp; Packaging
        </span>
        <span style={{ fontSize: "11px", fontWeight: 700 }}>Organic Material Tones</span>
      </div>

      <div style={{ display: "flex", gap: "8px", alignItems: "center", width: "100%", padding: "4px 0" }}>
        {swatches.map((s) => (
          <button
            key={s.name}
            type="button"
            onClick={(e) => {
              const fx = (window as any).SakugaFX;
              if (fx && typeof fx.kira === "function") {
                fx.kira(e.pageX, e.pageY, { r: 14, col: s.color });
              }
              onToast(`Swatch picked: ${s.name}`);
            }}
            title={s.name}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: s.color,
              border: "2px solid var(--sk-ink)",
              boxShadow: "2px 2px 0 var(--sk-soft)",
              cursor: "pointer",
              transition: "transform 0.15s ease",
            }}
          />
        ))}
        <span style={{ fontSize: "11px", color: "var(--mute)", marginLeft: "4px" }}>
          Click swatches to sparkle
        </span>
      </div>

      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
        <span className="mockup-chip">Cylinder Boxes</span>
        <span className="mockup-chip">Gold Foil Leaf</span>
        <span className="mockup-chip">Festive Kits</span>
      </div>
    </div>
  );
}

// Interactive Demo 2: Kinetic Typography & Art Direction
function TypographyDemo({ onToast, accentColor }: { onToast: (msg: string) => void; accentColor: string }) {
  return (
    <div className="mockup-ribbon" style={{ maxWidth: "420px", borderTop: `4px solid ${accentColor}`, gap: "8px" }}>
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
          Art Direction
        </span>
        <span style={{ fontSize: "11px", fontWeight: 700 }}>Type Pairing &amp; Rhythm</span>
      </div>

      <div
        style={{
          background: "var(--chip)",
          border: "1.5px solid var(--line)",
          borderRadius: "8px",
          padding: "10px 12px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "15px", color: "var(--sk-ink)", fontWeight: 700 }}>
          &ldquo;Crafted from ancient estate harvests.&rdquo;
        </span>
        <span style={{ fontSize: "11px", color: "var(--mute)", fontFamily: "Consolas, monospace" }}>
          Nargis Reserve 2026 · Specimen A
        </span>
      </div>

      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
        <span className="mockup-chip">Bespoke Editorial</span>
        <span className="mockup-chip">D2C Identity</span>
        <span className="mockup-chip">Color Harmony</span>
      </div>
    </div>
  );
}

// Interactive Demo 3: Kinetic Anime Micro-Interactions
function KineticAnimeDemo({ onToast, accentColor }: { onToast: (msg: string) => void; accentColor: string }) {
  return (
    <div className="mockup-ribbon" style={{ maxWidth: "420px", borderTop: `4px solid ${accentColor}`, gap: "8px" }}>
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
          Kinetic Motion
        </span>
        <span style={{ fontSize: "11px", fontWeight: 700 }}>Spring Physics &amp; Squash</span>
      </div>

      <div style={{ width: "100%", padding: "4px 0" }}>
        <sakuga-slider
          label="Spring Elasticity"
          value="72"
          unit="%"
          onChange={(e: any) => onToast(`Spring Overshoot: ${e.target.value}%`)}
        ></sakuga-slider>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <sakuga-rating
          label="Motion Fidelity"
          value="5"
          onChange={() => onToast("Kinetic Rating: 5/5 Stars")}
        ></sakuga-rating>
        <span style={{ fontSize: "11px", fontWeight: 700, color: accentColor }}>30 FPS Drawn Art</span>
      </div>
    </div>
  );
}

// Interactive Demo 4: Manga Onomatopoeia Sound FX Engine
function MangaSFXDemo({ onToast, accentColor }: { onToast: (msg: string) => void; accentColor: string }) {
  const words = [
    { key: "don", label: "ドン (DON)", desc: "Heavy Impact" },
    { key: "shu", label: "シュッ (SHU)", desc: "Swift Dash" },
    { key: "gogo", label: "ゴゴゴ (GOGO)", desc: "Menacing Aura" },
    { key: "kachi", label: "カチッ (KACHI)", desc: "Snap Lock" },
    { key: "pon", label: "ポン (PON)", desc: "Soft Burst" },
  ];

  const triggerWord = (key: string, label: string, e: React.MouseEvent) => {
    const fx = (window as any).SakugaFX;
    if (fx) {
      if (typeof fx.sfx === "function") {
        fx.sfx(key, e.pageX, e.pageY - 50, { size: 95, life: 1.1 });
      }
      if (typeof fx.burst === "function") {
        fx.burst(e.pageX, e.pageY, { r: 35, spikes: 10, life: 0.4 });
      }
    }
    onToast(`Sound effect spawned: ${label}! · ガチッ!`);
  };

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
          Manga SFX Engine
        </span>
        <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--mute)" }}>
          Interactive Sound Lettering
        </span>
      </div>

      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", padding: "4px 0" }}>
        {words.map((w) => (
          <button
            key={w.key}
            type="button"
            className="pill"
            style={{
              padding: "4px 10px",
              fontSize: "11px",
              fontWeight: 800,
              background: "var(--chip)",
              borderColor: "var(--sk-ink)",
              boxShadow: "2px 2px 0 var(--sk-soft)",
              cursor: "pointer",
            }}
            onClick={(e) => triggerWord(w.key, w.label, e)}
            title={`Click to fire ${w.label} - ${w.desc}`}
          >
            {w.label}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "10.5px",
          color: "var(--mute)",
          width: "100%",
          paddingTop: "2px",
        }}
      >
        <span>Click buttons to blast lettering onto screen</span>
        <span style={{ fontWeight: 800, color: accentColor }}>Live Canvas FX</span>
      </div>
    </div>
  );
}

export default function BeyondProductPage() {
  const toastRef = useRef<any>(null);

  const showToast = (msg: string) => {
    toastRef.current?.show(msg);
  };

  return (
    <>
      <Header onToast={showToast} activePath="/beyond-product" />

      <div className="wrap">
        <section className="studio-hero" style={{ paddingBottom: "24px" }}>
          <div className="studio-intro-copy">
            <p className="eyebrow">BEYOND PRODUCT DESIGN</p>
            <h1>
              A little beyond<br />
              <em>the screen.</em>
            </h1>
            <p>
              I&apos;ve also spent years helping startups and ventures bring their vision to life through brand strategy, kinetic design systems, packaging, and creative coding.
            </p>
            <div className="studio-hero-links">
              <a
                className="pill"
                href="https://behance.net"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore Creative Practice ↗
              </a>
              <a className="pill" href="/">
                Back to Work ↑
              </a>
            </div>
          </div>
        </section>

        <section className="studio-work" style={{ borderTop: "none" }}>
          <div className="project-grid">
            {CREATIVE_PROJECTS.map((item, idx) => {
              const bgColors = [
                "rgba(143, 141, 247, 0.16)",
                "rgba(255, 95, 168, 0.14)",
                "rgba(0, 229, 255, 0.14)",
                "rgba(255, 210, 63, 0.18)",
              ];
              const accentColors = [
                "var(--sk-pri)",
                "var(--sk-acc)",
                "#00e5ff",
                "#f59e0b",
              ];
              const currentBg = bgColors[idx % bgColors.length];
              const currentAccent = accentColors[idx % accentColors.length];

              return (
                <article
                  key={item.id}
                  className="project-card"
                  style={{
                    boxShadow: `6px 7px 0 ${currentAccent}`,
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                >
                  <div
                    className="project-art"
                    style={{
                      background: currentBg,
                      borderBottom: "3px solid var(--sk-ink)",
                    }}
                  >
                    {item.id === "generative-posters" && (
                      <PackagingBrandDemo onToast={showToast} accentColor={currentAccent} />
                    )}
                    {item.id === "kinetic-typography" && (
                      <TypographyDemo onToast={showToast} accentColor={currentAccent} />
                    )}
                    {item.id === "procedural-canvas" && (
                      <KineticAnimeDemo onToast={showToast} accentColor={currentAccent} />
                    )}
                    {item.id === "manga-sfx-engine" && (
                      <MangaSFXDemo onToast={showToast} accentColor={currentAccent} />
                    )}
                  </div>

                  <div className="project-copy">
                    <div className="project-meta-row">
                      <span
                        className="project-badge"
                        style={{ color: currentAccent, borderColor: currentAccent }}
                      >
                        {item.category}
                      </span>
                      <span className="project-disciplines">{item.subtitle}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p style={{ color: "var(--mute)" }}>{item.description}</p>
                  </div>

                  <div className="project-acts">
                    <span style={{ fontSize: "12px", color: "var(--mute)" }}>Interactive Demo Active</span>
                    <button
                      className="pill"
                      type="button"
                      style={{
                        borderColor: "var(--sk-ink)",
                        boxShadow: `2px 2px 0 ${currentAccent}`,
                      }}
                      onClick={() => showToast(`Interacting with ${item.title}...`)}
                    >
                      View Project ↗
                    </button>
                  </div>
                </article>
              );
            })}
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

