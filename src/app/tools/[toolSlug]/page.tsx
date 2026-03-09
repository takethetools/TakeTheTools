import { getToolBySlug, TOOLS } from "@/lib/tools";
import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Home, Share2, HelpCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import AdPlaceholder from "@/components/common/AdPlaceholder";
import { getToolAboutContent } from "@/lib/tool-content";
import { MDXRemote } from "next-mdx-remote/rsc";
import WebPToPngTool from "@/components/tools/WebPToPngTool";
import PngToJpgTool from "@/components/tools/PngToJpgTool";
import ImageCompressorTool from "@/components/tools/ImageCompressorTool";
import ImageResizerTool from "@/components/tools/ImageResizerTool";
import JsonFormatterTool from "@/components/tools/JsonFormatterTool";
import Base64Tool from "@/components/tools/Base64Tool";
import JwtDecoderTool from "@/components/tools/JwtDecoderTool";
import WordCounterTool from "@/components/tools/WordCounterTool";
import QrCodeGeneratorTool from "@/components/tools/QrCodeGeneratorTool";
import PasswordGeneratorTool from "@/components/tools/PasswordGeneratorTool";
import MergePdfTool from "@/components/tools/MergePdfTool";
import SplitPdfTool from "@/components/tools/SplitPdfTool";
import Mp4ToMp3Tool from "@/components/tools/Mp4ToMp3Tool";
import VideoConverterTool from "@/components/tools/VideoConverterTool";
import CaseConverterTool from "@/components/tools/CaseConverterTool";
import RegexTesterTool from "@/components/tools/RegexTesterTool";
import JpgToPdfTool from "@/components/tools/JpgToPdfTool";
import PdfToJpgTool from "@/components/tools/PdfToJpgTool";
import ImageCropperTool from "@/components/tools/ImageCropperTool";
import FaviconGeneratorTool from "@/components/tools/FaviconGeneratorTool";
import ImageToWebpTool from "@/components/tools/ImageToWebpTool";
import SqlFormatterTool from "@/components/tools/SqlFormatterTool";
import XmlFormatterTool from "@/components/tools/XmlFormatterTool";
import HtmlFormatterTool from "@/components/tools/HtmlFormatterTool";
import LoremIpsumGeneratorTool from "@/components/tools/LoremIpsumGeneratorTool";
import DiffCheckerTool from "@/components/tools/DiffCheckerTool";
import NumberSystemConverterTool from "@/components/tools/NumberSystemConverterTool";
import UnitConverterTool from "@/components/tools/UnitConverterTool";
import ColorConverterTool from "@/components/tools/ColorConverterTool";
import ComingSoonTool from "@/components/tools/ComingSoonTool";
import BulkImageConverterTool from "@/components/tools/BulkImageConverterTool";
import ImageFilterTool from "@/components/tools/ImageFilterTool";
import RotatePDFTool from "@/components/tools/RotatePDFTool";
import DeletePDFPagesTool from "@/components/tools/DeletePDFPagesTool";
import PDFToTextTool from "@/components/tools/PDFToTextTool";
import PasswordProtectPDFTool from "@/components/tools/PasswordProtectPDFTool";
import WatermarkPDFTool from "@/components/tools/WatermarkPDFTool";
import CodeFormatterTool from "@/components/tools/CodeFormatterTool";
import HashGeneratorTool from "@/components/tools/HashGeneratorTool";
import URLConverterTool from "@/components/tools/URLConverterTool";
import CrontabGeneratorTool from "@/components/tools/CrontabGeneratorTool";
import MarkdownPreviewerTool from "@/components/tools/MarkdownPreviewerTool";
import JsonCsvConverter from "@/components/tools/JsonCsvConverter";
import CurlToFetchTool from "@/components/tools/CurlToFetchTool";
import RobotsTxtGeneratorTool from "@/components/tools/RobotsTxtGeneratorTool";
import TextProcessingTool from "@/components/tools/TextProcessingTool";
import TextConverterTool from "@/components/tools/TextConverterTool";
import SentimentAnalysisTool from "@/components/tools/SentimentAnalysisTool";
import FindAndReplaceTool from "@/components/tools/FindAndReplaceTool";
import WordFrequencyTool from "@/components/tools/WordFrequencyTool";
import InstaBioFontGeneratorTool from "@/components/tools/InstaBioFontGeneratorTool";
import SitemapGeneratorTool from "@/components/tools/SitemapGeneratorTool";
import ASCIIArtTool from "@/components/tools/ASCIIArtTool";
import TwitterCharacterCounterTool from "@/components/tools/TwitterCharacterCounterTool";
import UTMBuilderTool from "@/components/tools/UTMBuilderTool";
import OGPreviewerTool from "@/components/tools/OGPreviewerTool";
import MetaTagGeneratorTool from "@/components/tools/MetaTagGeneratorTool";
import PercentageCalculatorTool from "@/components/tools/PercentageCalculatorTool";
import AverageCalculatorTool from "@/components/tools/AverageCalculatorTool";
import BMICalculatorTool from "@/components/tools/BMICalculatorTool";
import AgeCalculatorTool from "@/components/tools/AgeCalculatorTool";
import LoanCalculatorTool from "@/components/tools/LoanCalculatorTool";
import RandomNumberGeneratorTool from "@/components/tools/RandomNumberGeneratorTool";
import DateDifferenceTool from "@/components/tools/DateDifferenceTool";
import AESTool from "@/components/tools/AESTool";
import PasswordStrengthTool from "@/components/tools/PasswordStrengthTool";
import Base32Tool from "@/components/tools/Base32Tool";
import UnixTimestampTool from "@/components/tools/UnixTimestampTool";
import UuidGeneratorTool from "@/components/tools/UuidGeneratorTool";
import IpLookupTool from "@/components/tools/IpLookupTool";
import HtmlEntityConverterTool from "@/components/tools/HtmlEntityConverterTool";
import HexToDecimalTool from "@/components/tools/HexToDecimalTool";
import PdfToWordTool from "@/components/tools/PdfToWordTool";
import JsonYamlConverter from "@/components/tools/JsonYamlConverter";
import BarcodeGeneratorTool from "@/components/tools/BarcodeGeneratorTool";
import TextToSpeechTool from "@/components/tools/TextToSpeechTool";
import ImageColorPickerTool from "@/components/tools/ImageColorPickerTool";
import SocialMediaResizerTool from "@/components/tools/SocialMediaResizerTool";

