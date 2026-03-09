export type ToolCategory = "image" | "pdf" | "developer" | "text" | "converter" | "math" | "marketing" | "security";

export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: ToolCategory;
  iconName: string; // We'll map this to Lucide icons
  isPopular?: boolean;
  instructions: string[];
  faqs: { question: string; answer: string }[];
  metaTitle: string;
  metaDescription: string;
}

export const CATEGORIES: { id: ToolCategory; name: string; slug: string; description: string }[] = [
  { 
    id: "image", 
    name: "Image Tools", 
    slug: "image-tools",
    description: "Convert, compress, and edit images effortlessly."
  },
  { 
    id: "pdf", 
    name: "PDF Tools", 
    slug: "pdf-tools",
    description: "Merge, split, and convert PDF documents in seconds."
  },
  { 
    id: "developer", 
    name: "Developer Tools", 
    slug: "developer-tools",
    description: "Formatters, validators, and encoders for web developers."
  },
  { 
    id: "text", 
    name: "Text Tools", 
    slug: "text-tools",
    description: "Generators and analyzers to help you work with text."
  },
  { 
    id: "converter", 
    name: "File Converters", 
    slug: "file-converter-tools",
    description: "Convert audio and video files between popular formats."
  },
  { 
    id: "math", 
    name: "Math & Calculators", 
    slug: "math-calculators",
    description: "Calculators and converters for math, science, and daily use."
  },
  { 
    id: "marketing", 
    name: "Marketing & Social", 
    slug: "marketing-tools",
    description: "Tools for content creators, SEO experts, and social media."
  },
  { 
    id: "security", 
    name: "Security & Privacy", 
    slug: "security-privacy",
    description: "Encryption, password safety, and private data tools."
  },
];

