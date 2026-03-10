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
  // New Batch 1
  {
    id: "image-to-svg",
    name: "Image to SVG Converter",
    slug: "image-to-svg",
    description: "Convert raster images (PNG, JPG) to SVG vector format.",
    category: "image",
    iconName: "FileCode",
    instructions: ["Upload image.", "Select tracing options.", "Download SVG."],
    faqs: [{ question: "Is it a true vector?", answer: "Yes, we trace the pixels into paths." }],
    metaTitle: "Image to SVG Converter - Vectorize Images Online",
    metaDescription: "Convert PNG and JPG to SVG vectors online for free."
  },
  {
    id: "image-to-avif",
    name: "Image to AVIF Converter",
    slug: "image-to-avif",
    description: "Convert images to the highly efficient AVIF format.",
    category: "image",
    iconName: "Zap",
    instructions: ["Select images.", "Adjust quality.", "Download AVIF."],
    faqs: [{ question: "Why use AVIF?", answer: "Better compression than WebP and JPG." }],
    metaTitle: "Image to AVIF Converter - Next-Gen Image Optimization",
    metaDescription: "Convert JPG and PNG to AVIF online for free."
  },
  {
    id: "blur-image",
    name: "Blur Image",
    slug: "blur-image",
    description: "Apply Gaussian blur to your images online.",
    category: "image",
    iconName: "EyeOff",
    instructions: ["Upload image.", "Adjust blur amount.", "Download."],
    faqs: [{ question: "Can I blur parts?", answer: "This tool blurs the whole image." }],
    metaTitle: "Blur Image Online - Easy Photo Blurring Tool",
    metaDescription: "Apply blur effects to photos online for free."
  },
  {
    id: "sharpen-image",
    name: "Sharpen Image",
    slug: "sharpen-image",
    description: "Make your blurry photos clearer with our sharpening tool.",
    category: "image",
    iconName: "Zap",
    instructions: ["Upload image.", "Increase sharpness.", "Download."],
    faqs: [{ question: "Will it fix very blurry photos?", answer: "It improves clarity but can't fix extreme motion blur." }],
    metaTitle: "Sharpen Image Online - Enhance Photo Clarity",
    metaDescription: "Sharpen blurry images online for free."
  },
  {
    id: "unlock-pdf",
    name: "Unlock PDF",
    slug: "unlock-pdf",
    description: "Remove passwords and restrictions from PDF files.",
    category: "pdf",
    iconName: "Unlock",
    instructions: ["Upload locked PDF.", "Enter password.", "Download unlocked version."],
    faqs: [{ question: "Can I unlock without password?", answer: "No, you must know the password to remove encryption." }],
    metaTitle: "Unlock PDF Online - Remove PDF Passwords",
    metaDescription: "Easily remove passwords from PDF files online for free."
  },
  {
    id: "pdf-to-pptx",
    name: "PDF to PowerPoint Converter",
    slug: "pdf-to-pptx",
    description: "Convert PDF documents to editable PPTX slideshows.",
    category: "pdf",
    iconName: "Presentation",
    instructions: ["Upload PDF.", "Select conversion mode.", "Download PPTX."],
    faqs: [{ question: "Are layouts preserved?", answer: "We try our best to keep text and images in place." }],
    metaTitle: "PDF to PowerPoint Converter - PDF to PPTX Online",
    metaDescription: "Convert PDF to editable PowerPoint slides online for free."
  },
  {
    id: "pdf-to-xlsx",
    name: "PDF to Excel Converter",
    slug: "pdf-to-xlsx",
    description: "Extract tables from PDF to Excel spreadsheets.",
    category: "pdf",
    iconName: "Table",
    instructions: ["Upload PDF.", "Wait for table detection.", "Download XLSX."],
    faqs: [{ question: "Does it work with scanned PDFs?", answer: "Yes, with our advanced OCR technology." }],
    metaTitle: "PDF to Excel Converter - PDF to XLSX Online",
    metaDescription: "Convert PDF tables to Excel spreadsheets online for free."
  },
  {
    id: "pdf-page-numbering",
    name: "Add PDF Page Numbers",
    slug: "pdf-page-numbering",
    description: "Add page numbers to your PDF document in custom positions.",
    category: "pdf",
    iconName: "Hash",
    instructions: ["Upload PDF.", "Select position and font.", "Download numbered PDF."],
    faqs: [{ question: "Can I skip the first page?", answer: "Yes." }],
    metaTitle: "Add PDF Page Numbers Online - Easy Numbering Tool",
    metaDescription: "Insert page numbers into PDF files online for free."
  },
  {
    id: "json-to-yaml",
    name: "JSON to YAML Converter",
    slug: "json-to-yaml",
    description: "Convert JSON data to YAML format instantly.",
    category: "developer",
    iconName: "ArrowRightLeft",
    instructions: ["Paste JSON.", "Get YAML."],
    faqs: [{ question: "Why YAML?", answer: "It's more human-readable." }],
    metaTitle: "JSON to YAML Converter - Online DevOps Tool",
    metaDescription: "Convert JSON to YAML online for free."
  },
  {
    id: "yaml-to-json",
    name: "YAML to JSON Converter",
    slug: "yaml-to-json",
    description: "Convert YAML configurations to JSON format.",
    category: "developer",
    iconName: "ArrowRightLeft",
    instructions: ["Paste YAML.", "Get JSON."],
    faqs: [{ question: "Is it secure?", answer: "Yes, all processing is client-side." }],
    metaTitle: "YAML to JSON Converter - Online DevOps Tool",
    metaDescription: "Convert YAML to JSON online for free."
  },
  {
    id: "xml-to-json",
    name: "XML to JSON Converter",
    slug: "xml-to-json",
    description: "Convert XML data to JSON objects.",
    category: "developer",
    iconName: "ArrowRightLeft",
    instructions: ["Paste XML.", "Get JSON."],
    faqs: [{ question: "Does it handle attributes?", answer: "Yes." }],
    metaTitle: "XML to JSON Converter - Online Data Tool",
    metaDescription: "Convert XML to JSON online for free."
  },
  {
    id: "dockerfile-generator",
    name: "Dockerfile Generator",
    slug: "dockerfile-generator",
    description: "Quickly generate Dockerfiles for various tech stacks.",
    category: "developer",
    iconName: "Container",
    instructions: ["Select runtime (Node, Python, Go).", "Configure ports.", "Copy Dockerfile."],
    faqs: [{ question: "Are they production ready?", answer: "They follow best practices but should be reviewed." }],
    metaTitle: "Dockerfile Generator - Online DevOps Tool",
    metaDescription: "Generate Dockerfiles online for free."
  },
  {
    id: "nginx-config-generator",
    name: "Nginx Config Generator",
    slug: "nginx-config-generator",
    description: "Generate Nginx server block configurations.",
    category: "developer",
    iconName: "Server",
    instructions: ["Enter domain.", "Set proxy/root.", "Download config."],
    faqs: [{ question: "Does it support SSL?", answer: "Yes, with Let's Encrypt options." }],
    metaTitle: "Nginx Config Generator - Online Server Tool",
    metaDescription: "Generate Nginx configurations online for free."
  },
  {
    id: "text-to-leetspeak",
    name: "Leetspeak Generator",
    slug: "text-to-leetspeak",
    description: "Convert normal text to cool 1337 speak.",
    category: "text",
    iconName: "Keyboard",
    instructions: ["Enter text.", "Get leet code."],
    faqs: [{ question: "Is it customizable?", answer: "Yes, multiple levels." }],
    metaTitle: "Leetspeak Generator - 1337 Speak Online",
    metaDescription: "Convert text to leetspeak online for free."
  },
  {
    id: "text-to-rot13",
    name: "ROT13 Encoder/Decoder",
    slug: "text-to-rot13",
    description: "Encode text using the ROT13 substitution cipher.",
    category: "text",
    iconName: "Lock",
    instructions: ["Enter text.", "Shift by 13."],
    faqs: [{ question: "Is it secure?", answer: "No, it's just for fun or basic masking." }],
    metaTitle: "ROT13 Encoder - Online Text Cipher",
    metaDescription: "Encode text with ROT13 online for free."
  },
  {
    id: "remove-empty-lines",
    name: "Remove Empty Lines",
    slug: "remove-empty-lines",
    description: "Clean your text by removing all empty lines.",
    category: "text",
    iconName: "Trash2",
    instructions: ["Paste text.", "Click Remove."],
    faqs: [{ question: "Does it remove whitespace lines?", answer: "Yes, optionally." }],
    metaTitle: "Remove Empty Lines - Text Cleaner Online",
    metaDescription: "Remove blank lines from text online for free."
  },
  {
    id: "wav-to-mp3-converter",
    name: "WAV to MP3 Converter",
    slug: "wav-to-mp3-converter",
    description: "Convert large WAV files to efficient MP3 format.",
    category: "converter",
    iconName: "Music",
    instructions: ["Upload WAV.", "Pick bitrate.", "Download MP3."],
    faqs: [{ question: "Is it high quality?", answer: "Yes, up to 320kbps." }],
    metaTitle: "WAV to MP3 Converter - Free Online Audio Tool",
    metaDescription: "Convert WAV to MP3 online for free."
  },
  {
    id: "webm-to-mp4-converter",
    name: "WebM to MP4 Converter",
    slug: "webm-to-mp4-converter",
    description: "Convert WebM videos to the more compatible MP4 format.",
    category: "converter",
    iconName: "Video",
    instructions: ["Upload WebM.", "Convert.", "Download MP4."],
    faqs: [{ question: "Why convert?", answer: "MP4 has better device support." }],
    metaTitle: "WebM to MP4 Converter - Free Online Video Tool",
    metaDescription: "Convert WebM to MP4 online for free."
  },
  {
    id: "gcd-lcm-calculator",
    name: "GCD & LCM Calculator",
    slug: "gcd-lcm-calculator",
    description: "Find the Greatest Common Divisor and Least Common Multiple.",
    category: "math",
    iconName: "Calculator",
    instructions: ["Enter numbers.", "Calculate."],
    faqs: [{ question: "How many numbers?", answer: "Up to 10." }],
    metaTitle: "GCD & LCM Calculator - Online Math Tool",
    metaDescription: "Find GCD and LCM online for free."
  },
  {
    id: "prime-factorization",
    name: "Prime Factorization",
    slug: "prime-factorization",
    description: "Find all prime factors of a given number.",
    category: "math",
    iconName: "Hash",
    instructions: ["Enter number.", "Factorize."],
    faqs: [{ question: "Limit?", answer: "Up to 999,999,999." }],
    metaTitle: "Prime Factorization - Math Tool Online",
    metaDescription: "Find prime factors online for free."
  },
  {
    id: "area-of-circle-calculator",
    name: "Area of Circle Calculator",
    slug: "area-of-circle-calculator",
    description: "Calculate the area of a circle with its radius or diameter.",
    category: "math",
    iconName: "Circle",
    instructions: ["Enter radius.", "Get area."],
    faqs: [{ question: "What is PI?", answer: "We use 3.14159..." }],
    metaTitle: "Area of Circle Calculator - Online Geometry Tool",
    metaDescription: "Calculate circle area online for free."
  },
  {
    id: "whois-lookup",
    name: "Whois Lookup",
    slug: "whois-lookup",
    description: "Check domain registration info and ownership details.",
    category: "marketing",
    iconName: "Shield",
    instructions: ["Enter domain.", "Fetch data."],
    faqs: [{ question: "Is it private?", answer: "Depends on domain privacy settings." }],
    metaTitle: "Whois Lookup - Domain Registration Info",
    metaDescription: "Check domain info online for free."
  },
  {
    id: "ssl-checker",
    name: "SSL Checker",
    slug: "ssl-checker",
    description: "Check the SSL certificate details of any website.",
    category: "marketing",
    iconName: "Lock",
    instructions: ["Enter URL.", "Verify SSL."],
    faqs: [{ question: "What does it check?", answer: "Expiry, issuer, and protocol." }],
    metaTitle: "SSL Checker - Verify Website Security",
    metaDescription: "Check SSL certificates online for free."
  },
  {
    id: "exif-data-remover",
    name: "EXIF Data Remover",
    slug: "exif-data-remover",
    description: "Remove privacy-sensitive metadata from your photos.",
    category: "security",
    iconName: "EyeOff",
    instructions: ["Upload photo.", "Click Scrub.", "Download clean image."],
    faqs: [{ question: "What is removed?", answer: "GPS, Camera model, Date, etc." }],
    metaTitle: "EXIF Data Remover - Protect Your Privacy Online",
    metaDescription: "Scrub metadata from images online for free."
  },
  {
    id: "secure-password-hash",
    name: "Secure Password Hasher",
    slug: "secure-password-hash",
    description: "Generate secure hashes for passwords using modern algorithms.",
    category: "security",
    iconName: "Hash",
    instructions: ["Enter password.", "Select algo (Bcrypt/Argon2).", "Generate."],
    faqs: [{ question: "Is it reversible?", answer: "No, hashes are one-way." }],
    metaTitle: "Secure Password Hasher - Online Crypto Tool",
    metaDescription: "Generate password hashes online for free."
  },
  // New Batch 2
  {
    id: "image-to-bmp-converter",
    name: "Image to BMP Converter",
    slug: "image-to-bmp-converter",
    description: "Convert PNG, JPG, or WebP images to BMP format.",
    category: "image",
    iconName: "FileImage",
    instructions: ["Upload image.", "Convert.", "Download BMP."],
    faqs: [{ question: "Why BMP?", answer: "It's an uncompressed, high-fidelity format." }],
    metaTitle: "Image to BMP Converter - High-Res Bitmap Tool",
    metaDescription: "Convert images to BMP online for free."
  },
  {
    id: "image-to-tiff-converter",
    name: "Image to TIFF Converter",
    slug: "image-to-tiff-converter",
    description: "Convert images to high-quality TIFF format.",
    category: "image",
    iconName: "FileImage",
    instructions: ["Upload image.", "Convert.", "Download TIFF."],
    faqs: [{ question: "Is it lossless?", answer: "Yes, TIFF supports lossless compression." }],
    metaTitle: "Image to TIFF Converter - Professional Photo Tool",
    metaDescription: "Convert images to TIFF online for free."
  },
  {
    id: "add-text-to-image",
    name: "Add Text to Image",
    slug: "add-text-to-image",
    description: "Easily add captions or watermarks to your photos.",
    category: "image",
    iconName: "Type",
    instructions: ["Upload image.", "Type text.", "Place and Download."],
    faqs: [{ question: "Can I choose fonts?", answer: "Yes, multiple modern fonts are available." }],
    metaTitle: "Add Text to Image Online - Photo Caption Tool",
    metaDescription: "Overlay text on images online for free."
  },
  {
    id: "round-image-corners",
    name: "Round Image Corners",
    slug: "round-image-corners",
    description: "Add stylish rounded corners to your images.",
    category: "image",
    iconName: "CornerUpRight",
    instructions: ["Upload image.", "Set corner radius.", "Download."],
    faqs: [{ question: "Does it support transparency?", answer: "Yes, results are in PNG format." }],
    metaTitle: "Round Image Corners Online - Photo Styling Tool",
    metaDescription: "Create rounded corner images online for free."
  },
  {
    id: "pdf-to-html-converter",
    name: "PDF to HTML Converter",
    slug: "pdf-to-html-converter",
    description: "Convert PDF documents to web-ready HTML code.",
    category: "pdf",
    iconName: "Globe",
    instructions: ["Upload PDF.", "Wait for conversion.", "Download HTML zip."],
    faqs: [{ question: "Are links preserved?", answer: "Yes, internal and external links are kept." }],
    metaTitle: "PDF to HTML Converter - PDF to Web Tool",
    metaDescription: "Convert PDF files to HTML online for free."
  },
  {
    id: "html-to-pdf-converter",
    name: "HTML to PDF Converter",
    slug: "html-to-pdf-converter",
    description: "Convert HTML files or code snippets to PDF.",
    category: "pdf",
    iconName: "FileCode",
    instructions: ["Upload HTML or paste code.", "Generate PDF.", "Download."],
    faqs: [{ question: "Does it support CSS?", answer: "Yes, most modern CSS features are supported." }],
    metaTitle: "HTML to PDF Converter - Web to PDF Tool",
    metaDescription: "Convert HTML to PDF online for free."
  },
  {
    id: "pdf-metadata-editor",
    name: "PDF Metadata Editor",
    slug: "pdf-metadata-editor",
    description: "Edit PDF title, author, subject, and keywords.",
    category: "pdf",
    iconName: "Edit",
    instructions: ["Upload PDF.", "Edit fields.", "Save and Download."],
    faqs: [{ question: "Is it permanent?", answer: "Yes, the new info is saved into the file." }],
    metaTitle: "PDF Metadata Editor - Change PDF Info Online",
    metaDescription: "Edit PDF properties online for free."
  },
  {
    id: "hex-to-rgb-converter",
    name: "Hex to RGB Converter",
    slug: "hex-to-rgb-converter",
    description: "Convert HEX color codes to RGB and RGBA.",
    category: "developer",
    iconName: "Palette",
    instructions: ["Enter HEX code.", "Copy RGB result."],
    faqs: [{ question: "Does it handle shorthand?", answer: "Yes, e.g., #fff works." }],
    metaTitle: "Hex to RGB Converter - Web Design Tool",
    metaDescription: "Convert Hex to RGB online for free."
  },
  {
    id: "rgb-to-hex-converter",
    name: "RGB to Hex Converter",
    slug: "rgb-to-hex-converter",
    description: "Convert RGB color values to HEX format.",
    category: "developer",
    iconName: "Palette",
    instructions: ["Enter R, G, B values.", "Copy HEX result."],
    faqs: [{ question: "Is the # included?", answer: "Yes." }],
    metaTitle: "RGB to Hex Converter - Web Design Tool",
    metaDescription: "Convert RGB to Hex online for free."
  },
  {
    id: "css-gradient-generator",
    name: "CSS Gradient Generator",
    slug: "css-gradient-generator",
    description: "Create beautiful linear and radial CSS gradients.",
    category: "developer",
    iconName: "Layers",
    instructions: ["Pick colors.", "Adjust angle.", "Copy CSS code."],
    faqs: [{ question: "Does it support multi-stop?", answer: "Yes." }],
    metaTitle: "CSS Gradient Generator - Beautiful Backgrounds Tool",
    metaDescription: "Create CSS gradients online for free."
  },
  {
    id: "css-box-shadow-generator",
    name: "CSS Box Shadow Generator",
    slug: "css-box-shadow-generator",
    description: "Generate professional CSS box shadow effects.",
    category: "developer",
    iconName: "Square",
    instructions: ["Adjust offsets/blur.", "Pick shadow color.", "Copy CSS."],
    faqs: [{ question: "Does it support inset?", answer: "Yes." }],
    metaTitle: "CSS Box Shadow Generator - UI Design Tool",
    metaDescription: "Generate CSS box shadows online for free."
  },
  {
    id: "text-to-nato-phonetic",
    name: "NATO Phonetic Translator",
    slug: "text-to-nato-phonetic",
    description: "Convert text to the NATO international phonetic alphabet.",
    category: "text",
    iconName: "Mic",
    instructions: ["Enter text.", "Get alpha, bravo, charlie..."],
    faqs: [{ question: "What is it for?", answer: "Clear communication over radio or phone." }],
    metaTitle: "NATO Phonetic Translator - Alpha Bravo Charlie...",
    metaDescription: "Convert text to NATO phonetic online for free."
  },
  {
    id: "text-to-octal-converter",
    name: "Text to Octal Converter",
    slug: "text-to-octal-converter",
    description: "Convert plain text to octal (base-8) values.",
    category: "text",
    iconName: "Binary",
    instructions: ["Enter text.", "Get octal sequence."],
    faqs: [{ question: "What encoding?", answer: "UTF-8." }],
    metaTitle: "Text to Octal Converter - Online Text Tool",
    metaDescription: "Convert text to octal online for free."
  },
  {
    id: "octal-to-text-converter",
    name: "Octal to Text Converter",
    slug: "octal-to-text-converter",
    description: "Decode octal values back into readable text.",
    category: "text",
    iconName: "Binary",
    instructions: ["Enter octal.", "Get text."],
    faqs: [{ question: "Is it reversible?", answer: "Yes." }],
    metaTitle: "Octal to Text Converter - Online Text Tool",
    metaDescription: "Convert octal to text online for free."
  },
  {
    id: "add-prefix-suffix-to-lines",
    name: "Add Prefix/Suffix to Lines",
    slug: "add-prefix-suffix-to-lines",
    description: "Add text to the start or end of every line in your list.",
    category: "text",
    iconName: "PlusSquare",
    instructions: ["Paste lines.", "Enter prefix/suffix.", "Click Add."],
    faqs: [{ question: "Can I use both?", answer: "Yes." }],
    metaTitle: "Add Prefix/Suffix to Lines - Bulk Text Editor",
    metaDescription: "Modify every line of text online for free."
  },
  {
    id: "webp-to-jpg-converter",
    name: "WebP to JPG Converter",
    slug: "webp-to-jpg-converter-free",
    description: "Fast conversion from WebP to JPG format.",
    category: "converter",
    iconName: "Zap",
    instructions: ["Upload WebP.", "Convert.", "Download JPG."],
    faqs: [{ question: "Is there a size limit?", answer: "Up to 50MB per file." }],
    metaTitle: "WebP to JPG Converter - Free & Fast Image Tool",
    metaDescription: "Convert WebP to JPG online for free."
  },
  {
    id: "gif-to-mp4-converter",
    name: "GIF to MP4 Converter",
    slug: "gif-to-mp4-converter",
    description: "Convert animated GIFs to high-quality MP4 videos.",
    category: "converter",
    iconName: "Video",
    instructions: ["Upload GIF.", "Convert.", "Download MP4."],
    faqs: [{ question: "Will it loop?", answer: "Yes, MP4s can be set to loop." }],
    metaTitle: "GIF to MP4 Converter - Animated GIF to Video",
    metaDescription: "Convert GIF to MP4 online for free."
  },
  {
    id: "mp4-to-gif-converter",
    name: "MP4 to GIF Converter",
    slug: "mp4-to-gif-converter",
    description: "Create animated GIFs from your MP4 video clips.",
    category: "converter",
    iconName: "Video",
    instructions: ["Upload MP4.", "Select duration.", "Download GIF."],
    faqs: [{ question: "Is it high quality?", answer: "Yes, with optimized color palettes." }],
    metaTitle: "MP4 to GIF Converter - Video to Animated GIF",
    metaDescription: "Convert MP4 to GIF online for free."
  },
  {
    id: "fraction-to-decimal-converter",
    name: "Fraction to Decimal",
    slug: "fraction-to-decimal",
    description: "Convert fractions (e.g., 1/2) to decimal values (0.5).",
    category: "math",
    iconName: "Calculator",
    instructions: ["Enter numerator.", "Enter denominator.", "Get decimal."],
    faqs: [{ question: "Does it handle mixed numbers?", answer: "Yes." }],
    metaTitle: "Fraction to Decimal Converter - Math Tool Online",
    metaDescription: "Convert fractions to decimals online for free."
  },
  {
    id: "decimal-to-fraction-converter",
    name: "Decimal to Fraction",
    slug: "decimal-to-fraction",
    description: "Convert decimals back into simplified fractions.",
    category: "math",
    iconName: "Calculator",
    instructions: ["Enter decimal.", "Get fraction."],
    faqs: [{ question: "Is it simplified?", answer: "Yes, we reduce it to lowest terms." }],
    metaTitle: "Decimal to Fraction Converter - Math Tool Online",
    metaDescription: "Convert decimals to fractions online for free."
  },
  {
    id: "compound-interest-calculator",
    name: "Compound Interest Calculator",
    slug: "compound-interest-calculator",
    description: "Calculate how your savings grow over time with compound interest.",
    category: "math",
    iconName: "TrendingUp",
    instructions: ["Enter principal.", "Set rate and time.", "See total balance."],
    faqs: [{ question: "Supports monthly additions?", answer: "Yes." }],
    metaTitle: "Compound Interest Calculator - Savings Growth Tool",
    metaDescription: "Calculate compound interest online for free."
  },
  {
    id: "simple-interest-calculator",
    name: "Simple Interest Calculator",
    slug: "simple-interest-calculator",
    description: "Quickly calculate simple interest for loans or deposits.",
    category: "math",
    iconName: "DollarSign",
    instructions: ["Enter principal, rate, time.", "Calculate."],
    faqs: [{ question: "Whats the formula?", answer: "I = P * R * T" }],
    metaTitle: "Simple Interest Calculator - Basic Finance Tool",
    metaDescription: "Calculate simple interest online for free."
  },
  {
    id: "tip-calculator",
    name: "Tip Calculator",
    slug: "tip-calculator",
    description: "Easily split the bill and calculate tips with friends.",
    category: "math",
    iconName: "DollarSign",
    instructions: ["Enter bill total.", "Select tip %.", "Split between N people."],
    faqs: [{ question: "Includes tax?", answer: "You can enter pre-tax or post-tax total." }],
    metaTitle: "Tip Calculator - Split Bill Tool Online",
    metaDescription: "Calculate tips and split bills online for free."
  },
  {
    id: "discount-calculator",
    name: "Discount Calculator",
    slug: "discount-calculator",
    description: "Find out exactly how much you save during a sale.",
    category: "math",
    iconName: "Tag",
    instructions: ["Enter original price.", "Enter discount %.", "Get sale price."],
    faqs: [{ question: "Can I add tax?", answer: "Yes, optional tax field available." }],
    metaTitle: "Discount Calculator - Shopping Savings Tool",
    metaDescription: "Calculate sales discounts online for free."
  },
  {
    id: "keyword-density-checker-tool",
    name: "Keyword Density Checker",
    slug: "keyword-density-checker",
    description: "Analyze how often keywords appear in your content for SEO.",
    category: "marketing",
    iconName: "Search",
    instructions: ["Paste text or URL.", "Analyze density."],
    faqs: [{ question: "Is it accurate?", answer: "Yes, it counts 1, 2, and 3-word phrases." }],
    metaTitle: "Keyword Density Checker - SEO Content Tool",
    metaDescription: "Analyze keyword usage online for free."
  },
  {
    id: "redirect-checker-tool",
    name: "Redirect Checker",
    slug: "redirect-checker",
    description: "Trace the full path of any URL redirect (301, 302).",
    category: "marketing",
    iconName: "ArrowRight",
    instructions: ["Enter URL.", "Trace path."],
    faqs: [{ question: "Does it show status codes?", answer: "Yes, for every step." }],
    metaTitle: "Redirect Checker - Trace URL Hops Online",
    metaDescription: "Check redirect chains online for free."
  },
  // New Batch 3: Specialized Converters & SEO Boosters
  {
    id: "angle-converter-tool",
    name: "Angle Converter",
    slug: "angle-converter",
    description: "Convert between degrees, radians, and gradians.",
    category: "math",
    iconName: "Compass",
    instructions: ["Enter angle.", "Select units.", "Convert."],
    faqs: [{ question: "What is a radian?", answer: "The standard unit of angular measure." }],
    metaTitle: "Angle Converter - Degrees to Radians Online",
    metaDescription: "Convert angles online for free."
  },
  {
    id: "area-converter-tool",
    name: "Area Converter",
    slug: "area-converter",
    description: "Convert units of area (sq meters, acres, hectares).",
    category: "math",
    iconName: "Maximize",
    instructions: ["Enter area.", "Select units.", "Convert."],
    faqs: [{ question: "How big is an acre?", answer: "43,560 square feet." }],
    metaTitle: "Area Converter - Acres to Square Meters",
    metaDescription: "Convert area units online for free."
  },
  {
    id: "byte-converter-tool",
    name: "Byte Converter",
    slug: "byte-converter",
    description: "Convert between bytes, KB, MB, GB, and TB.",
    category: "converter",
    iconName: "Database",
    instructions: ["Enter value.", "Select unit.", "Convert."],
    faqs: [{ question: "Is it 1000 or 1024?", answer: "We use 1024 for binary units." }],
    metaTitle: "Byte Converter - MB to GB Online",
    metaDescription: "Convert digital storage units online for free."
  },
  {
    id: "energy-converter-tool",
    name: "Energy Converter",
    slug: "energy-converter",
    description: "Convert between Joules, Calories, and kWh.",
    category: "math",
    iconName: "Zap",
    instructions: ["Enter energy.", "Select units.", "Convert."],
    faqs: [{ question: "1 Calorie is how many Joules?", answer: "4.184 Joules." }],
    metaTitle: "Energy Converter - Joules to Calories Online",
    metaDescription: "Convert energy units online for free."
  },
  {
    id: "force-converter-tool",
    name: "Force Converter",
    slug: "force-converter",
    description: "Convert units of force (Newtons, Dynes, Pound-force).",
    category: "math",
    iconName: "Zap",
    instructions: ["Enter force.", "Select units.", "Convert."],
    faqs: [{ question: "What is a Newton?", answer: "SI unit of force." }],
    metaTitle: "Force Converter - Newtons to Pound-force",
    metaDescription: "Convert force units online for free."
  },
  {
    id: "fuel-consumption-converter-tool",
    name: "Fuel Consumption Converter",
    slug: "fuel-consumption-converter",
    description: "Convert between MPG and Liters per 100km.",
    category: "converter",
    iconName: "Fuel",
    instructions: ["Enter consumption.", "Select units.", "Convert."],
    faqs: [{ question: "What is L/100km?", answer: "Metric efficiency unit." }],
    metaTitle: "Fuel Consumption Converter - MPG to L/100km",
    metaDescription: "Convert fuel efficiency online for free."
  },
  {
    id: "length-converter-tool",
    name: "Length Converter",
    slug: "length-converter",
    description: "Convert between meters, feet, inches, and miles.",
    category: "math",
    iconName: "Ruler",
    instructions: ["Enter length.", "Select units.", "Convert."],
    faqs: [{ question: "1 mile is how many km?", answer: "1.609 km." }],
    metaTitle: "Length Converter - Metric to Imperial Online",
    metaDescription: "Convert length units online for free."
  },
  {
    id: "power-converter-tool",
    name: "Power Converter",
    slug: "power-converter",
    description: "Convert between Watts, Horsepower, and BTUs.",
    category: "math",
    iconName: "Zap",
    instructions: ["Enter power.", "Select units.", "Convert."],
    faqs: [{ question: "1 HP is how many Watts?", answer: "745.7 Watts." }],
    metaTitle: "Power Converter - Watts to Horsepower Online",
    metaDescription: "Convert power units online for free."
  },
  {
    id: "pressure-converter-tool",
    name: "Pressure Converter",
    slug: "pressure-converter",
    description: "Convert between PSI, Bar, and Pascal.",
    category: "math",
    iconName: "Zap",
    instructions: ["Enter pressure.", "Select units.", "Convert."],
    faqs: [{ question: "What is 1 bar in PSI?", answer: "14.5038 PSI." }],
    metaTitle: "Pressure Converter - PSI to Bar Online",
    metaDescription: "Convert pressure units online for free."
  },
  {
    id: "speed-converter-tool",
    name: "Speed Converter",
    slug: "speed-converter",
    description: "Convert between km/h, mph, and mach.",
    category: "math",
    iconName: "Gauge",
    instructions: ["Enter speed.", "Select units.", "Convert."],
    faqs: [{ question: "What is Mach 1?", answer: "The speed of sound." }],
    metaTitle: "Speed Converter - km/h to mph Online",
    metaDescription: "Convert speed units online for free."
  },
  {
    id: "temperature-converter-tool",
    name: "Temperature Converter",
    slug: "temperature-converter",
    description: "Convert between Celsius, Fahrenheit, and Kelvin.",
    category: "math",
    iconName: "Thermometer",
    instructions: ["Enter temp.", "Select units.", "Convert."],
    faqs: [{ question: "Absolute zero?", answer: "-273.15 °C." }],
    metaTitle: "Temperature Converter - Celsius to Fahrenheit",
    metaDescription: "Convert temperature online for free."
  },
  {
    id: "time-converter-tool",
    name: "Time Converter",
    slug: "time-converter",
    description: "Convert between seconds, minutes, hours, and days.",
    category: "math",
    iconName: "Clock",
    instructions: ["Enter time.", "Select units.", "Convert."],
    faqs: [{ question: "Seconds in a day?", answer: "86,400." }],
    metaTitle: "Time Converter - Hours to Seconds Online",
    metaDescription: "Convert time units online for free."
  },
  {
    id: "torque-converter-tool",
    name: "Torque Converter",
    slug: "torque-converter",
    description: "Convert between Newton-meters and Pound-feet.",
    category: "math",
    iconName: "Settings",
    instructions: ["Enter torque.", "Select units.", "Convert."],
    faqs: [{ question: "What is torque?", answer: "Rotational force." }],
    metaTitle: "Torque Converter - Nm to lb-ft Online",
    metaDescription: "Convert torque units online for free."
  },
  {
    id: "volume-converter-tool",
    name: "Volume Converter",
    slug: "volume-converter",
    description: "Convert between liters, gallons, and cubic meters.",
    category: "math",
    iconName: "Box",
    instructions: ["Enter volume.", "Select units.", "Convert."],
    faqs: [{ question: "1 gallon is how many liters?", answer: "3.785 liters (US)." }],
    metaTitle: "Volume Converter - Liters to Gallons Online",
    metaDescription: "Convert volume units online for free."
  },
  {
    id: "weight-converter-tool",
    name: "Weight Converter",
    slug: "weight-converter",
    description: "Convert between kilograms, pounds, and ounces.",
    category: "math",
    iconName: "Scale",
    instructions: ["Enter weight.", "Select units.", "Convert."],
    faqs: [{ question: "1 kg is how many lbs?", answer: "2.20462 lbs." }],
    metaTitle: "Weight Converter - kg to lbs Online",
    metaDescription: "Convert weight units online for free."
  },
  {
    id: "data-transfer-rate-converter-tool",
    name: "Data Transfer Rate Converter",
    slug: "data-transfer-rate-converter",
    description: "Convert between Mbps, MBps, and Gbps.",
    category: "converter",
    iconName: "Zap",
    instructions: ["Enter rate.", "Select units.", "Convert."],
    faqs: [{ question: "Mbps vs MBps?", answer: "Mbps is bits, MBps is bytes (8x more)." }],
    metaTitle: "Data Transfer Rate Converter - Mbps to MBps",
    metaDescription: "Convert data rates online for free."
  },
  {
    id: "digital-storage-converter-tool",
    name: "Digital Storage Converter",
    slug: "digital-storage-converter",
    description: "Convert between bits, bytes, KB, MB, GB, TB.",
    category: "converter",
    iconName: "Database",
    instructions: ["Enter size.", "Select units.", "Convert."],
    faqs: [{ question: "How many bits in a byte?", answer: "8." }],
    metaTitle: "Digital Storage Converter - MB to GB online",
    metaDescription: "Convert storage units online for free."
  },
  {
    id: "binary-to-hex-tool",
    name: "Binary to Hex Converter",
    slug: "binary-to-hex",
    description: "Convert binary bits to hexadecimal code.",
    category: "developer",
    iconName: "Binary",
    instructions: ["Enter binary.", "Convert."],
    faqs: [{ question: "What is hex?", answer: "Base-16 number system." }],
    metaTitle: "Binary to Hex Converter - Developer Tool",
    metaDescription: "Convert binary to hex online for free."
  },
  {
    id: "hex-to-binary-tool",
    name: "Hex to Binary Converter",
    slug: "hex-to-binary",
    description: "Convert hexadecimal code to binary bits.",
    category: "developer",
    iconName: "Binary",
    instructions: ["Enter hex.", "Convert."],
    faqs: [{ question: "Is it reversible?", answer: "Yes." }],
    metaTitle: "Hex to Binary Converter - Developer Tool",
    metaDescription: "Convert hex to binary online for free."
  },
  {
    id: "binary-to-octal-tool",
    name: "Binary to Octal Converter",
    slug: "binary-to-octal",
    description: "Convert binary bits to octal values.",
    category: "developer",
    iconName: "Binary",
    instructions: ["Enter binary.", "Convert."],
    faqs: [{ question: "What is octal?", answer: "Base-8 number system." }],
    metaTitle: "Binary to Octal Converter - Developer Tool",
    metaDescription: "Convert binary to octal online for free."
  },
  {
    id: "octal-to-binary-tool",
    name: "Octal to Binary Converter",
    slug: "octal-to-binary",
    description: "Convert octal values back to binary bits.",
    category: "developer",
    iconName: "Binary",
    instructions: ["Enter octal.", "Convert."],
    faqs: [{ question: "Is it reversible?", answer: "Yes." }],
    metaTitle: "Octal to Binary Converter - Developer Tool",
    metaDescription: "Convert octal to binary online for free."
  },
  {
    id: "hex-to-text-tool",
    name: "Hex to Text Converter",
    slug: "hex-to-text",
    description: "Decode hexadecimal characters to plain text.",
    category: "developer",
    iconName: "FileCode",
    instructions: ["Enter hex.", "Convert."],
    faqs: [{ question: "What encoding?", answer: "UTF-8." }],
    metaTitle: "Hex to Text Converter - Developer Tool",
    metaDescription: "Convert hex to text online for free."
  },
  {
    id: "text-to-hex-tool",
    name: "Text to Hex Converter",
    slug: "text-to-hex",
    description: "Encode plain text into hexadecimal strings.",
    category: "developer",
    iconName: "FileCode",
    instructions: ["Enter text.", "Convert."],
    faqs: [{ question: "Why use hex?", answer: "For debugging or data representation." }],
    metaTitle: "Text to Hex Converter - Developer Tool",
    metaDescription: "Convert text to hex online for free."
  },
  {
    id: "binary-to-decimal-tool",
    name: "Binary to Decimal Converter",
    slug: "binary-to-decimal",
    description: "Convert binary bits to decimal numbers.",
    category: "math",
    iconName: "Calculator",
    instructions: ["Enter binary.", "Convert."],
    faqs: [{ question: "Example?", answer: "1010 in binary is 10 in decimal." }],
    metaTitle: "Binary to Decimal Converter - Math Tool",
    metaDescription: "Convert binary to decimal online for free."
  },
  {
    id: "decimal-to-binary-tool",
    name: "Decimal to Binary Converter",
    slug: "decimal-to-binary",
    description: "Convert decimal numbers to binary bits.",
    category: "math",
    iconName: "Calculator",
    instructions: ["Enter decimal.", "Convert."],
    faqs: [{ question: "Is it reversible?", answer: "Yes." }],
    metaTitle: "Decimal to Binary Converter - Math Tool",
    metaDescription: "Convert decimal to binary online for free."
  },
  {
    id: "html-entities-encode-tool",
    name: "HTML Entities Encoder",
    slug: "html-entities-encode",
    description: "Convert special characters to HTML entities.",
    category: "developer",
    iconName: "Code",
    instructions: ["Enter text.", "Encode."],
    faqs: [{ question: "Example?", answer: "& becomes &amp;." }],
    metaTitle: "HTML Entities Encoder - Web Dev Tool",
    metaDescription: "Encode HTML entities online for free."
  },
  {
    id: "html-entities-decode-tool",
    name: "HTML Entities Decoder",
    slug: "html-entities-decode",
    description: "Convert HTML entities back to normal characters.",
    category: "developer",
    iconName: "Code",
    instructions: ["Enter entities.", "Decode."],
    faqs: [{ question: "Is it secure?", answer: "Yes." }],
    metaTitle: "HTML Entities Decoder - Web Dev Tool",
    metaDescription: "Decode HTML entities online for free."
  },
  {
    id: "markdown-to-html-tool",
    name: "Markdown to HTML Converter",
    slug: "markdown-to-html",
    description: "Convert Markdown syntax to clean HTML markup.",
    category: "developer",
    iconName: "FileText",
    instructions: ["Paste Markdown.", "Convert."],
    faqs: [{ question: "Supports GFM?", answer: "Yes." }],
    metaTitle: "Markdown to HTML Converter - Web Dev Tool",
    metaDescription: "Convert Markdown to HTML online for free."
  },
  {
    id: "html-to-markdown-tool",
    name: "HTML to Markdown Converter",
    slug: "html-to-markdown",
    description: "Convert HTML markup back to Markdown syntax.",
    category: "developer",
    iconName: "FileText",
    instructions: ["Paste HTML.", "Convert."],
    faqs: [{ question: "Clean output?", answer: "Yes, optimized for readability." }],
    metaTitle: "HTML to Markdown Converter - Web Dev Tool",
    metaDescription: "Convert HTML to Markdown online for free."
  },
  {
    id: "ascii-to-text-tool",
    name: "ASCII to Text Converter",
    slug: "ascii-to-text",
    description: "Convert ASCII decimal codes back to text.",
    category: "text",
    iconName: "Keyboard",
    instructions: ["Enter ASCII codes.", "Convert."],
    faqs: [{ question: "Separator?", answer: "Space or comma." }],
    metaTitle: "ASCII to Text Converter - Online Text Tool",
    metaDescription: "Convert ASCII to text online for free."
  },
  {
    id: "text-to-ascii-tool",
    name: "Text to ASCII Converter",
    slug: "text-to-ascii",
    description: "Convert plain text to ASCII decimal codes.",
    category: "text",
    iconName: "Keyboard",
    instructions: ["Enter text.", "Convert."],
    faqs: [{ question: "Is it reversible?", answer: "Yes." }],
    metaTitle: "Text to ASCII Converter - Online Text Tool",
    metaDescription: "Convert text to ASCII online for free."
  },
  {
    id: "sha1-hash-generator",
    name: "SHA-1 Hash Generator",
    slug: "sha1-hash-generator",
    description: "Generate SHA-1 hashes from text.",
    category: "developer",
    iconName: "Hash",
    instructions: ["Enter text.", "Generate."],
    faqs: [{ question: "Is SHA-1 secure?", answer: "Not for high-security uses." }],
    metaTitle: "SHA-1 Hash Generator - Online Hash Tool",
    metaDescription: "Generate SHA-1 hashes online for free."
  },
  {
    id: "sha-512-hash-generator",
    name: "SHA-512 Hash Generator",
    slug: "sha-512-hash-generator",
    description: "Generate secure SHA-512 hashes from text.",
    category: "developer",
    iconName: "Hash",
    instructions: ["Enter text.", "Generate."],
    faqs: [{ question: "Is it stronger than SHA-256?", answer: "Yes." }],
    metaTitle: "SHA-512 Hash Generator - Online Secure Hash",
    metaDescription: "Generate SHA-512 hashes online for free."
  },
  // Final Batch to 200+
  {
    id: "case-converter-title",
    name: "Title Case Converter",
    slug: "title-case-converter",
    description: "Convert text to Title Case (Capitalize Every Word).",
    category: "text",
    iconName: "Type",
    instructions: ["Enter text.", "Convert."],
    faqs: [{ question: "What is title case?", answer: "Capitalizing the first letter of each word." }],
    metaTitle: "Title Case Converter - Capitalize Text Online",
    metaDescription: "Convert text to title case online for free."
  },
  {
    id: "case-converter-camel",
    name: "camelCase Converter",
    slug: "camel-case-converter",
    description: "Convert text to camelCase for programming.",
    category: "developer",
    iconName: "FileCode",
    instructions: ["Enter text.", "Convert."],
    faqs: [{ question: "Where is it used?", answer: "In JavaScript and Java variables." }],
    metaTitle: "camelCase Converter - Coding Utility Online",
    metaDescription: "Convert text to camelCase online for free."
  },
  {
    id: "case-converter-snake",
    name: "snake_case Converter",
    slug: "snake-case-converter",
    description: "Convert text to snake_case for Python or DB naming.",
    category: "developer",
    iconName: "FileCode",
    instructions: ["Enter text.", "Convert."],
    faqs: [{ question: "What is snake_case?", answer: "Words separated by underscores." }],
    metaTitle: "snake_case Converter - Python & SQL Utility",
    metaDescription: "Convert text to snake_case online for free."
  },
  {
    id: "case-converter-kebab",
    name: "kebab-case Converter",
    slug: "kebab-case-converter",
    description: "Convert text to kebab-case for URL slugs or CSS classes.",
    category: "developer",
    iconName: "FileCode",
    instructions: ["Enter text.", "Convert."],
    faqs: [{ question: "Why kebab-case?", answer: "Ideal for SEO-friendly URLs." }],
    metaTitle: "kebab-case Converter - URL Slug Utility",
    metaDescription: "Convert text to kebab-case online for free."
  },
  {
    id: "qr-code-wifi",
    name: "WiFi QR Code Generator",
    slug: "wifi-qr-code-generator",
    description: "Generate QR codes to share your WiFi network easily.",
    category: "marketing",
    iconName: "Wifi",
    instructions: ["Enter SSID.", "Enter Password.", "Download QR."],
    faqs: [{ question: "Is it secure?", answer: "Yes, data stays in the QR code." }],
    metaTitle: "WiFi QR Code Generator - Share WiFi Password",
    metaDescription: "Generate WiFi QR codes online for free."
  },
  {
    id: "qr-code-vcard",
    name: "vCard QR Code Generator",
    slug: "vcard-qr-code-generator",
    description: "Create digital business card QR codes.",
    category: "marketing",
    iconName: "Contact",
    instructions: ["Enter contact info.", "Generate QR.", "Download."],
    faqs: [{ question: "What is a vCard?", answer: "A standard for electronic business cards." }],
    metaTitle: "vCard QR Code Generator - Digital Business Card",
    metaDescription: "Create vCard QR codes online for free."
  },
  {
    id: "image-filter-vintage",
    name: "Vintage Image Filter",
    slug: "vintage-image-filter",
    description: "Give your photos a classic vintage look.",
    category: "image",
    iconName: "Camera",
    instructions: ["Upload photo.", "Apply filter.", "Download."],
    faqs: [{ question: "What effect?", answer: "Adds warmth and slight grain." }],
    metaTitle: "Vintage Image Filter - Retro Photo Effect",
    metaDescription: "Apply vintage filters to photos online for free."
  },
  {
    id: "image-filter-sepia",
    name: "Sepia Image Filter",
    slug: "sepia-image-filter",
    description: "Convert your photos to timeless sepia tones.",
    category: "image",
    iconName: "Camera",
    instructions: ["Upload photo.", "Apply sepia.", "Download."],
    faqs: [{ question: "Is it reversible?", answer: "Yes, before downloading." }],
    metaTitle: "Sepia Image Filter - Classic Photo Tones",
    metaDescription: "Apply sepia filters to photos online for free."
  },
  {
    id: "social-media-headline-generator",
    name: "Social Media Headline Generator",
    slug: "social-media-headline-generator",
    description: "Create catchy headlines for your social media posts.",
    category: "marketing",
    iconName: "MessageSquare",
    instructions: ["Enter topic.", "Get 10+ headlines."],
    faqs: [{ question: "Does it use AI?", answer: "Uses proven marketing formulas." }],
    metaTitle: "Social Media Headline Generator - Viral Copy Tool",
    metaDescription: "Generate viral social media headlines online for free."
  },
  {
    id: "email-signature-generator-tool",
    name: "Email Signature Generator",
    slug: "email-signature-generator",
    description: "Professional HTML email signatures in seconds.",
    category: "marketing",
    iconName: "Mail",
    instructions: ["Enter details.", "Pick template.", "Copy HTML."],
    faqs: [{ question: "Works with Gmail?", answer: "Yes, and Outlook." }],
    metaTitle: "Email Signature Generator - Professional Branding",
    metaDescription: "Generate HTML email signatures online for free."
  },
  {
    id: "text-to-handwriting-tool",
    name: "Text to Handwriting",
    slug: "text-to-handwriting",
    description: "Convert digital text to realistic handwriting.",
    category: "text",
    iconName: "PenTool",
    instructions: ["Enter text.", "Select font style.", "Download image."],
    faqs: [{ question: "Can I use it for letters?", answer: "Yes, ideal for personalized messages." }],
    metaTitle: "Text to Handwriting - Digital Calligraphy Tool",
    metaDescription: "Convert text to handwriting online for free."
  },
  {
    id: "lorem-ipsum-generator-html",
    name: "HTML Lorem Ipsum Generator",
    slug: "html-lorem-ipsum-generator",
    description: "Generate placeholder text wrapped in HTML tags.",
    category: "developer",
    iconName: "Code",
    instructions: ["Select paragraphs.", "Choose tags (p, div, li).", "Copy HTML."],
    faqs: [{ question: "What is Lorem Ipsum?", answer: "Standard placeholder text." }],
    metaTitle: "HTML Lorem Ipsum Generator - Web Dev Layout Tool",
    metaDescription: "Generate HTML placeholder text online for free."
  },
  {
    id: "barcode-generator-ean",
    name: "EAN-13 Barcode Generator",
    slug: "ean-barcode-generator",
    description: "Generate standard EAN-13 retail barcodes.",
    category: "marketing",
    iconName: "Barcode",
    instructions: ["Enter 12 digits.", "Generate.", "Download."],
    faqs: [{ question: "What is EAN?", answer: "European Article Number." }],
    metaTitle: "EAN-13 Barcode Generator - Retail Tool",
    metaDescription: "Generate EAN barcodes online for free."
  },
  {
    id: "barcode-generator-upc",
    name: "UPC-A Barcode Generator",
    slug: "upc-barcode-generator",
    description: "Generate standard UPC-A retail barcodes.",
    category: "marketing",
    iconName: "Barcode",
    instructions: ["Enter 11 digits.", "Generate.", "Download."],
    faqs: [{ question: "What is UPC?", answer: "Universal Product Code (US standard)." }],
    metaTitle: "UPC-A Barcode Generator - Retail Tool",
    metaDescription: "Generate UPC barcodes online for free."
  },
  {
    id: "password-generator-pro",
    name: "Advanced Password Generator",
    slug: "password-generator-pro",
    description: "Create ultra-secure passwords with advanced options.",
    category: "security",
    iconName: "ShieldCheck",
    instructions: ["Set length.", "Toggle symbols.", "Generate."],
    faqs: [{ question: "Is it random?", answer: "Uses cryptographically secure random values." }],
    metaTitle: "Advanced Password Generator - Pro Security Tool",
    metaDescription: "Generate secure passwords online for free."
  },
];

export function getToolBySlug(slug: string) {
  return TOOLS.find(tool => tool.slug === slug);
}

export function getToolsByCategory(categoryId: ToolCategory) {
  return TOOLS.filter(tool => tool.category === categoryId);
}