const TOOL_COMPONENTS: Record<string, React.ComponentType<any>> = {
  "webp-to-png-converter": WebPToPngTool,
  "png-to-jpg-converter": PngToJpgTool,
  "image-compressor": ImageCompressorTool,
  "image-resizer": ImageResizerTool,
  "json-formatter-and-validator": JsonFormatterTool,
  "base64-encoder-and-decoder": Base64Tool,
  "jwt-decoder": JwtDecoderTool,
  "word-counter": WordCounterTool,
  "qr-code-generator": QrCodeGeneratorTool,
  "password-generator": PasswordGeneratorTool,
  "merge-pdf": MergePdfTool,
  "split-pdf": SplitPdfTool,
  "mp4-to-mp3-converter": Mp4ToMp3Tool,
  "video-converter": VideoConverterTool,
  "case-converter": CaseConverterTool,
  "regex-tester": RegexTesterTool,
  "jpg-to-pdf": JpgToPdfTool,
  "pdf-to-jpg": PdfToJpgTool,
  "image-cropper": ImageCropperTool,
  "favicon-generator": FaviconGeneratorTool,
  "image-to-webp": ImageToWebpTool,
  "jpg-to-webp": ImageToWebpTool,
  "png-to-webp": ImageToWebpTool,
  "bmp-to-jpg": () => <BulkImageConverterTool sourceFormat="BMP" targetFormat="JPG" />,
  "ico-to-png": () => <BulkImageConverterTool sourceFormat="ICO" targetFormat="PNG" />,
  "tiff-to-png": () => <BulkImageConverterTool sourceFormat="TIFF" targetFormat="PNG" />,
  "heic-to-jpg": () => <BulkImageConverterTool sourceFormat="HEIC" targetFormat="JPG" />,
  "svg-to-png": () => <BulkImageConverterTool sourceFormat="SVG" targetFormat="PNG" />,
  "grayscale-image": () => <ImageFilterTool filterType="grayscale" />,
  "invert-image": () => <ImageFilterTool filterType="invert" />,
  "rotate-image": () => <ImageFilterTool filterType="rotate" />,
  "flip-image": () => <ImageFilterTool filterType="flip" />,
  "rotate-pdf-pages": RotatePDFTool,
  "delete-pdf-pages": DeletePDFPagesTool,
  "pdf-to-text": PDFToTextTool,
  "password-protect-pdf": PasswordProtectPDFTool,
  "watermark-pdf": WatermarkPDFTool,
  "sql-formatter": SqlFormatterTool,
  "xml-formatter": XmlFormatterTool,
  "html-formatter": HtmlFormatterTool,
  "css-formatter": () => <CodeFormatterTool language="css" />,
  "javascript-formatter": () => <CodeFormatterTool language="javascript" />,
  "url-encoder": () => <URLConverterTool mode="encode" />,
  "url-decoder": () => <URLConverterTool mode="decode" />,
  "md5-hash-generator": () => <HashGeneratorTool algorithm="MD5" />,
  "sha-256-hash-generator": () => <HashGeneratorTool algorithm="SHA-256" />,
  "crontab-generator": CrontabGeneratorTool,
  "markdown-previewer": MarkdownPreviewerTool,
  "json-to-csv": () => <JsonCsvConverter mode="json-to-csv" />,
  "csv-to-json": () => <JsonCsvConverter mode="csv-to-json" />,
  "curl-to-fetch": CurlToFetchTool,
  "robots-txt-generator": RobotsTxtGeneratorTool,
  "text-reverser": () => <TextProcessingTool mode="reverse" />,
  "remove-duplicate-lines": () => <TextProcessingTool mode="remove-duplicates" />,
  "alphabetical-line-sorter": () => <TextProcessingTool mode="sort-lines" />,
  "remove-whitespace": () => <TextProcessingTool mode="remove-whitespace" />,
  "morse-code-converter": () => <TextConverterTool mode="morse" />,
  "binary-to-text": () => <TextConverterTool mode="binary" />,
  "slug-generator": () => <TextConverterTool mode="slug" />,
  "upside-down-text": () => <TextConverterTool mode="upside-down" />,
  "sentiment-analysis": SentimentAnalysisTool,
  "find-and-replace": FindAndReplaceTool,
  "word-frequency-counter": WordFrequencyTool,
  "insta-bio-font-generator": InstaBioFontGeneratorTool,
  "sitemap-generator-xml": SitemapGeneratorTool,
  "ascii-art-generator": ASCIIArtTool,
  "twitter-character-counter": TwitterCharacterCounterTool,
  "utm-builder": UTMBuilderTool,
  "og-previewer": OGPreviewerTool,
  "meta-tag-generator": MetaTagGeneratorTool,
  "percentage-calculator": PercentageCalculatorTool,
  "average-calculator": AverageCalculatorTool,
  "bmi-calculator": BMICalculatorTool,
  "age-calculator": AgeCalculatorTool,
  "loan-calculator": LoanCalculatorTool,
  "random-number-generator": RandomNumberGeneratorTool,
  "date-difference": DateDifferenceTool,
  "aes-encrypt": () => <AESTool mode="encrypt" />,
  "aes-decrypt": () => <AESTool mode="decrypt" />,
  "password-strength-checker": PasswordStrengthTool,
  "base32-encoder": () => <Base32Tool mode="encode" />,
  "base32-decoder": () => <Base32Tool mode="decode" />,
  "unix-timestamp": UnixTimestampTool,
  "uuid-generator": UuidGeneratorTool,
  "ip-lookup": IpLookupTool,
  "html-entity-converter": HtmlEntityConverterTool,
  "hex-to-decimal": HexToDecimalTool,
  "pdf-to-word": PdfToWordTool,
  "json-to-yaml": () => <JsonYamlConverter mode="json-to-yaml" />,
  "yaml-to-json": () => <JsonYamlConverter mode="yaml-to-json" />,
  "barcode-generator": BarcodeGeneratorTool,
  "text-to-speech": TextToSpeechTool,
  "image-color-picker": ImageColorPickerTool,
  "social-media-resizer": SocialMediaResizerTool,
  "lorem-ipsum-generator": LoremIpsumGeneratorTool,
  "diff-checker": DiffCheckerTool,
  "number-system-converter": NumberSystemConverterTool,
  "unit-converter": UnitConverterTool,
  "color-converter": ColorConverterTool,
};

