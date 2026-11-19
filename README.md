# Krishna Sahoo — Product & Systems Designer Portfolio

> Interactive, kinetic Sakuga VFX-inspired portfolio built with **Next.js 16**, **React 19**, **TypeScript**, and modern web standards.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

---

## ⚡ Features & Highlights

- **Sakuga VFX Design Language**: Cel-shaded typography, solid flat lilac offset shadows, electric pink accents, spring physics, and organic animated canvas effects.
- **Symmetrical 10-Theme Engine**: 5 paired color families with instant Light ⇄ Dark switching:
  - 🌸 **Sakura**: Sakura Lilac ⇄ Gojo Void Dark
  - 🌻 **Sunflower**: Gold Light ⇄ Honey Espresso Dark
  - ⚡ **Cyber**: Mint Light ⇄ Neo Tokyo Obsidian Dark
  - 🤖 **Eva**: Mecha Light ⇄ Unit-01 Dark
  - 🩸 **Crimson**: Nichirin Light ⇄ Blood Moon Dark
- **Tactile Manga Domain Poster**: Interactive JJK Satoru Gojo cover art featuring Domain Expansion hand seal, cursed energy aura, and responsive unboxed manga screentones.
- **Custom Dandadan Crosshair Cursor**: Kinetic occult spirit crosshair with clickable particle lock and charge animations.
- **Zero-Dependency Vector System**: 100% SVG inline vector marks across theme FABs, mobile drawer, work cards, and footer controls.
- **Mobile-First Responsive Navigation**: Seamless 3-bar hamburger drawer with spring motion, touch target affordance, and clean information hierarchy.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (Turbopack, App Router)](https://nextjs.org)
- **Library**: [React 19](https://react.dev)
- **Language**: [TypeScript 5](https://www.typescriptlang.org)
- **Styling**: Vanilla CSS Variables & Sakuga Web Components
- **Hosting**: [Netlify](https://www.netlify.com)

---

## 🚀 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/devkrish201/krishnafolio.git
   cd krishnafolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local dev server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Production Build**:
   ```bash
   npm run build
   npm run start
   ```

---

## 🌐 Deploy to Netlify

This repository includes a pre-configured `netlify.toml`:

```toml
[build]
  command = "npm run build"

[build.environment]
  NODE_VERSION = "20"
```

### Steps:
1. Go to [Netlify Dashboard](https://app.netlify.com).
2. Click **"Add new site"** > **"Import an existing project"**.
3. Choose **GitHub** and select **`devkrish201/krishnafolio`**.
4. Netlify will automatically detect Next.js with build command `npm run build`.
5. Click **"Deploy site"** — your portfolio is live!

---

## 📄 License

MIT © [Krishna Sahoo](https://github.com/devkrish201)
