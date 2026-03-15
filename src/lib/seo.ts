import { Tool, ToolCategory } from "./tools";

export const SITE_URL = "https://takethetools.com";

export function generateToolMetaTitle(toolName: string): string {
  return `${toolName} Online – Free Tool | TakeTheTools`;
}

export function generateToolMetaDescription(tool: Tool): string {
  if (tool.metaDescription && tool.metaDescription.length >= 140 && tool.metaDescription.length <= 165) {
    return tool.metaDescription;
  }

  const base = tool.description || `Use our free ${tool.name} online. Fast, secure, and easy to use.`;
  const suffix = " Perfect for developers, designers, and digital professionals who need reliable results in seconds.";
  
  let description = base;
  if (description.length < 140) {
    description += suffix;
  }
  
  return description.substring(0, 160).trim();
}

export function generateCategoryMetaTitle(categoryName: string): string {
  return `${categoryName} – Free Online Tools | TakeTheTools`;
}

export function generateCategoryMetaDescription(categoryDescription: string): string {
  const suffix = " Explore our full range of high-performance utilities designed for efficiency and precision, completely free.";
  let description = categoryDescription;
  if (description.length < 140) {
    description += suffix;
  }
  return description.substring(0, 160).trim();
}

export function getSoftwareApplicationSchema(tool: Tool, applicationCategoryMap: Record<string, string>) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "applicationCategory": applicationCategoryMap[tool.category] || "UtilitiesApplication",
    "operatingSystem": "Web",
    "description": tool.description,
    "url": `${SITE_URL}/tools/${tool.slug}`,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "2450"
    }
  };
}

export function getBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item
    }))
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
