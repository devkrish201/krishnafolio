export interface CreativeProject {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  tags: string[];
}

export const CREATIVE_PROJECTS: CreativeProject[] = [
  {
    id: "generative-posters",
    title: "Phool & Festive Brand Identities",
    subtitle: "Packaging & Visual Narrative",
    category: "Brand & Packaging",
    description: "Illustrated gift packaging, essential oil cylinders, and festive unboxing experiences celebrating craftsmanship and organic materials.",
    tags: ["Packaging", "Illustration", "Brand Identity"],
  },
  {
    id: "kinetic-typography",
    title: "Nargis Tea & Metta Skincare",
    subtitle: "Art Direction & Storytelling",
    category: "Packaging & Strategy",
    description: "Vibrant storytelling through typography and color systems for modern consumer packaged goods and direct-to-consumer lifestyle brands.",
    tags: ["Art Direction", "CPG", "Visual Strategy"],
  },
  {
    id: "procedural-canvas",
    title: "Kinetic Anime Micro-Interactions",
    subtitle: "Creative Coding & Motion",
    category: "Creative Coding",
    description: "Exploring the boundary between high-precision UI engineering, spring physics, and drawn manga sound effects.",
    tags: ["Canvas API", "Springs", "Sakuga VFX"],
  },
];