interface Props {
  params: Promise<{ toolSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { toolSlug } = await params;
  const tool = getToolBySlug(toolSlug);
  if (!tool) return { title: "Tool Not Found" };

  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    openGraph: {
      title: tool.metaTitle,
      description: tool.metaDescription,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.metaTitle,
      description: tool.metaDescription,
    },
    alternates: {
      canonical: `https://takethetools.com/tools/${toolSlug}`,
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { toolSlug } = await params;
  const tool = getToolBySlug(toolSlug);

  if (!tool) {
    return <div className="container mx-auto px-4 py-32 text-center">Tool not found</div>;
  }

  const aboutContent = getToolAboutContent(toolSlug);

  // Related tools (same category, different tool)
  const relatedTools = TOOLS.filter(t => t.category === tool.category && t.id !== tool.id).slice(0, 3);

  return (
    <div className="pt-10 pb-20">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-primary-600 transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" /> Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/categories" className="hover:text-primary-600 transition-colors">Tools</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 font-medium">{tool.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="mb-10">
              <h1 className="text-4xl font-display font-bold text-slate-900 mb-4 tracking-tight">
                {tool.name}
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
                {tool.description}
              </p>
            </div>

            {/* Tool Interaction Area */}
            <div className="mb-12">
              {(() => {
                const ToolComponent = TOOL_COMPONENTS[tool.id] || ComingSoonTool;
                return <ToolComponent />;
              })()}
            </div>

            <AdPlaceholder type="horizontal" className="mb-12" />

            {/* Extended About Content Section */}
            {aboutContent && (
              <div className="mb-16 pt-16 border-t border-slate-100">
                <div className="prose prose-slate prose-lg max-w-none 
                  prose-headings:font-display prose-headings:font-bold 
                  prose-h2:text-3xl prose-h2:mb-8 prose-h2:mt-12
                  prose-p:text-slate-600 prose-p:leading-relaxed
                  prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-slate-900
                  prose-ul:list-disc prose-ul:pl-6
                  prose-ol:list-decimal prose-ol:pl-6
                  prose-li:text-slate-600 prose-li:mb-2"
                >
                  <MDXRemote source={aboutContent} />
                </div>
              </div>
            )}

            {/* Instructions Section */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-primary-600" />
                How to use {tool.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tool.instructions.map((step, index) => (
                  <div key={index} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 relative">
                    <span className="absolute -top-4 -left-4 w-10 h-10 bg-white border-4 border-slate-50 rounded-full flex items-center justify-center font-bold text-primary-600 shadow-sm">
                      {index + 1}
                    </span>
                    <p className="text-slate-700 font-medium">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <AdPlaceholder type="horizontal" className="mb-16" />

            {/* FAQ Section */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-primary-600" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {tool.faqs.map((faq, index) => (
                  <div key={index} className="bg-white border border-slate-100 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-900 mb-3">{faq.question}</h3>
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-1 space-y-8">
            <AdPlaceholder type="sidebar" />
            
            <div className="bg-slate-900 text-white rounded-3xl p-8">
              <h3 className="text-xl font-bold mb-6">Related Tools</h3>
              <div className="space-y-4">
                {relatedTools.map(t => (
                  <Link 
                    key={t.id} 
                    href={`/tools/${t.slug}`}
                    className="group block p-4 bg-slate-800 rounded-xl hover:bg-primary-600 transition-all"
                  >
                    <h4 className="font-bold text-sm mb-1">{t.name}</h4>
                    <p className="text-slate-400 text-xs group-hover:text-primary-100 line-clamp-1">{t.description}</p>
                  </Link>
                ))}
                {relatedTools.length === 0 && (
                  <p className="text-slate-500 text-sm italic">Stay tuned for more tools!</p>
                )}
              </div>
              <Link href="/categories" className="mt-8 flex items-center gap-2 text-primary-400 font-bold text-sm group">
                Browse all tools <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="sticky top-32">
              <AdPlaceholder type="sidebar" />
            </div>
          </div>
        </div>
      </div>

      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://takethetools.com",
              "@type": "SoftwareApplication",
              "name": tool.name,
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "Any",
              "description": tool.description,
              "browserRequirements": "Requires JavaScript",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            },
            {
              "@context": "https://takethetools.com",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://takethetools.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Tools",
                  "item": "https://takethetools.com/categories"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": tool.name,
                  "item": `https://takethetools.com/tools/${toolSlug}`
                }
              ]
            },
            {
              "@context": "https://takethetools.com",
              "@type": "FAQPage",
              "mainEntity": tool.faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            }
          ])
        }}
      />
    </div>
  );
}
