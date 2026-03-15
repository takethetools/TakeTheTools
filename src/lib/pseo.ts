import { TOOLS } from "./tools";

export interface PSEOVariation {
  slug: string;
  toolSlug: string;
  type: "online" | "free" | "best" | "how-to" | "how-to-use";
  titleTemplate: string;
  h1Template: string;
}

export const PSEO_PATTERNS = [
  { suffix: "-online", type: "online", title: "{name} Online – Free Tool | TakeTheTools", h1: "{name} Online" },
  { suffix: "-online-free", type: "free", title: "{name} Online Free – Instant Access | TakeTheTools", h1: "{name} Online Free" },
  { prefix: "best-", suffix: "-online", type: "best", title: "Best {name} Online – Reliable & Free | TakeTheTools", h1: "Best {name} Online" },
  { prefix: "how-to-", suffix: "-online", type: "how-to", title: "How to {name} Online – Step-by-Step Guide | TakeTheTools", h1: "How to {name} Online" },
  { prefix: "how-to-use-", suffix: "-online", type: "how-to-use", title: "How to Use {name} Online – Full Instructions | TakeTheTools", h1: "How to Use {name} Online" },
];

export function getPSEOContext(slug: string) {
  for (const tool of TOOLS) {
    for (const pattern of PSEO_PATTERNS) {
      const { prefix = "", suffix = "" } = pattern;
      const expectedSlug = `${prefix}${tool.slug}${suffix}`;
      
      if (slug === expectedSlug) {
        return {
          tool,
          type: pattern.type,
          title: pattern.title.replace("{name}", tool.name),
          h1: pattern.h1.replace("{name}", tool.name),
          canonical: `https://takethetools.com/${expectedSlug}`
        };
      }
    }
  }
  return null;
}

export function getAllPSEORoutes() {
  const routes: string[] = [];
  TOOLS.forEach(tool => {
    PSEO_PATTERNS.forEach(pattern => {
      const { prefix = "", suffix = "" } = pattern;
      routes.push(`${prefix}${tool.slug}${suffix}`);
    });
  });
  return routes;
}
