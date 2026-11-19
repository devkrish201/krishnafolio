"use client";

import React, { useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LIFE_MEMORIES } from "@/data/lifeData";

export default function LifeAndAllPage() {
  const toastRef = useRef<any>(null);

  const showToast = (msg: string) => {
    toastRef.current?.show(msg);
  };

  return (
    <>
      <Header onToast={showToast} activePath="/life-and-all" />

      <div className="wrap">
        <section className="studio-hero" style={{ paddingBottom: "24px" }}>
          <div className="studio-intro-copy">
            <p className="eyebrow">PLAYGROUND &amp; LIFE</p>
            <h1>
              Life and all<br />
              <em>the rest.</em>
            </h1>
            <p>
              Beyond pixels and design systems: snapshots of travels, craftsmanship, homemade recipes, architecture, and little memories that keep curiosity sharp.
            </p>
          </div>
        </section>

        <section className="studio-work" style={{ borderTop: "none" }}>
          <div className="project-grid">
            {LIFE_MEMORIES.map((item, idx) => {
              const bgColors = [
                "rgba(143, 141, 247, 0.16)",
                "rgba(255, 95, 168, 0.14)",
                "rgba(0, 229, 255, 0.14)",
                "rgba(255, 210, 63, 0.18)",
              ];
              const accentColors = ["var(--sk-pri)", "var(--sk-acc)", "#00e5ff", "#f59e0b"];
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
                      height: "200px",
                      background: currentBg,
                      borderBottom: "3px solid var(--sk-ink)",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <span
                        className="project-badge"
                        style={{ color: currentAccent, borderColor: currentAccent }}
                      >
                        {item.tag}
                      </span>
                      <h3 style={{ marginTop: "12px", fontSize: "19px" }}>{item.title}</h3>
                    </div>
                  </div>

                  <div className="project-copy">
                    <div className="project-meta-row">
                      <span className="project-badge">{item.category}</span>
                      <span className="project-disciplines">Memory #{item.id}</span>
                    </div>
                    <p style={{ color: "var(--mute)" }}>{item.description}</p>
                  </div>

                  <div className="project-acts">
                    <sakuga-button
                      variant="secondary"
                      onClick={() => showToast(`${item.title}: ${item.description}`)}
                    >
                      View Snapshot
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

