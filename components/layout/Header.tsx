"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PROFILE_DATA } from "@/data/portfolioData";
import { useSakugaTheme } from "@/components/ui/SakugaThemeContext";

interface HeaderProps {
  onToast: (msg: string) => void;
  activePath?: string;
}

export function Header({ onToast, activePath }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentPath = activePath || pathname || "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isDark, toggleDark, currentMeta } = useSakugaTheme();
  const navTabsRef = useRef<HTMLElement | null>(null);

  const getActiveNavIndex = () => {
    if (currentPath === "/beyond-product") return 1;
    if (currentPath === "/life-and-all") return 2;
    if (currentPath === "/about") return 3;
    return 0; // "/"
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const el = navTabsRef.current;
    if (!el) return;
    const handleChange = (e: any) => {
      const val = e.detail?.value || (el as any).value;
      if (val) {
        if (val === "/" && currentPath === "/") {
          document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
        } else if (val !== currentPath) {
          router.push(val);
        }
      }
    };
    el.addEventListener("change", handleChange);
    return () => el.removeEventListener("change", handleChange);
  }, [currentPath, router]);

  // Handle ESC key and lock body scroll while drawer is open
  useEffect(() => {
    if (!mounted) return;

    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("mobile-drawer-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("mobile-drawer-open");
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("mobile-drawer-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen, mounted]);

  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextState = !mobileOpen;
    setMobileOpen(nextState);

    // Fire SakugaFX particle burst for tactile feedback
    const fx = (window as any).SakugaFX;
    if (fx && typeof fx.ticks === "function") {
      fx.ticks(e.pageX, e.pageY, { n: 6, r: 16, len: 20, life: 0.4 });
    }

    if (onToast) {
      onToast(nextState ? "Menu opened · シュッ!" : "Menu closed");
    }
  };

  const handleNavClick = (href: string, label: string) => {
    setMobileOpen(false);
    if (onToast) onToast(`Navigating to ${label}`);

    // If anchor on current page, smooth scroll
    if (href.startsWith("/#") && currentPath === "/") {
      const id = href.replace("/#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 120);
      }
    }
  };

  return (
    <header id="site-header">
      <div className="nav-shell">
        {/* Brand with Satoru Gojo Animated Cursor Logo */}
        <Link
          className="brand"
          href="/"
          onClick={() => {
            setMobileOpen(false);
            onToast(`${PROFILE_DATA.name} — Home`);
          }}
        >
          <div className="brand-monogram" title="Satoru Gojo">
            <img
              src="/gojo-logo.png"
              alt="Satoru Gojo Logo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
          <div className="brand-text">
            <span className="brand-name">{PROFILE_DATA.name}</span>
            <small className="brand-role">{PROFILE_DATA.role}</small>
          </div>
        </Link>

        {/* Desktop & Tablet Navigation Bar using Sakuga Tabs */}
        <nav aria-label="Main Navigation" className="desktop-nav">
          <sakuga-tabs
            ref={navTabsRef}
            label="Main Navigation"
            selected={getActiveNavIndex()}
          >
            <option value="/">Work</option>
            <option value="/beyond-product">Beyond Product</option>
            <option value="/life-and-all">Life &amp; Play</option>
            <option value="/about">About</option>
          </sakuga-tabs>
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          {/* Quick Header Theme Toggle */}
          <button
            type="button"
            className="header-theme-toggle"
            onClick={(e) => {
              toggleDark();
              onToast(isDark ? "Switched to Light Theme" : "Switched to Dark Theme");
              const fx = (window as any).SakugaFX;
              if (fx && typeof fx.burst === "function") {
                fx.burst(e.pageX, e.pageY, { r: 35, spikes: 10, life: 0.35 });
              }
            }}
            title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
            aria-label={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
          >
            <span className="theme-toggle-dot" />
            {isDark ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          <div className="desktop-only-btn">
            <sakuga-button
              variant="secondary"
              href="#contact"
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                onToast("Let's talk!");
              }}
            >
              Let&apos;s talk ↗
            </sakuga-button>
          </div>

          {/* Sakuga 3-Bar Hamburger Trigger Button */}
          <button
            type="button"
            className={`sakuga-nav-burger ${mobileOpen ? "is-open" : ""}`}
            onClick={toggleMobileMenu}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
          >
            <span className="burger-bar bar-1"></span>
            <span className="burger-bar bar-2"></span>
            <span className="burger-bar bar-3"></span>
          </button>
        </div>
      </div>

      {/* Render Mobile Sidebar Drawer via React Portal directly into body to escape header stacking context & backdrop-filter */}
      {mounted &&
        createPortal(
          <>
            <div
              className={`sakuga-mobile-backdrop ${mobileOpen ? "is-active" : ""}`}
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            <aside
              className={`sakuga-mobile-drawer ${mobileOpen ? "is-active" : ""}`}
              aria-label="Mobile Navigation"
            >
              {/* Drawer Top Header Row */}
              <div className="drawer-header">
                <div className="drawer-brand">
                  <div className="brand-monogram" style={{ width: "38px", height: "38px" }}>
                    <img
                      src="/gojo-logo.png"
                      alt="Satoru Gojo"
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  </div>
                  <div>
                    <strong style={{ fontSize: "14.5px", display: "block", color: "var(--sk-ink)" }}>
                      {PROFILE_DATA.name}
                    </strong>
                    <span className="hero-role-tag" style={{ fontSize: "10px", padding: "2px 8px" }}>
                      Systems Designer
                    </span>
                  </div>
                </div>

                {/* Tactile Close Button */}
                <button
                  type="button"
                  className="drawer-close-btn"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              {/* Drawer Navigation Links */}
              <div className="drawer-nav-list">
                <Link
                  href="/#work"
                  className={`drawer-link ${currentPath === "/" ? "is-active" : ""}`}
                  onClick={() => handleNavClick("/#work", "Selected Work")}
                >
                  <span className="drawer-link-num">01</span>
                  <span className="drawer-link-text">Selected Work</span>
                  <span className="drawer-link-arrow">→</span>
                </Link>

                <Link
                  href="/beyond-product"
                  className={`drawer-link ${currentPath === "/beyond-product" ? "is-active" : ""}`}
                  onClick={() => handleNavClick("/beyond-product", "Beyond Product")}
                >
                  <span className="drawer-link-num">02</span>
                  <span className="drawer-link-text">Beyond Product</span>
                  <span className="drawer-link-arrow">→</span>
                </Link>

                <Link
                  href="/life-and-all"
                  className={`drawer-link ${currentPath === "/life-and-all" ? "is-active" : ""}`}
                  onClick={() => handleNavClick("/life-and-all", "Life & Play")}
                >
                  <span className="drawer-link-num">03</span>
                  <span className="drawer-link-text">Life &amp; Play</span>
                  <span className="drawer-link-arrow">→</span>
                </Link>

                <Link
                  href="/about"
                  className={`drawer-link ${currentPath === "/about" ? "is-active" : ""}`}
                  onClick={() => handleNavClick("/about", "About")}
                >
                  <span className="drawer-link-num">04</span>
                  <span className="drawer-link-text">About &amp; Story</span>
                  <span className="drawer-link-arrow">→</span>
                </Link>
              </div>

              {/* Contact Button Only (Clean Minimalist Sidebar) */}
              <div className="drawer-footer-cta">
                <a
                  className="contact-nav-btn"
                  href="#contact"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    minHeight: "48px",
                    fontSize: "14.5px",
                  }}
                  onClick={() => {
                    setMobileOpen(false);
                    onToast("Let's talk!");
                  }}
                >
                  Let&apos;s build together ↗
                </a>
              </div>
            </aside>
          </>,
          document.body
        )}
    </header>
  );
}
