export const EXTERNAL_RESOURCES: Record<string, { name: string; url: string; description: string }[]> = {
  image: [
    { name: "MDN Web Docs: Images", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img", description: "Comprehensive guide to web image formats and usage." },
    { name: "Squoosh by Google", url: "https://squoosh.app/", description: "Advanced image compression and optimization utility." },
    { name: "WebP FAQ", url: "https://developers.google.com/speed/webp/faq", description: "Frequently asked questions about the WebP format." }
  ],
  pdf: [
    { name: "Adobe: What is PDF?", url: "https://www.adobe.com/acrobat/about-adobe-pdf.html", description: "Official history and technical background of the PDF standard." },
    { name: "IETF: PDF Specification", url: "https://datatracker.ietf.org/doc/html/rfc3778", description: "RFC 3778 - The application/pdf Media Type." },
    { name: "Wikipedia: PDF", url: "https://en.wikipedia.org/wiki/PDF", description: "Extensive overview of the Portable Document Format." }
  ],
  developer: [
    { name: "MDN Web Docs", url: "https://developer.mozilla.org/", description: "The definitive resource for web developers." },
    { name: "Stack Overflow", url: "https://stackoverflow.com/", description: "Global Q&A community for professional and enthusiast programmers." },
    { name: "GitHub", url: "https://github.com/", description: "World's leading AI-powered developer platform." }
  ],
  text: [
    { name: "Unicode Standard", url: "https://home.unicode.org/", description: "Official source for international character encoding standards." },
    { name: "Regex101", url: "https://regex101.com/", description: "Powerful online regular expression tester and debugger." },
    { name: "Diffchecker Documentation", url: "https://www.diffchecker.com/about", description: "Understanding text comparison and diffing algorithms." }
  ],
  math: [
    { name: "Wolfram|Alpha", url: "https://www.wolframalpha.com/", description: "Computational intelligence and mathematical knowledge engine." },
    { name: "Khan Academy", url: "https://www.khanacademy.org/math", description: "Free world-class math education for anyone, anywhere." },
    { name: "W3C Math Home", url: "https://www.w3.org/Math/", description: "Mathematical Markup Language (MathML) specifications." }
  ]
};

export function getResourcesByCategory(categoryId: string) {
  return EXTERNAL_RESOURCES[categoryId] || EXTERNAL_RESOURCES['developer'];
}
