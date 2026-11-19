import type { Metadata } from "next";
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
      <head>
        {/* Instant SSR Theme Initialization to prevent Flash of Unstyled Theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var savedTheme = localStorage.getItem('sakuga-theme') || 'primary';
                document.documentElement.setAttribute('data-theme', savedTheme);
              } catch (e) {}
            `,
          }}
        />
        <script src="/sakuga-vfx/button.js" defer></script>
        <script src="/sakuga-vfx/toggle.js" defer></script>
        <script src="/sakuga-vfx/slider.js" defer></script>
        <script src="/sakuga-vfx/checkbox.js" defer></script>
        <script src="/sakuga-vfx/radio.js" defer></script>
        <script src="/sakuga-vfx/input.js" defer></script>
        <script src="/sakuga-vfx/tabs.js" defer></script>
        <script src="/sakuga-vfx/progress.js" defer></script>
        <script src="/sakuga-vfx/rating.js" defer></script>
        <script src="/sakuga-vfx/toast.js" defer></script>
        <script src="/sakuga-vfx/tooltip.js" defer></script>
      </head>
      <body suppressHydrationWarning>
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
