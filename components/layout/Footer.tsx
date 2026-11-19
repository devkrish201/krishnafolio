import React, { useRef } from "react";
import { PROFILE_DATA } from "@/data/portfolioData";

interface FooterProps {
  onToast: (msg: string) => void;
}

export function Footer({ onToast }: FooterProps) {
  const contactBtnRef = useRef<any>(null);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactBtnRef.current) {
      setTimeout(() => {
        contactBtnRef.current.done();
        onToast("Message received! Krishna will reply promptly.");
      }, 700);
    }
  };

  return (
    <footer id="site-footer">
      <div className="wrap">
        <section className="contact-section" id="contact">
          <div className="contact-left">
            <span className="eyebrow">GET IN TOUCH</span>
            <h2>
              Let&apos;s make something <em>matter.</em>
            </h2>
            <p className="contact-desc">
              Have an ambitious product, design system, or kinetic AI interface in mind? Whether you want to collaborate on a new project or explore an engineering role, let&apos;s build something remarkable.
            </p>
            <div className="contact-social-row">
              <a className="pill" href={`mailto:${PROFILE_DATA.socials.email}`}>Email ↗</a>
              <a className="pill" href={PROFILE_DATA.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
              <a className="pill" href={PROFILE_DATA.socials.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            </div>
          </div>

          <div className="contact-right">
            <h3>Send a Message</h3>
            <form onSubmit={handleContactSubmit}>
              <div className="contact-form-stack">
                <sakuga-input
                  label="Your Name"
                  placeholder="Enter your name"
                  type="text"
                  required
                ></sakuga-input>
                <sakuga-input
                  label="Your Email"
                  placeholder="name@example.com"
                  type="email"
                  required
                ></sakuga-input>
                <sakuga-input
                  label="Project Brief"
                  placeholder="What are you building?"
                  type="text"
                  required
                ></sakuga-input>
                <div className="contact-btn-row">
                  <sakuga-button ref={contactBtnRef} type="submit">
                    Send Message
                  </sakuga-button>
                  <sakuga-button
                    variant="secondary"
                    type="button"
                    onClick={() => onToast("Draft reset")}
                  >
                    Reset
                  </sakuga-button>
                </div>

                {/* Sakuga Direct Phone Contact Card below contact button */}
                <div
                  className="contact-phone-direct-card"
                  style={{
                    marginTop: "20px",
                    padding: "14px 16px",
                    borderRadius: "16px",
                    border: "2px solid var(--sk-ink)",
                    background: "var(--chip)",
                    boxShadow: "3px 3px 0 var(--sk-soft)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: "var(--sk-pri)",
                        color: "var(--sk-on-pri)",
                        boxShadow: "0 0 10px var(--sk-pri)",
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </span>
                    <div>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--mute)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block" }}>
                        Prefer a direct conversation?
                      </span>
                      <a
                        href={`tel:${PROFILE_DATA.socials.phone.replace(/\s+/g, "")}`}
                        style={{
                          fontSize: "14.5px",
                          fontWeight: 800,
                          color: "var(--sk-ink)",
                          textDecoration: "none",
                        }}
                      >
                        {PROFILE_DATA.socials.phone}
                      </a>
                    </div>
                  </div>

                  <a
                    href={`tel:${PROFILE_DATA.socials.phone.replace(/\s+/g, "")}`}
                    className="pill"
                    style={{
                      background: "var(--sk-card)",
                      border: "2px solid var(--sk-ink)",
                      boxShadow: "2px 2px 0 var(--sk-soft)",
                      fontSize: "12px",
                      fontWeight: 800,
                      padding: "0 14px",
                      minHeight: "34px",
                    }}
                    onClick={() => onToast("Dialing Krishna's direct line...")}
                  >
                    Call Now ↗
                  </a>
                </div>
              </div>
            </form>
          </div>
        </section>

        <div className="footer-bottom">
          <span>Vibe coded. Designer approved. Made with Sakuga VFX &lt;3</span>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
