export interface Project {
  id: string;
  number: string;
  badge: string;
  title: string;
  category: string;
  disciplines: string;
  description: string;
  featured?: boolean;
  metrics?: { label: string; value: string }[];
  tags: string[];
  linkText?: string;
  interactiveType: "button" | "slider" | "checkbox" | "progress";
}

export interface Metric {
  value: string;
  label: string;
}

export const PROFILE_DATA = {
  name: "Krishna Sahoo",
  role: "Product & Systems Designer",
  status: "Available for projects",
  isAvailable: true,
  headline: "Solving real problems with AI. Crafting stories that connect.",
  intro:
    "For the past 3.5+ years, I've been designing and engineering experiences for enterprise productivity and design systems, helping people turn complex workflows into intuitive, compelling stories. I focus on using AI where it truly matters, making high-friction tasks simpler and meaningful.",
  avatar: "/krishna-cutout.png",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "krishna@example.com",
    phone: "+91 98765 43210",
  },
};

export const METRICS_DATA: Metric[] = [
  { value: "5,000+", label: "Icons & design tokens created and redesigned" },
  { value: "4", label: "Enterprise productivity web apps powered" },
  { value: "30+", label: "Icons / day produced at system scale" },
  { value: "+24 pts", label: "Suite HVS benchmark satisfaction gain" },
  { value: "~60%", label: "Users rated experience ≥4 stars" },
  { value: "20 ms", label: "Faster Time to Visual Readiness" },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "fox-icons",
    number: "01",
    badge: "Featured Flagship",
    title: "FOX Icons",
    category: "Design Systems",
    disciplines: "Icon Design · Production Ownership · Design Systems",
    description:
      "Leading icon production, quality, and FOX expansion across Office web apps. Scaled 5,000+ icons, powered 4 flagship web apps, delivered +24 points benchmark gain, and reduced Time to Visual Readiness by 20ms.",
    featured: true,
    tags: ["Office Web Apps", "5,000+ Icons", "+24 pts HVS", "Design System"],
    interactiveType: "button",
  },
  {
    id: "making-icons-searchable",
    number: "02",
    badge: "AI Tooling",
    title: "Making Icons Searchable",
    category: "AI Tooling",
    disciplines: "AI · Figma Plugin · Creative Coding",
    description:
      "An AI-powered Figma plugin that organizes 5,000+ vector icons using multi-modal embeddings, eliminating manual tagging and saving over 8,000 minutes of designer time.",
    tags: ["Figma Plugin", "Vector Embeddings", "8,000 min saved"],
    interactiveType: "slider",
  },
  {
    id: "template-validator",
    number: "03",
    badge: "UX Design",
    title: "Template Validator",
    category: "UX Design",
    disciplines: "UX Design · Content Design · AI Explainability",
    description:
      "Helping creators and enterprise teams build PowerPoint templates that work seamlessly with Microsoft 365 Copilot, providing automated AI explainability and design audit checks.",
    tags: ["Copilot AI", "Accessibility", "Design Audit"],
    interactiveType: "checkbox",
  },
  {
    id: "bug-logger",
    number: "04",
    badge: "AI Tooling",
    title: "Bug Logger",
    category: "AI Tooling",
    disciplines: "UX Design · AI Workflows · Bug Bashing",
    description:
      "Turning chaotic bug bashes into structured, triage-ready bugs using AI, without breaking the testing flow. Captures context, formats repro steps, and routes issues automatically.",
    tags: ["Developer UX", "Automated Triage", "AI Workflows"],
    interactiveType: "progress",
  },
];

export const MEMORIES_DATA = [
  {
    title: "NYC Subway Composition",
    note: "A colorful route map in a blue-edged frame, a yellow train, and handwritten notes about a maze of lines coming together in harmony.",
  },
  {
    title: "Filter Kaapi & Pho",
    note: "Yellow coffee filter, brown drips, pink steam, morning notes, and the unmistakable aroma of street cafes.",
  },
  {
    title: "Sakuga Kinetic Engine",
    note: "Volume-preserving squash, two tones and a line, manga impact frames, and springs that feel alive.",
  },
];