export const TOOLS: Tool[] = [
  // Image Tools
  {
    id: "webp-to-png-converter",
    name: "WebP to PNG Converter",
    slug: "webp-to-png-converter",
    description: "Convert WebP images to high-quality PNG format online for free.",
    category: "image",
    iconName: "FileImage",
    isPopular: true,
    instructions: [
      "Select or drag & drop your WebP image files.",
      "Click 'Convert' to process the images.",
      "Download your converted PNG files individually or as a ZIP."
    ],
    faqs: [
      { question: "Is this converter free?", answer: "Yes, our WebP to PNG converter is 100% free with no hidden costs." },
      { question: "Will my image quality drop?", answer: "No, we ensure high-quality conversion to preserve the details of your original image." }
    ],
    metaTitle: "WebP to PNG Converter - Free Online High-Quality Conversion",
    metaDescription: "Convert WebP images to PNG online instantly. High-quality, free, and secure conversion for US, UK, Canada, Europe."
  },
  {
    id: "png-to-jpg-converter",
    name: "PNG to JPG Converter",
    slug: "png-to-jpg-converter",
    description: "Fast and easy conversion from PNG to JPG format.",
    category: "image",
    iconName: "ImagePlus",
    instructions: [
      "Upload your PNG file.",
      "Adjust quality if needed.",
      "Download the JPG file."
    ],
    faqs: [
      { question: "Why convert PNG to JPG?", answer: "JPG files are usually smaller in size, making them better for web use where transparency isn't needed." }
    ],
    metaTitle: "PNG to JPG Converter - Free & Fast Image Conversion",
    metaDescription: "Quickly convert PNG files to JPG format online. No software installation required. Secure and fast."
  },
  {
    id: "image-compressor",
    name: "Image Compressor",
    slug: "image-compressor",
    description: "Compress images online without losing quality. Reduce file size for web use.",
    category: "image",
    iconName: "Minimize",
    isPopular: true,
    instructions: [
      "Upload image files (JPG, PNG, WebP).",
      "Adjust the quality slider to your preference.",
      "Download your compressed images."
    ],
    faqs: [
      { question: "How much can I compress?", answer: "Typically 50-80% reduction is possible without noticeable quality loss at 60-70% quality settings." }
    ],
    metaTitle: "Image Compressor - Reduce Image File Size Online Free",
    metaDescription: "Compress images online instantly. Fast, secure, and preserves quality. Best for US, UK, Canada."
  },
  {
    id: "image-resizer",
    name: "Image Resizer",
    slug: "image-resizer",
    description: "Resize images to custom dimensions while maintaining aspect ratio.",
    category: "image",
    iconName: "Maximize",
    instructions: [
      "Upload your image.",
      "Enter desired width or height.",
      "Click Resize and Download."
    ],
    faqs: [
      { question: "Can I resize multiple images?", answer: "Yes, you can upload and resize multiple images at once." }
    ],
    metaTitle: "Image Resizer - Change Image Dimensions Online Free",
    metaDescription: "Resize images to any dimension online for free. Maintain aspect ratio and high quality."
  },
  {
    id: "favicon-generator",
    name: "Favicon Generator",
    slug: "favicon-generator",
    description: "Generate professional favicons from images or text for your website.",
    category: "image",
    iconName: "Globe",
    instructions: [
      "Upload your logo image (PNG, JPG).",
      "Preview the favicon in different sizes.",
      "Download the complete favicon package."
    ],
    faqs: [
      { question: "What formats are included?", answer: "We provide .ico, .png, and webmanifest files." }
    ],
    metaTitle: "Favicon Generator - Create Website Icons Online Free",
    metaDescription: "Convert images to professional favicons online. Support for multiple sizes and modern browser formats."
  },
  {
    id: "image-to-webp",
    name: "Image to WebP Converter",
    slug: "image-to-webp",
    description: "Convert JPG/PNG images to modern WebP format for better web performance.",
    category: "image",
    iconName: "Zap",
    instructions: [
      "Select your image files.",
      "Adjust quality settings.",
      "Download the optimized WebP files."
    ],
    faqs: [
      { question: "Why use WebP?", answer: "WebP provides superior lossless and lossy compression for images on the web." }
    ],
    metaTitle: "Image to WebP Converter - Optimize Images for Web",
    metaDescription: "Convert PNG and JPG to WebP online for free. Reduce file size while maintaining high quality."
  },
  {
    id: "jpg-to-webp",
    name: "JPG to WebP Converter",
    slug: "jpg-to-webp",
    description: "Convert JPG images to WebP for better compression and web performance.",
    category: "image",
    iconName: "Zap",
    instructions: ["Select JPG files.", "Adjust quality.", "Download WebP."],
    faqs: [{ question: "Why convert?", answer: "WebP files are smaller." }],
    metaTitle: "JPG to WebP Converter - Optimize JPG to WebP",
    metaDescription: "Convert JPG to WebP online for free."
  },
  {
    id: "png-to-webp",
    name: "PNG to WebP Converter",
    slug: "png-to-webp",
    description: "Convert PNG images to WebP for better compression and web performance.",
    category: "image",
    iconName: "Zap",
    instructions: ["Select PNG files.", "Adjust quality.", "Download WebP."],
    faqs: [{ question: "Why convert?", answer: "WebP files are smaller." }],
    metaTitle: "PNG to WebP Converter - Optimize PNG to WebP",
    metaDescription: "Convert PNG to WebP online for free."
  },
  {
    id: "bmp-to-jpg",
    name: "BMP to JPG Converter",
    slug: "bmp-to-jpg",
    description: "Convert BMP images to JPG format easily.",
    category: "image",
    iconName: "FileImage",
    instructions: ["Upload BMP.", "Download JPG."],
    faqs: [{ question: "Is it free?", answer: "Yes." }],
    metaTitle: "BMP to JPG Converter - Free Online Tool",
    metaDescription: "Convert BMP to JPG online for free."
  },
  {
    id: "ico-to-png",
    name: "ICO to PNG Converter",
    slug: "ico-to-png",
    description: "Convert ICO icons to PNG images.",
    category: "image",
    iconName: "FileImage",
    instructions: ["Upload ICO.", "Download PNG."],
    faqs: [{ question: "Why convert?", answer: "PNG is more widely supported." }],
    metaTitle: "ICO to PNG Converter - Free Online Tool",
    metaDescription: "Convert ICO to PNG online for free."
  },
  {
    id: "tiff-to-png",
    name: "TIFF to PNG Converter",
    slug: "tiff-to-png",
    description: "Convert TIFF images to PNG format.",
    category: "image",
    iconName: "FileImage",
    instructions: ["Upload TIFF.", "Download PNG."],
    faqs: [{ question: "Does it support layers?", answer: "Yes, it flattens them to PNG." }],
    metaTitle: "TIFF to PNG Converter - Free Online Tool",
    metaDescription: "Convert TIFF to PNG online for free."
  },
  {
    id: "heic-to-jpg",
    name: "HEIC to JPG Converter",
    slug: "heic-to-jpg",
    description: "Convert HEIC (iPhone) images to JPG format.",
    category: "image",
    iconName: "FileImage",
    instructions: ["Upload HEIC.", "Download JPG."],
    faqs: [{ question: "Why convert?", answer: "Widely supported format." }],
    metaTitle: "HEIC to JPG Converter - Free Online Tool",
    metaDescription: "Convert HEIC to JPG online for free."
  },
  {
    id: "svg-to-png",
    name: "SVG to PNG Converter",
    slug: "svg-to-png",
    description: "Convert SVG vector graphics to PNG images.",
    category: "image",
    iconName: "FileImage",
    instructions: ["Upload SVG.", "Select size.", "Download PNG."],
    faqs: [{ question: "Is it high quality?", answer: "Yes." }],
    metaTitle: "SVG to PNG Converter - Free Online Tool",
    metaDescription: "Convert SVG to PNG online for free."
  },
  {
    id: "grayscale-image",
    name: "Grayscale Image",
    slug: "grayscale-image",
    description: "Convert any image to black and white.",
    category: "image",
    iconName: "Palette",
    instructions: ["Upload image.", "Click convert.", "Download."],
    faqs: [{ question: "Is it reversible?", answer: "Download the result, original is safe." }],
    metaTitle: "Grayscale Image - Black and White Filter Online",
    metaDescription: "Convert images to grayscale online for free."
  },
  {
    id: "invert-image",
    name: "Invert Image",
    slug: "invert-image",
    description: "Invert colors of any image.",
    category: "image",
    iconName: "Palette",
    instructions: ["Upload image.", "Click invert.", "Download."],
    faqs: [{ question: "What does it do?", answer: "Reverses pixel colors." }],
    metaTitle: "Invert Image - Flip Colors Online",
    metaDescription: "Invert image colors online for free."
  },
  {
    id: "rotate-image",
    name: "Rotate Image",
    slug: "rotate-image",
    description: "Rotate images 90, 180, or 270 degrees.",
    category: "image",
    iconName: "RotateCw",
    instructions: ["Upload image.", "Select degree.", "Download."],
    faqs: [{ question: "Is it lossy?", answer: "No." }],
    metaTitle: "Rotate Image - Flip and Spin Online",
    metaDescription: "Rotate images online for free."
  },
  {
    id: "flip-image",
    name: "Flip Image",
    slug: "flip-image",
    description: "Flip images horizontally or vertically.",
    category: "image",
    iconName: "FlipVertical",
    instructions: ["Upload image.", "Select direction.", "Download."],
    faqs: [{ question: "Is it free?", answer: "Yes." }],
    metaTitle: "Flip Image - Mirror Images Online",
    metaDescription: "Flip images horizontally or vertically online for free."
  },
  // PDF Tools
  {
    id: "merge-pdf",
    name: "Merge PDF",
    slug: "merge-pdf",
    description: "Combine multiple PDF files into one document in seconds.",
    category: "pdf",
    iconName: "Combine",
    isPopular: true,
    instructions: [
      "Select two or more PDF files.",
      "Arrange the sequence of files.",
      "Click Merge and Download."
    ],
    faqs: [
      { question: "Is there a limit to how many PDFs I can merge?", answer: "We support merging up to 20 PDFs at a time for free." }
    ],
    metaTitle: "Merge PDF Online - Combine PDF Files for Free",
    metaDescription: "Fastest way to merge PDF files online. Secure, easy to use, and completely free."
  },
  {
    id: "split-pdf",
    name: "Split PDF",
    slug: "split-pdf",
    description: "Separate pages of a PDF document into individual files easily.",
    category: "pdf",
    iconName: "Scissors",
    instructions: [
      "Select the PDF file you wish to split.",
      "Review the number of pages detected.",
      "Click Split PDF and download individual pages."
    ],
    faqs: [
      { question: "Is there a page limit?", answer: "No, we can split PDFs of any size directly in your browser." }
    ],
    metaTitle: "Split PDF Online - Separate PDF Pages for Free",
    metaDescription: "Easily split PDF documents into individual pages online. High quality, secure, and free PDF tool."
  },
  {
    id: "jpg-to-pdf",
    name: "JPG to PDF Converter",
    slug: "jpg-to-pdf",
    description: "Convert your JPG images to a high-quality PDF document instantly.",
    category: "pdf",
    iconName: "FileImage",
    instructions: [
      "Upload your JPG or PNG images.",
      "Optionally reorder them.",
      "Click Convert and download your PDF."
    ],
    faqs: [
      { question: "Is my privacy protected?", answer: "Yes, images are processed in your browser and never uploaded to our servers." }
    ],
    metaTitle: "JPG to PDF - Convert Images to PDF Online Free",
    metaDescription: "Easily convert JPG, PNG, and other images to PDF online. Fast, secure, and no installation needed."
  },
  {
    id: "pdf-to-jpg",
    name: "PDF to JPG Converter",
    slug: "pdf-to-jpg",
    description: "Convert PDF pages into high-quality JPG images for free.",
    category: "pdf",
    iconName: "FileImage",
    instructions: [
      "Select the PDF file you wish to convert.",
      "Review the pages to be extracted.",
      "Download each page as a JPG or get a ZIP archive."
    ],
    faqs: [
      { question: "Can I convert protected PDFs?", answer: "No, you must have the password or the PDF must be unprotected." }
    ],
    metaTitle: "PDF to JPG - Convert PDF Pages to Images Online",
    metaDescription: "Extract pages from your PDF as high-quality JPG images. Free, fast, and secure online tool."
  },
  {
    id: "pdf-to-text",
    name: "PDF to Text",
    slug: "pdf-to-text",
    description: "Extract text from your PDF documents.",
    category: "pdf",
    iconName: "FileText",
    instructions: ["Upload PDF.", "Extract text.", "Copy or download."],
    faqs: [{ question: "Does it support OCR?", answer: "Yes, for scanned documents." }],
    metaTitle: "PDF to Text - Extract Text Online",
    metaDescription: "Convert PDF to text online for free."
  },
  {
    id: "rotate-pdf",
    name: "Rotate PDF Pages",
    slug: "rotate-pdf-pages",
    description: "Rotate specific pages or all pages of a PDF.",
    category: "pdf",
    iconName: "RotateCw",
    instructions: ["Upload PDF.", "Select rotation.", "Download."],
    faqs: [{ question: "Can I rotate 1 page?", answer: "Yes." }],
    metaTitle: "Rotate PDF - Spin PDF Pages Online",
    metaDescription: "Rotate PDF pages online for free."
  },
  {
    id: "delete-pdf-pages",
    name: "Delete PDF Pages",
    slug: "delete-pdf-pages",
    description: "Remove unnecessary pages from your PDF.",
    category: "pdf",
    iconName: "Trash2",
    instructions: ["Upload PDF.", "Select pages to remove.", "Download."],
    faqs: [{ question: "Is it secure?", answer: "Yes." }],
    metaTitle: "Delete PDF Pages - Remove Pages Online",
    metaDescription: "Delete pages from PDF online for free."
  },
  {
    id: "password-protect-pdf",
    name: "Password Protect PDF",
    slug: "password-protect-pdf",
    description: "Add a password to your PDF document.",
    category: "pdf",
    iconName: "Lock",
    instructions: ["Upload PDF.", "Enter password.", "Download."],
    faqs: [{ question: "Is it encrypted?", answer: "Yes." }],
    metaTitle: "Password Protect PDF - Secure PDF Online",
    metaDescription: "Add password to PDF online for free."
  },
  {
    id: "watermark-pdf",
    name: "Watermark PDF",
    slug: "watermark-pdf",
    description: "Add text or image watermark to your PDF.",
    category: "pdf",
    iconName: "Type",
    instructions: ["Upload PDF.", "Set watermark.", "Download."],
    faqs: [{ question: "Can I use images?", answer: "Yes." }],
    metaTitle: "Watermark PDF - Add Branding Online",
    metaDescription: "Add watermark to PDF online for free."
  },
  {
    id: "pdf-to-word",
    name: "PDF to Word Converter",
    slug: "pdf-to-word",
    description: "Convert PDF documents to editable Word files.",
    category: "pdf",
    iconName: "FileText",
    instructions: ["Upload PDF.", "Convert.", "Download .docx."],
    faqs: [{ question: "Is it editable?", answer: "Yes." }],
    metaTitle: "PDF to Word Converter - Edit PDF Online",
    metaDescription: "Convert PDF to Word online for free."
  },
  // Developer Tools
  {
    id: "json-formatter-and-validator",
    name: "JSON Formatter and Validator",
    slug: "json-formatter-and-validator",
    description: "Format, validate, and minify JSON code online. Easy to read and debug.",
    category: "developer",
    iconName: "Code",
    isPopular: true,
    instructions: [
      "Paste your raw JSON code into the editor.",
      "Click Format to beautify or Minify to compress the code.",
      "Check for errors in the validator view.",
      "Copy or download the result."
    ],
    faqs: [
      { question: "Can it handle large JSON files?", answer: "Yes, our tool is optimized to handle large JSON documents directly in your browser." }
    ],
    metaTitle: "JSON Formatter and Validator - Beautify & Debug JSON Online",
    metaDescription: "The best online tool to format, validate, and minify JSON. Clean, fast, and secure developer tool."
  },
  {
    id: "base64-encoder-and-decoder",
    name: "Base64 Encoder and Decoder",
    slug: "base64-encoder-and-decoder",
    description: "Encode text to Base64 or decode Base64 back to readable text instantly.",
    category: "developer",
    iconName: "ArrowRightLeft",
    instructions: [
      "Choose Encode or Decode mode.",
      "Enter your text in the input area.",
      "Click the process button and copy your result."
    ],
    faqs: [
      { question: "Is this secure?", answer: "Yes, the conversion happens entirely on your machine." }
    ],
    metaTitle: "Base64 Encoder and Decoder - Online Base64 Tool",
    metaDescription: "Free online Base64 encoder and decoder. Fast, secure, and easy to use."
  },
  {
    id: "jwt-decoder",
    name: "JWT Decoder",
    slug: "jwt-decoder",
    description: "Decode JSON Web Tokens (JWT) to see the header, payload, and signature details.",
    category: "developer",
    iconName: "Shield",
    instructions: [
      "Paste your encoded JWT into the input field.",
      "The tool will automatically parse the components.",
      "View the decoded JSON for Header and Payload."
    ],
    faqs: [
      { question: "Do you store my tokens?", answer: "No, we never store or send your tokens. All decoding is done client-side." }
    ],
    metaTitle: "JWT Decoder - Decode JSON Web Tokens Online for Free",
    metaDescription: "Instantly decode JWT tokens online. View header and payload information securely."
  },
  {
    id: "regex-tester",
    name: "Regex Tester",
    slug: "regex-tester",
    description: "Test your regular expressions in real-time with highlighting and explanation.",
    category: "developer",
    iconName: "Search",
    instructions: [
      "Enter your regular expression pattern.",
      "Provide the test string to match against.",
      "Choose flags (global, multiline, etc.).",
      "View matches and capture groups instantly."
    ],
    faqs: [
      { question: "Does it support all regex features?", answer: "It supports standard JavaScript regular expressions." }
    ],
    metaTitle: "Online Regex Tester - Test Regular Expressions Instantly",
    metaDescription: "Fast and easy online regex tester with real-time matching and capture groups."
  },
  {
    id: "sql-formatter",
    name: "SQL Formatter",
    slug: "sql-formatter",
    description: "Format and beautify your SQL queries for better readability.",
    category: "developer",
    iconName: "Database",
    instructions: [
      "Paste your SQL query.",
      "Click Format to beautify.",
      "Copy the formatted result."
    ],
    faqs: [
      { question: "What SQL dialects are supported?", answer: "Standard SQL, MySQL, PostgreSQL, and more." }
    ],
    metaTitle: "SQL Formatter - Beautify SQL Queries Online Free",
    metaDescription: "Clean and format your SQL code online. Support for multiple dialects and easy reading."
  },
  {
    id: "xml-formatter",
    name: "XML Formatter",
    slug: "xml-formatter",
    description: "Beautify and validate XML data with proper indentation.",
    category: "developer",
    iconName: "FileCode",
    instructions: [
      "Paste your XML content.",
      "Click Format to indent.",
      "Download or copy the result."
    ],
    faqs: [
      { question: "Does it validate XML?", answer: "Yes, it highlights syntax errors during formatting." }
    ],
    metaTitle: "XML Formatter - Beautify and Indent XML Online",
    metaDescription: "Fast and secure online XML formatter. Improve readability of your XML data instantly."
  },
  {
    id: "html-formatter",
    name: "HTML Formatter",
    slug: "html-formatter",
    description: "Format and beautify HTML code for better structure and readability.",
    category: "developer",
    iconName: "Code2",
    instructions: [
      "Paste your HTML markup.",
      "Click Format to beautify.",
      "Copy or download the clean code."
    ],
    faqs: [
      { question: "Does it handle minified HTML?", answer: "Yes, it can expand and indent minified HTML code." }
    ],
    metaTitle: "HTML Formatter - Beautify HTML Markup Online Free",
    metaDescription: "Improve the structure of your HTML code. Online beautifier for clean and readable markup."
  },
  {
    id: "css-formatter",
    name: "CSS Formatter",
    slug: "css-formatter",
    description: "Beautify and format your CSS code with custom indentation.",
    category: "developer",
    iconName: "FileCode",
    instructions: ["Paste CSS.", "Select indentation.", "Format."],
    faqs: [{ question: "Does it support SCSS?", answer: "Yes, basic SCSS formatting is supported." }],
    metaTitle: "CSS Formatter - Beautify CSS Online",
    metaDescription: "Format CSS code online for free."
  },
  {
    id: "js-formatter",
    name: "JavaScript Formatter",
    slug: "javascript-formatter",
    description: "Format and beautify your JavaScript or TypeScript code.",
    category: "developer",
    iconName: "FileCode",
    instructions: ["Paste code.", "Format.", "Copy."],
    faqs: [{ question: "Is it secure?", answer: "Yes, processing is client-side." }],
    metaTitle: "JS Formatter - Beautify JavaScript Online",
    metaDescription: "Format JavaScript code online for free."
  },
  {
    id: "url-encoder",
    name: "URL Encoder",
    slug: "url-encoder",
    description: "Safe encoding for URL query parameters.",
    category: "developer",
    iconName: "Link",
    instructions: ["Enter text.", "Encode.", "Copy URL."],
    faqs: [{ question: "Why encode?", answer: "To make strings safe for URLs." }],
    metaTitle: "URL Encoder - Online URL Encoding Tool",
    metaDescription: "Encode URLs online for free."
  },
  {
    id: "url-decoder",
    name: "URL Decoder",
    slug: "url-decoder",
    description: "Decode URL-encoded strings back to normal text.",
    category: "developer",
    iconName: "Link",
    instructions: ["Enter URL.", "Decode.", "Copy."],
    faqs: [{ question: "Does it handle special characters?", answer: "Yes." }],
    metaTitle: "URL Decoder - Online URL Decoding Tool",
    metaDescription: "Decode URLs online for free."
  },
  {
    id: "md5-hash-generator",
    name: "MD5 Hash Generator",
    slug: "md5-hash-generator",
    description: "Generate MD5 hashes from text or files.",
    category: "developer",
    iconName: "Hash",
    instructions: ["Enter text.", "Generate hash.", "Copy."],
    faqs: [{ question: "Is MD5 secure?", answer: "Not for passwords, use SHA-256." }],
    metaTitle: "MD5 Generator - Online Hash Tool",
    metaDescription: "Generate MD5 hashes online for free."
  },
  {
    id: "sha-256-hash-generator",
    name: "SHA-256 Generator",
    slug: "sha-256-hash-generator",
    description: "Generate secure SHA-256 hashes.",
    category: "developer",
    iconName: "Hash",
    instructions: ["Enter text.", "Generate.", "Copy."],
    faqs: [{ question: "Is SHA-256 secure?", answer: "Yes, widely used for security." }],
    metaTitle: "SHA-256 Generator - Online Secure Hash",
    metaDescription: "Generate SHA-256 hashes online for free."
  },
  {
    id: "crontab-generator",
    name: "Crontab Generator",
    slug: "crontab-generator",
    description: "Easily generate cron schedules for your tasks.",
    category: "developer",
    iconName: "Clock",
    instructions: ["Select frequency.", "Copy cron string."],
    faqs: [{ question: "What is cron?", answer: "A Linux job scheduler." }],
    metaTitle: "Crontab Generator - Schedule Jobs Online",
    metaDescription: "Generate cron schedules online for free."
  },
  {
    id: "markdown-previewer",
    name: "Markdown Previewer",
    slug: "markdown-previewer",
    description: "Real-time preview for your Markdown files.",
    category: "developer",
    iconName: "Eye",
    instructions: ["Write markdown.", "See preview."],
    faqs: [{ question: "Does it support GFM?", answer: "Yes." }],
    metaTitle: "Markdown Previewer - Live MD Editor Online",
    metaDescription: "Preview markdown online for free."
  },
  {
    id: "json-to-csv",
    name: "JSON to CSV Converter",
    slug: "json-to-csv",
    description: "Convert JSON arrays to CSV format.",
    category: "developer",
    iconName: "ArrowRightLeft",
    instructions: ["Paste JSON.", "Convert.", "Download .csv."],
    faqs: [{ question: "Does it handle nested objects?", answer: "Yes, with flattening." }],
    metaTitle: "JSON to CSV Converter - Online Data Tool",
    metaDescription: "Convert JSON to CSV online for free."
  },
  {
    id: "csv-to-json",
    name: "CSV to JSON Converter",
    slug: "csv-to-json",
    description: "Convert CSV data to JSON format.",
    category: "developer",
    iconName: "ArrowRightLeft",
    instructions: ["Paste CSV.", "Convert.", "Copy JSON."],
    faqs: [{ question: "Does it detect headers?", answer: "Yes." }],
    metaTitle: "CSV to JSON Converter - Online Data Tool",
    metaDescription: "Convert CSV to JSON online for free."
  },
  {
    id: "curl-to-fetch",
    name: "Curl to Fetch Converter",
    slug: "curl-to-fetch",
    description: "Convert Curl commands to JavaScript Fetch API code.",
    category: "developer",
    iconName: "Code",
    instructions: ["Paste curl command.", "Get fetch code."],
    faqs: [{ question: "Does it handle headers?", answer: "Yes." }],
    metaTitle: "Curl to Fetch - Convert Network Requests Online",
    metaDescription: "Convert Curl to Fetch online for free."
  },
  {
    id: "robots-txt-generator",
    name: "Robots.txt Generator",
    slug: "robots-txt-generator",
    description: "Create a robots.txt file for your website SEO.",
    category: "developer",
    iconName: "Settings",
    instructions: ["Set rules.", "Download robots.txt."],
    faqs: [{ question: "Why need it?", answer: "To guide search engine crawlers." }],
    metaTitle: "Robots.txt Generator - SEO Tool Online",
    metaDescription: "Generate robots.txt online for free."
  },
  {
    id: "sitemap-generator",
    name: "Sitemap Generator",
    slug: "sitemap-generator-xml",
    description: "Generate XML sitemaps for search engines.",
    category: "developer",
    iconName: "Map",
    instructions: ["Enter URLs.", "Generate XML."],
    faqs: [{ question: "What is its limit?", answer: "50,000 URLs." }],
    metaTitle: "Sitemap Generator - XML Tools Online",
    metaDescription: "Generate sitemap.xml online for free."
  },
  // Text Tools
  {
    id: "word-counter",
    name: "Word Counter",
    slug: "word-counter",
    description: "Count words, characters, and sentences in your text. Includes reading time estimate.",
    category: "text",
    iconName: "Type",
    isPopular: true,
    instructions: [
      "Type or paste your text into the editor.",
      "View real-time statistics in the dashboard above.",
      "Use the reading time estimate for your content planning."
    ],
    faqs: [
      { question: "Is there a text length limit?", answer: "No, you can paste large manuscripts for analysis." }
    ],
    metaTitle: "Word Counter - Count Words & Characters Online Free",
    metaDescription: "Accurate word and character counter. Includes reading time and line count statistics."
  },
  {
    id: "qr-code-generator",
    name: "QR Code Generator",
    slug: "qr-code-generator",
    description: "Create custom QR codes for URLs, text, and more for free.",
    category: "text",
    iconName: "QrCode",
    instructions: [
      "Enter the text or URL for your QR code.",
      "Customize colors and error correction level.",
      "Download your QR code as a PNG image."
    ],
    faqs: [
      { question: "Can I use these QR codes commercially?", answer: "Yes, our generated QR codes have no restrictions." }
    ],
    metaTitle: "QR Code Generator - Create Custom QR Codes Online",
    metaDescription: "Free online QR code generator. High quality, custom colors, and instant download."
  },
  {
    id: "password-generator",
    name: "Password Generator",
    slug: "password-generator",
    description: "Generate strong, secure, and random passwords for your accounts.",
    category: "text",
    iconName: "Lock",
    instructions: [
      "Select desired password length.",
      "Choose character types (Uppercase, Numbers, Symbols).",
      "Click Generate and copy your secure password."
    ],
    faqs: [
      { question: "Are these passwords truly random?", answer: "Yes, we use cryptographically secure random number generators in the browser." }
    ],
    metaTitle: "Secure Password Generator - Create Strong Passwords Online",
    metaDescription: "Generate strong and random passwords instantly. Protect your online accounts with secure passwords."
  },
  {
    id: "case-converter",
    name: "Case Converter",
    slug: "case-converter",
    description: "Convert text between various cases: UPPERCASE, lowercase, Title Case, etc.",
    category: "text",
    iconName: "ArrowDownUp",
    instructions: [
      "Paste your text into the editor.",
      "Choose the desired case transformation.",
      "Copy the result to your clipboard."
    ],
    faqs: [
      { question: "What cases are supported?", answer: "Uppercase, lowercase, Sentence case, Title Case, camelCase, snake_case, and kebab-case." }
    ],
    metaTitle: "Case Converter Online - UPPERCASE, lowercase, Title Case",
    metaDescription: "Easily convert text to any case online. Free, fast, and secure text transformation tool."
  },
  {
    id: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    slug: "lorem-ipsum-generator",
    description: "Generate custom placeholder text for your designs and layouts.",
    category: "text",
    iconName: "FileText",
    instructions: [
      "Select the number of paragraphs/words.",
      "Choose to include HTML tags or not.",
      "Generate and copy the text."
    ],
    faqs: [
      { question: "Is this text random?", answer: "It follows the standard Lorem Ipsum distribution for natural look." }
    ],
    metaTitle: "Lorem Ipsum Generator - Free Placeholder Text Online",
    metaDescription: "Generate professional placeholder text for your website or design projects."
  },
  {
    id: "diff-checker",
    name: "Diff Checker",
    slug: "diff-checker",
    description: "Compare two pieces of text to find differences and changes.",
    category: "text",
    iconName: "Columns2",
    instructions: [
      "Paste original text in left box.",
      "Paste changed text in right box.",
      "View highlighted differences instantly."
    ],
    faqs: [
      { question: "Is my text saved?", answer: "No, comparisons are done entirely in your browser memory." }
    ],
    metaTitle: "Diff Checker - Compare Text and Find Differences Online",
    metaDescription: "Quickly find differences between two text files. Side-by-side comparison with highlighting."
  },
  {
    id: "number-system-converter",
    name: "Number System Converter",
    slug: "number-system-converter",
    description: "Convert numbers between Binary, Decimal, Hex, and Octal.",
    category: "text",
    iconName: "Binary",
    instructions: [
      "Enter a number.",
      "Select the input base.",
      "View conversions in all other bases instantly."
    ],
    faqs: [
      { question: "What range is supported?", answer: "We support large integers and fractional precision." }
    ],
    metaTitle: "Number System Converter - Binary, Hex, Decimal Online",
    metaDescription: "Instantly convert between different number systems. Accurate and fast conversion tool."
  },
  {
    id: "text-reverser",
    name: "Text Reverser",
    slug: "text-reverser",
    description: "Reverse your text or each word in a sentence.",
    category: "text",
    iconName: "RotateCcw",
    instructions: ["Enter text.", "Click reverse."],
    faqs: [{ question: "Can it reverse words only?", answer: "Yes." }],
    metaTitle: "Text Reverser - Flip Text Online",
    metaDescription: "Reverse text online for free."
  },
  {
    id: "remove-duplicate-lines",
    name: "Remove Duplicate Lines",
    slug: "remove-duplicate-lines",
    description: "Clean your list by removing all duplicate lines.",
    category: "text",
    iconName: "Trash2",
    instructions: ["Paste list.", "Click remove duplicates."],
    faqs: [{ question: "Does it preserve order?", answer: "Yes." }],
    metaTitle: "Remove Duplicate Lines - Clean Lists Online",
    metaDescription: "Remove duplicates from text online for free."
  },
  {
    id: "morse-code-converter",
    name: "Morse Code Converter",
    slug: "morse-code-converter",
    description: "Convert text to Morse code or vice versa.",
    category: "text",
    iconName: "Radio",
    instructions: ["Enter text.", "Convert to Morse."],
    faqs: [{ question: "Is it international?", answer: "Yes, supports standard Morse." }],
    metaTitle: "Morse Code Converter - Translate Online",
    metaDescription: "Convert text to Morse code online for free."
  },
  {
    id: "slug-generator",
    name: "Slug Generator",
    slug: "slug-generator",
    description: "Convert any string into a URL-friendly slug.",
    category: "text",
    iconName: "Link",
    instructions: ["Enter text.", "Copy slug."],
    faqs: [{ question: "What is a slug?", answer: "A URL-friendly version of a string." }],
    metaTitle: "Slug Generator - URL Friendly Text Online",
    metaDescription: "Generate slugs online for free."
  },
  {
    id: "binary-to-text",
    name: "Binary to Text",
    slug: "binary-to-text",
    description: "Decode binary strings back to readable text.",
    category: "text",
    iconName: "Binary",
    instructions: ["Enter binary.", "Decode."],
    faqs: [{ question: "What encoding is used?", answer: "UTF-8." }],
    metaTitle: "Binary to Text - Decode Online",
    metaDescription: "Convert binary to text online for free."
  },
  {
    id: "percentage-calculator",
    name: "Percentage Calculator",
    slug: "percentage-calculator",
    description: "Quickly calculate percentages, increases, and decreases.",
    category: "math",
    iconName: "Percent",
    instructions: ["Enter numbers.", "Get result."],
    faqs: [{ question: "Is it precise?", answer: "Yes." }],
    metaTitle: "Percentage Calculator - Online Math Tool",
    metaDescription: "Calculate percentages online for free."
  },
  {
    id: "average-calculator",
    name: "Average Calculator",
    slug: "average-calculator",
    description: "Find the mean, median, and mode of a set of numbers.",
    category: "math",
    iconName: "BarChart",
    instructions: ["Enter numbers.", "Get stats."],
    faqs: [{ question: "Can I use commas?", answer: "Yes, or spaces." }],
    metaTitle: "Average Calculator - Mean Median Mode Online",
    metaDescription: "Calculate averages online for free."
  },
  {
    id: "bmi-calculator",
    name: "BMI Calculator",
    slug: "bmi-calculator",
    description: "Calculate your Body Mass Index (BMI).",
    category: "math",
    iconName: "Activity",
    instructions: ["Enter weight.", "Enter height.", "Get BMI."],
    faqs: [{ question: "Is it a diagnosis?", answer: "No, follow a doctor's advice." }],
    metaTitle: "BMI Calculator - Health Tool Online",
    metaDescription: "Calculate BMI online for free."
  },
  {
    id: "age-calculator",
    name: "Age Calculator",
    slug: "age-calculator",
    description: "Find your exact age in years, months, and days.",
    category: "math",
    iconName: "Calendar",
    instructions: ["Select birthdate.", "Get age."],
    faqs: [{ question: "Is it accurate?", answer: "Yes, including leap years." }],
    metaTitle: "Age Calculator - Date Math Online",
    metaDescription: "Calculate age online for free."
  },
  {
    id: "loan-calculator",
    name: "Loan Calculator",
    slug: "loan-calculator",
    description: "Estimate your monthly loan payments and interest.",
    category: "math",
    iconName: "DollarSign",
    instructions: ["Enter amount.", "Enter rate.", "See monthly payment."],
    faqs: [{ question: "Is it fixed rate?", answer: "Yes." }],
    metaTitle: "Loan Calculator - Finance Tool Online",
    metaDescription: "Calculate loan payments online for free."
  },
  {
    id: "insta-bio-font-generator",
    name: "Insta Bio Font Generator",
    slug: "insta-bio-font-generator",
    description: "Create fancy fonts for your Instagram bio and social media.",
    category: "marketing",
    iconName: "Instagram",
    instructions: ["Enter text.", "Copy fancy version."],
    faqs: [{ question: "Do they work on mobile?", answer: "Yes." }],
    metaTitle: "Insta Bio Font Generator - Fancy Text Online",
    metaDescription: "Generate cool fonts for Instagram online for free."
  },
  {
    id: "twitter-character-counter",
    name: "Twitter Character Counter",
    slug: "twitter-character-counter",
    description: "Check if your tweet fits the character limit.",
    category: "marketing",
    iconName: "Twitter",
    instructions: ["Paste tweet.", "Check count."],
    faqs: [{ question: "What is the limit?", answer: "280 characters." }],
    metaTitle: "Twitter Character Counter - Online Tweet Tool",
    metaDescription: "Count tweet characters online for free."
  },
  {
    id: "utm-builder",
    name: "UTM Builder",
    slug: "utm-builder",
    description: "Generate UTM tracking parameters for your marketing URLs.",
    category: "marketing",
    iconName: "Target",
    instructions: ["Enter URL.", "Enter source/medium.", "Copy URL."],
    faqs: [{ question: "Why use UTM?", answer: "To track campaign performance." }],
    metaTitle: "UTM Builder - Marketing Campaign Tool",
    metaDescription: "Create UTM links online for free."
  },
  {
    id: "meta-tag-generator",
    name: "Meta Tag Generator",
    slug: "meta-tag-generator",
    description: "Generate SEO meta tags for your website.",
    category: "marketing",
    iconName: "Code",
    instructions: ["Enter title.", "Enter description.", "Copy tags."],
    faqs: [{ question: "Where to paste?", answer: "In the <head> section." }],
    metaTitle: "Meta Tag Generator - SEO Tool Online",
    metaDescription: "Generate HTML meta tags online for free."
  },
  {
    id: "og-previewer",
    name: "OG Previewer",
    slug: "og-previewer",
    description: "Preview how your website looks when shared on social media.",
    category: "marketing",
    iconName: "Eye",
    instructions: ["Enter URL or tags.", "View preview."],
    faqs: [{ question: "Does it support Facebook?", answer: "Yes, and Twitter/LinkedIn." }],
    metaTitle: "OG Previewer - Social Share Tool",
    metaDescription: "Preview Open Graph tags online for free."
  },
  {
    id: "aes-encrypt",
    name: "AES Encrypt",
    slug: "aes-encrypt",
    description: "Securely encrypt your text using AES algorithm.",
    category: "security",
    iconName: "Lock",
    instructions: ["Enter text.", "Enter key.", "Encrypt."],
    faqs: [{ question: "Is it secure?", answer: "Yes, uses military-grade encryption." }],
    metaTitle: "AES Encrypt - Secure Text Online",
    metaDescription: "Encrypt text with AES online for free."
  },
  {
    id: "aes-decrypt",
    name: "AES Decrypt",
    slug: "aes-decrypt",
    description: "Decrypt AES encrypted text with your private key.",
    category: "security",
    iconName: "Unlock",
    instructions: ["Enter cipher.", "Enter key.", "Decrypt."],
    faqs: [{ question: "Where is the key stored?", answer: "Nowhere, it stays in your browser." }],
    metaTitle: "AES Decrypt - Unlock Text Online",
    metaDescription: "Decrypt AES text online for free."
  },
  {
    id: "password-strength-checker",
    name: "Password Strength Checker",
    slug: "password-strength-checker",
    description: "Test how secure your password is.",
    category: "security",
    iconName: "ShieldCheck",
    instructions: ["Enter password.", "See score."],
    faqs: [{ question: "Is it safe?", answer: "Yes, passwords never leave your machine." }],
    metaTitle: "Password Strength Checker - Security Tool",
    metaDescription: "Check password security online for free."
  },
  {
    id: "base32-encoder",
    name: "Base32 Encoder",
    slug: "base32-encoder",
    description: "Encode text to Base32 format.",
    category: "security",
    iconName: "ArrowRightLeft",
    instructions: ["Enter text.", "Encode."],
    faqs: [{ question: "Why Base32?", answer: "Human-readable and URL-safe." }],
    metaTitle: "Base32 Encoder - Online Encoding Tool",
    metaDescription: "Convert to Base32 online for free."
  },
  {
    id: "base32-decoder",
    name: "Base32 Decoder",
    slug: "base32-decoder",
    description: "Decode Base32 strings back to normal text.",
    category: "security",
    iconName: "ArrowRightLeft",
    instructions: ["Enter cipher.", "Decode."],
    faqs: [{ question: "Is it reversible?", answer: "Yes." }],
    metaTitle: "Base32 Decoder - Online Decoding Tool",
    metaDescription: "Convert from Base32 online for free."
  },
  {
    id: "random-number-generator",
    name: "Random Number Generator",
    slug: "random-number-generator",
    description: "Generate a truly random number within a range.",
    category: "math",
    iconName: "Dices",
    instructions: ["Select range.", "Generate."],
    faqs: [{ question: "Is it cryptographically secure?", answer: "Yes, uses crypto.getRandomValues()." }],
    metaTitle: "Random Number Generator - Math Tool Online",
    metaDescription: "Generate random numbers online for free."
  },
  {
    id: "date-difference",
    name: "Date Difference",
    slug: "date-difference",
    description: "Calculate the time between two dates.",
    category: "math",
    iconName: "Calendar",
    instructions: ["Select start date.", "Select end date.", "View diff."],
    faqs: [{ question: "Does it count working days?", answer: "Optionally, yes." }],
    metaTitle: "Date Difference - Time Calc Online",
    metaDescription: "Calculate date intervals online for free."
  },
  {
    id: "unix-timestamp",
    name: "Unix Timestamp Converter",
    slug: "unix-timestamp",
    description: "Convert Unix timestamps to human-readable dates.",
    category: "developer",
    iconName: "Clock",
    instructions: ["Enter timestamp.", "Get date."],
    faqs: [{ question: "What is Unix time?", answer: "Seconds since Jan 1, 1970." }],
    metaTitle: "Unix Timestamp Converter - Developer Tool",
    metaDescription: "Convert timestamps online for free."
  },
  {
    id: "uuid-generator",
    name: "UUID Generator",
    slug: "uuid-generator",
    description: "Generate unique version 4 UUIDs.",
    category: "developer",
    iconName: "Fingerprint",
    instructions: ["Click generate.", "Copy UUID."],
    faqs: [{ question: "Are they unique?", answer: "Statistically unique." }],
    metaTitle: "UUID Generator - Online ID Tool",
    metaDescription: "Generate UUIDs online for free."
  },
  {
    id: "ascii-art-generator",
    name: "ASCII Art Generator",
    slug: "ascii-art-generator",
    description: "Convert your text into cool ASCII art.",
    category: "text",
    iconName: "Type",
    instructions: ["Enter text.", "Select style.", "Copy art."],
    faqs: [{ question: "Can I use it in code?", answer: "Yes." }],
    metaTitle: "ASCII Art Generator - Text Art Online",
    metaDescription: "Create ASCII art online for free."
  },
  {
    id: "upside-down-text",
    name: "Upside Down Text",
    slug: "upside-down-text",
    description: "Flip your text upside down instantly.",
    category: "text",
    iconName: "ArrowDownUp",
    instructions: ["Enter text.", "Copy flipped text."],
    faqs: [{ question: "How does it work?", answer: "Uses Unicode character mapping." }],
    metaTitle: "Upside Down Text - Flip Text Online",
    metaDescription: "Flip text upside down online for free."
  },
  {
    id: "remove-whitespace",
    name: "Remove Whitespace",
    slug: "remove-whitespace",
    description: "Remove extra spaces, tabs, and newlines from text.",
    category: "text",
    iconName: "Scissors",
    instructions: ["Paste text.", "Select options.", "Clean text."],
    faqs: [{ question: "Can it minify?", answer: "Yes." }],
    metaTitle: "Remove Whitespace - Clean Text Online",
    metaDescription: "Clean extra spaces from text online for free."
  },
  {
    id: "find-and-replace",
    name: "Find and Replace",
    slug: "find-and-replace",
    description: "Quickly find and replace text strings within a document.",
    category: "text",
    iconName: "Search",
    instructions: ["Paste text.", "Enter find.", "Enter replace.", "Process."],
    faqs: [{ question: "Is it regex supported?", answer: "Yes." }],
    metaTitle: "Find and Replace - Text Editor Online",
    metaDescription: "Replace text online for free."
  },
  {
    id: "word-frequency-counter",
    name: "Word Frequency Counter",
    slug: "word-frequency-counter",
    description: "Analyze how often each word appears in your text.",
    category: "text",
    iconName: "FileText",
    instructions: ["Paste text.", "Analyze.", "View breakdown."],
    faqs: [{ question: "Does it exclude common words?", answer: "Optionally, yes (stop words)." }],
    metaTitle: "Word Frequency Counter - Text Analysis Online",
    metaDescription: "Analyze word usage online for free."
  },
  // File Converter Tools
  {
    id: "mp4-to-mp3-converter",
    name: "MP4 to MP3 Converter",
    slug: "mp4-to-mp3-converter",
    description: "Extract high-quality audio from MP4 video files online for free.",
    category: "converter",
    iconName: "Music",
    instructions: [
      "Select your MP4 video file.",
      "Click Convert to start the extraction process.",
      "Download your MP3 audio file."
    ],
    faqs: [
      { question: "Is the audio quality preserved?", answer: "Yes, we use high-bitrate settings to ensure the best possible audio quality." }
    ],
    metaTitle: "MP4 to MP3 Converter - Free Online Audio Extraction",
    metaDescription: "The fastest way to convert MP4 to MP3 online. High quality, secure, and free audio converter."
  },
  {
    id: "video-converter",
    name: "Video Converter (AVI/MOV to MP4)",
    slug: "video-converter",
    description: "Convert AVI, MOV, and other video formats to high-quality MP4 online.",
    category: "converter",
    iconName: "Video",
    instructions: [
      "Select your AVI or MOV video file.",
      "Click Convert to start the MP4 conversion.",
      "Download your optimized MP4 video file."
    ],
    faqs: [
      { question: "Is the conversion safe?", answer: "Yes, all video processing happens in your browser and never leaves your device." }
    ],
    metaTitle: "Online Video Converter - Convert AVI, MOV to MP4 Free",
    metaDescription: "The best online tool to convert AVI and MOV to MP4. Fast, secure, and preserves video quality."
  },
  {
    id: "unit-converter",
    name: "Unit Converter",
    slug: "unit-converter",
    description: "Convert between various units like length, weight, temperature, and volume.",
    category: "converter",
    iconName: "Scale",
    instructions: [
      "Select a conversion category.",
      "Enter the value to convert.",
      "Select source and target units."
    ],
    faqs: [
      { question: "Are the values accurate?", answer: "Yes, we use standard conversion constants for high precision." }
    ],
    metaTitle: "Unit Converter - Length, Weight, Temp Online Free",
    metaDescription: "The easiest way to convert between different units online. Fast and accurate results."
  },
  {
    id: "color-converter",
    name: "Color Converter",
    slug: "color-converter",
    description: "Convert colors between HEX, RGB, HSL, and CMYK formats.",
    category: "converter",
    iconName: "Palette",
    instructions: [
      "Enter a color value or use the picker.",
      "View conversions in all major formats.",
      "Copy CSS color codes instantly."
    ],
    faqs: [
      { question: "Does it support alpha transparency?", answer: "Yes, we support RGBA and HSLA conversions." }
    ],
    metaTitle: "Color Converter - HEX, RGB, HSL Online Tool",
    metaDescription: "Easily convert color codes between different formats. Professional color tool for designers."
  },
  {
    id: "ip-lookup",
    name: "IP Lookup",
    slug: "ip-lookup",
    description: "Find information about any IP address, including location and ISP.",
    category: "security",
    iconName: "Globe",
    instructions: ["Enter an IP address.", "Click Lookup.", "View geolocation and ISP data."],
    faqs: [{ question: "Is this data precise?", answer: "It provides city-level accuracy for most IPs." }],
    metaTitle: "IP Lookup - Find IP Geolocation Online",
    metaDescription: "Free online IP lookup tool. Get location and provider info for any IP."
  },
  {
    id: "html-entity-converter",
    name: "HTML Entity Converter",
    slug: "html-entity-converter",
    description: "Convert special characters to their HTML entity equivalents.",
    category: "developer",
    iconName: "Code",
    instructions: ["Paste your text.", "Choose encode/decode.", "Copy result."],
    faqs: [{ question: "What entities are supported?", answer: "All standard HTML5 entities." }],
    metaTitle: "HTML Entity Converter - Encode/Decode Entities Online",
    metaDescription: "Convert characters to HTML entities and back online for free."
  },
  {
    id: "hex-to-decimal",
    name: "Hex to Decimal Converter",
    slug: "hex-to-decimal",
    description: "Convert hexadecimal numbers to decimal and vice versa.",
    category: "math",
    iconName: "Hash",
    instructions: ["Enter a hex value.", "Get decimal result."],
    faqs: [{ question: "Does it handle large numbers?", answer: "Yes, including fractional parts." }],
    metaTitle: "Hex to Decimal Converter - Math Tools Online",
    metaDescription: "Convert hex to decimal online for free."
  },
  {
    id: "barcode-generator",
    name: "Barcode Generator",
    slug: "barcode-generator",
    description: "Generate Code 128, EAN-13, and UPC barcodes.",
    category: "marketing",
    iconName: "QrCode",
    instructions: ["Enter data.", "Select format.", "Download."],
    faqs: [{ question: "Is it free?", answer: "Yes." }],
    metaTitle: "Barcode Generator - Online Label Tool",
    metaDescription: "Create barcodes online for free."
  },
  {
    id: "text-to-speech",
    name: "Text to Speech",
    slug: "text-to-speech",
    description: "Convert written text into spoken audio.",
    category: "text",
    iconName: "Volume2",
    instructions: ["Paste text.", "Click Listen."],
    faqs: [{ question: "Supported languages?", answer: "All system voices." }],
    metaTitle: "Text to Speech - Online Voice Tool",
    metaDescription: "Listen to text online for free."
  },
  {
    id: "image-color-picker",
    name: "Image Color Picker",
    slug: "image-color-picker",
    description: "Extract color codes from any image.",
    category: "image",
    iconName: "Palette",
    instructions: ["Upload image.", "Click to pick color."],
    faqs: [{ question: "Format?", answer: "HEX and RGB." }],
    metaTitle: "Image Color Picker - HEX Code Finder",
    metaDescription: "Find image colors online for free."
  },
  {
    id: "social-media-resizer",
    name: "Social Media Resizer",
    slug: "social-media-resizer",
    description: "Resize images for Instagram, Twitter, and LinkedIn.",
    category: "image",
    iconName: "Layout",
    instructions: ["Upload image.", "Select platform.", "Resize."],
    faqs: [{ question: "Are dimensions up to date?", answer: "Yes." }],
    metaTitle: "Social Media Resizer - Image Tools Online",
    metaDescription: "Resize images for social media online for free."
  },
];

export function getToolBySlug(slug: string) {
  return TOOLS.find(tool => tool.slug === slug);
}

export function getToolsByCategory(categoryId: ToolCategory) {
  return TOOLS.filter(tool => tool.category === categoryId);
}
