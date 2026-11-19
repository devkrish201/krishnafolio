"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSakugaTheme } from "./SakugaThemeContext";
import { PROFILE_DATA } from "@/data/portfolioData";

interface SakugaFloatingControlsProps {
  onToast?: (msg: string) => void;
}

export function SakugaFloatingControls({ onToast }: SakugaFloatingControlsProps) {
  const { theme, currentMeta, themes, isDark, setTheme, toggleDark } = useSakugaTheme();
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const paletteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 280);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close palette when clicking outside
  useEffect(() => {
    if (!paletteOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (paletteRef.current && !paletteRef.current.contains(e.target as Node)) {
        setPaletteOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [paletteOpen]);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fx = (window as any).SakugaFX;
    if (fx && typeof fx.burst === "function") {
      fx.burst(e.pageX, e.pageY, { r: 50, spikes: 14, life: 0.4 });
    }
    if (onToast) onToast("Back to top · シュッ!");
  };

  const handlePhoneClick = (e: React.MouseEvent) => {
    const fx = (window as any).SakugaFX;
    if (fx && typeof fx.ticks === "function") {
      fx.ticks(e.pageX, e.pageY, { n: 8, r: 20, len: 22, life: 0.45 });
    }
    if (onToast) onToast("Dialing Krishna · Direct line dialer ready");
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    const fx = (window as any).SakugaFX;
    if (fx && typeof fx.burst === "function") {
      fx.burst(e.pageX, e.pageY, { r: 35, spikes: 10, life: 0.35 });
    }
    if (onToast) onToast("Opening WhatsApp chat with Krishna...");
  };

  const phoneNumber = (PROFILE_DATA.socials as any).phone || "+91 98765 43210";
  const rawNumber = phoneNumber.replace(/\D/g, "");

  return (
    <>
      {/* ========================================================
          LEFT SIDE: SAKUGA FLOATING WHATSAPP & CALL LOGO BUTTONS
          (Clean Minimalist Icons Only - No Text / Numbers)
          ======================================================== */}
      <div
        className="sakuga-floating-phone-dock"
        style={{
          position: "fixed",
          bottom: "24px",
          left: "24px",
          zIndex: 2147483600,
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {/* 1. Sakuga WhatsApp Logo Button (Icon Only) */}
        <a
          href={`https://wa.me/${rawNumber}?text=Hi%20Krishna,%20I%20saw%20your%20portfolio!`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppClick}
          className="sakuga-float-btn sakuga-wa-btn"
          title="WhatsApp Krishna"
          aria-label="WhatsApp Krishna"
          style={{
            width: "46px",
            height: "46px",
            borderRadius: "14px",
            background: "var(--sk-card)",
            border: "2.5px solid var(--sk-ink)",
            boxShadow: "3px 4px 0 var(--sk-soft)",
            color: "#25D366",
            display: "grid",
            placeItems: "center",
            textDecoration: "none",
            cursor: "pointer",
            transition: "transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.15s ease",
            flexShrink: 0,
          }}
        >
          <svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z"/>
          </svg>
        </a>

        {/* 2. Sakuga Direct Phone Call Logo Button (Icon Only) */}
        <a
          href={`tel:${rawNumber}`}
          onClick={handlePhoneClick}
          className="sakuga-float-btn sakuga-call-btn"
          title={`Call Krishna: ${phoneNumber}`}
          aria-label={`Call Krishna: ${phoneNumber}`}
          style={{
            width: "46px",
            height: "46px",
            borderRadius: "14px",
            background: "var(--sk-card)",
            border: "2.5px solid var(--sk-ink)",
            boxShadow: "3px 4px 0 var(--sk-soft)",
            color: "var(--sk-ink)",
            display: "grid",
            placeItems: "center",
            textDecoration: "none",
            cursor: "pointer",
            transition: "transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.15s ease",
            flexShrink: 0,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        </a>
      </div>

      {/* ========================================================
          RIGHT SIDE: THEME CONTROLS & FLOATING ARROW TOP
          ======================================================== */}
      <div
        className="sakuga-floating-right-dock"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 2147483600,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "10px",
        }}
      >
        {/* Expandable Multi-Theme Palette Picker Popover */}
        {paletteOpen && (
          <div
            ref={paletteRef}
            className="sakuga-theme-palette-modal"
            style={{
              background: "var(--sk-card)",
              border: "3px solid var(--sk-ink)",
              borderRadius: "20px",
              padding: "16px",
              boxShadow: "0 14px 36px rgba(29, 26, 74, 0.25), 6px 7px 0 var(--sk-soft)",
              width: "min(320px, 86vw)",
              marginBottom: "8px",
              animation: "sakuga-bubble-pop 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1.5px solid var(--line)",
                paddingBottom: "10px",
                marginBottom: "12px",
              }}
            >
              <div>
                <strong style={{ fontSize: "14px", color: "var(--sk-ink)", display: "block" }}>
                  Sakuga Themes
                </strong>
                <small style={{ fontSize: "11px", color: "var(--mute)" }}>
                  Each theme has Light &amp; Dark mode
                </small>
              </div>
              <button
                type="button"
                className="pill"
                onClick={() => setPaletteOpen(false)}
                style={{
                  minHeight: "28px",
                  padding: "0 10px",
                  fontSize: "11px",
                  fontWeight: 800,
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: "grid", gap: "8px", maxHeight: "340px", overflowY: "auto" }}>
              {themes.map((t) => {
                const isSelected = t.id === theme;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={(e) => {
                      setTheme(t.id);
                      if (onToast) onToast(`Theme: ${t.name} (${t.category.toUpperCase()})`);
                      const fx = (window as any).SakugaFX;
                      if (fx && typeof fx.ticks === "function") {
                        fx.ticks(e.pageX, e.pageY, { n: 6, r: 16, len: 18, life: 0.35 });
                      }
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 12px",
                      borderRadius: "12px",
                      border: isSelected ? "2.5px solid var(--sk-ink)" : "1.5px solid var(--line)",
                      background: isSelected ? "var(--chip)" : "transparent",
                      boxShadow: isSelected ? "2.5px 3px 0 var(--sk-soft)" : "none",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {/* Category SVG Icon: Sun for light, Moon for dark */}
                      {t.category === "dark" ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="5"></circle>
                          <line x1="12" y1="1" x2="12" y2="3"></line>
                          <line x1="12" y1="21" x2="12" y2="23"></line>
                          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                          <line x1="1" y1="12" x2="3" y2="12"></line>
                          <line x1="21" y1="12" x2="23" y2="12"></line>
                          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                        </svg>
                      )}
                      <div>
                        <span style={{ fontSize: "12px", fontWeight: 800, color: "var(--sk-ink)", display: "block" }}>
                          {t.name}
                        </span>
                        <span style={{ fontSize: "10px", color: "var(--mute)" }}>
                          {t.badge}
                        </span>
                      </div>
                    </div>

                    {/* Color Swatch Dot Trio */}
                    <div style={{ display: "flex", gap: "4px" }}>
                      <span
                        style={{
                          width: "11px",
                          height: "11px",
                          borderRadius: "50%",
                          background: t.palette.bg,
                          border: "1.5px solid var(--sk-ink)",
                        }}
                      />
                      <span
                        style={{
                          width: "11px",
                          height: "11px",
                          borderRadius: "50%",
                          background: t.palette.pri,
                          border: "1.5px solid var(--sk-ink)",
                        }}
                      />
                      <span
                        style={{
                          width: "11px",
                          height: "11px",
                          borderRadius: "50%",
                          background: t.palette.acc,
                          border: "1.5px solid var(--sk-ink)",
                        }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Buttons Row: Theme Toggle, Palette Menu, Scroll to Top Arrow */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* Symmetrical Light/Dark Mode Toggle SVG Button */}
          <button
            type="button"
            className="sakuga-float-btn sakuga-theme-toggle-btn"
            onClick={(e) => {
              toggleDark();
              if (onToast) onToast(isDark ? "Switched to Light Mode" : "Switched to Dark Mode");
              const fx = (window as any).SakugaFX;
              if (fx && typeof fx.burst === "function") {
                fx.burst(e.pageX, e.pageY, { r: 35, spikes: 10, life: 0.35 });
              }
            }}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "14px",
              border: "2.5px solid var(--sk-ink)",
              background: "var(--sk-card)",
              boxShadow: "3px 4px 0 var(--sk-soft)",
              color: "var(--sk-ink)",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              transition: "transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.15s ease",
            }}
          >
            {isDark ? (
              /* Sun SVG Icon */
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              /* Moon SVG Icon */
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          {/* Palette SVG Button (Opens multi-theme selector) */}
          <button
            type="button"
            className="sakuga-float-btn sakuga-palette-toggle-btn"
            onClick={() => setPaletteOpen(!paletteOpen)}
            title={`Active Theme: ${currentMeta.name}. Click to switch themes.`}
            aria-label="Open themes switcher"
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "14px",
              border: "2.5px solid var(--sk-ink)",
              background: "var(--sk-card)",
              boxShadow: "3px 4px 0 var(--sk-soft)",
              color: "var(--sk-ink)",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              transition: "transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.15s ease",
            }}
          >
            {/* Palette SVG Icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
              <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
              <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
              <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
            </svg>
          </button>

          {/* Floating Arrow Top in Right (SVG Up Arrow) */}
          {showTopBtn && (
            <button
              type="button"
              className="sakuga-float-btn sakuga-top-arrow-btn"
              onClick={scrollToTop}
              title="Scroll to Top"
              aria-label="Scroll to Top"
              style={{
                width: "46px",
                height: "46px",
                borderRadius: "14px",
                border: "2.5px solid var(--sk-ink)",
                background: "var(--sk-pri)",
                boxShadow: "3px 4px 0 var(--sk-soft)",
                color: "var(--sk-on-pri)",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
                transition: "transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.15s ease",
                animation: "sakuga-bubble-pop 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              {/* Up Arrow SVG Icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5 12 12 5 19 12"></polyline>
              </svg>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
