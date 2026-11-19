import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { SakugaCursor } from "@/components/ui/SakugaCursor";
import { SakugaScrollProgress } from "@/components/ui/SakugaScrollProgress";
import { SakugaThemeProvider } from "@/components/ui/SakugaThemeContext";
import { SakugaFloatingControls } from "@/components/ui/SakugaFloatingControls";
import { SakugaPreloader } from "@/components/ui/SakugaPreloader";

export const metadata: Metadata = {
  title: "Krishna Sahoo — Product & Systems Designer",
  description: "Portfolio of Krishna Sahoo built with the Sakuga VFX anime-kinetic design system.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        {/* Instant SSR Theme Initialization to prevent Flash of Unstyled Theme */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var savedTheme = localStorage.getItem('sakuga-theme') || 'primary';
                document.documentElement.setAttribute('data-theme', savedTheme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {/* Next.js Managed Sakuga VFX Web Component Scripts (Safe from Extension Interference) */}
        <Script src="/sakuga-vfx/button.js" strategy="afterInteractive" />
        <Script src="/sakuga-vfx/toggle.js" strategy="afterInteractive" />
        <Script src="/sakuga-vfx/slider.js" strategy="afterInteractive" />
        <Script src="/sakuga-vfx/checkbox.js" strategy="afterInteractive" />
        <Script src="/sakuga-vfx/radio.js" strategy="afterInteractive" />
        <Script src="/sakuga-vfx/input.js" strategy="afterInteractive" />
        <Script src="/sakuga-vfx/tabs.js" strategy="afterInteractive" />
        <Script src="/sakuga-vfx/progress.js" strategy="afterInteractive" />
        <Script src="/sakuga-vfx/rating.js" strategy="afterInteractive" />
        <Script src="/sakuga-vfx/toast.js" strategy="afterInteractive" />
        <Script src="/sakuga-vfx/tooltip.js" strategy="afterInteractive" />

        <SakugaThemeProvider>
          {/* Kinetic Sakuga Anime Preloader with Hero Mascot Character */}
          <SakugaPreloader />

          {/* Real-time Top Scroll Progress Indicator */}
          <SakugaScrollProgress />

          {/* Global Anime-Kinetic Custom Mouse Cursor & Particle Burst */}
          <SakugaCursor />

          {children}

          {/* Sakuga Floating Controls: Phone Dock (Bottom-Left), Theme Switcher & Back to Top Arrow (Bottom-Right) */}
          <SakugaFloatingControls />
        </SakugaThemeProvider>
      </body>
    </html>
  );
}
