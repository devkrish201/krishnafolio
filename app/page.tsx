"use client";

import { useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { MetricsStrip } from "@/components/sections/MetricsStrip";
import { WorkSection } from "@/components/sections/WorkSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { StoryboardSection } from "@/components/sections/StoryboardSection";

export default function Home() {
  const toastRef = useRef<any>(null);

  const showToast = (msg: string) => {
    toastRef.current?.show(msg);
  };

  return (
    <>
      {/* Sticky Header with Nav Links & Action */}
      <Header onToast={showToast} activePath="/" />

      <main className="wrap">
        {/* 2-Column Responsive Hero with 3D Avatar */}
        <HeroSection onToast={showToast} />

        {/* 6-Metric Highlights Strip */}
        <MetricsStrip />

        {/* 4 Deep Case Studies Grid */}
        <WorkSection onToast={showToast} />

        {/* Curiosity & Editorial Section */}
        <AboutSection onToast={showToast} />

        {/* Illustrated Memories / Storyboard */}
        <StoryboardSection onToast={showToast} />
      </main>

      {/* Footer & Contact Form */}
      <Footer onToast={showToast} />

      {/* Anime-Kinetic Floating Toast Notification */}
      <sakuga-toast
        ref={toastRef}
        style={{
          position: "fixed",
          left: "24px",
          bottom: "24px",
          zIndex: 99999,
        }}
      ></sakuga-toast>
    </>
  );
}
