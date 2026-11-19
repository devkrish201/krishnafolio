"use client";

import React, { useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CREATIVE_PROJECTS } from "@/data/creativeData";

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
              <sakuga-button
                href="https://behance.net"
                target="_blank"
                onClick={() => {
                  window.open("https://behance.net", "_blank", "noopener,noreferrer");
                  showToast("Opening Creative Practice...");
                }}
              >
                Explore Creative Practice ↗
              </sakuga-button>
              <sakuga-button
                variant="secondary"
                href="/"
                onClick={() => showToast("Navigating back to work...")}
              >
                Back to Work ↑
              </sakuga-button>
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
              ];
              const accentColors = ["var(--sk-pri)", "var(--sk-acc)", "#00e5ff"];
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
                    <div className="mockup-ribbon" style={{ maxWidth: "380px", borderTop: `4px solid ${currentAccent}` }}>
                      <div className="mockup-toolbar">
                        <span
                          className="mockup-chip"
                          style={{
                            background: currentAccent,
                            color: idx === 2 ? "#0c0a24" : "#ffffff",
                            fontWeight: 800,
                            border: "1.5px solid var(--sk-ink)",
                          }}
                        >
                          {item.category}
                        </span>
                        <span style={{ fontSize: "11.5px", fontWeight: 700 }}>{item.subtitle}</span>
                      </div>
                      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", padding: "8px 0" }}>
                        {item.tags.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="mockup-chip"
                            style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
                          >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
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
                    <span style={{ fontSize: "12px", color: "var(--mute)" }}>Crafted with Sakuga care</span>
                    <sakuga-button
                      variant="secondary"
                      onClick={() => showToast(`Viewing ${item.title}...`)}
                    >
                      View Project ↗
                    </sakuga-button>
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

