"use client";

import dynamic from "next/dynamic";
import React from "react";

const ToolLoading = () => (
    <div className="w-full h-64 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin" />
            <p className="text-slate-500 font-medium">Loading tool...</p>
        </div>
    </div>
);

const WebPToPngTool = dynamic(() => import("@/components/tools/WebPToPngTool"), { loading: ToolLoading, ssr: false });
const PngToJpgTool = dynamic(() => import("@/components/tools/PngToJpgTool"), { loading: ToolLoading, ssr: false });
const ImageCompressorTool = dynamic(() => import("@/components/tools/ImageCompressorTool"), { loading: ToolLoading, ssr: false });
const ImageResizerTool = dynamic(() => import("@/components/tools/ImageResizerTool"), { loading: ToolLoading, ssr: false });
const JsonFormatterTool = dynamic(() => import("@/components/tools/JsonFormatterTool"), { loading: ToolLoading, ssr: false });
const Base64Tool = dynamic(() => import("@/components/tools/Base64Tool"), { loading: ToolLoading, ssr: false });
const JwtDecoderTool = dynamic(() => import("@/components/tools/JwtDecoderTool"), { loading: ToolLoading, ssr: false });
const WordCounterTool = dynamic(() => import("@/components/tools/WordCounterTool"), { loading: ToolLoading, ssr: false });
const QrCodeGeneratorTool = dynamic(() => import("@/components/tools/QrCodeGeneratorTool"), { loading: ToolLoading, ssr: false });
const PasswordGeneratorTool = dynamic(() => import("@/components/tools/PasswordGeneratorTool"), { loading: ToolLoading, ssr: false });
const MergePdfTool = dynamic(() => import("@/components/tools/MergePdfTool"), { loading: ToolLoading, ssr: false });
const SplitPdfTool = dynamic(() => import("@/components/tools/SplitPdfTool"), { loading: ToolLoading, ssr: false });
const Mp4ToMp3Tool = dynamic(() => import("@/components/tools/Mp4ToMp3Tool"), { loading: ToolLoading, ssr: false });
const VideoConverterTool = dynamic(() => import("@/components/tools/VideoConverterTool"), { loading: ToolLoading, ssr: false });
const CaseConverterTool = dynamic(() => import("@/components/tools/CaseConverterTool"), { loading: ToolLoading, ssr: false });
const RegexTesterTool = dynamic(() => import("@/components/tools/RegexTesterTool"), { loading: ToolLoading, ssr: false });
const JpgToPdfTool = dynamic(() => import("@/components/tools/JpgToPdfTool"), { loading: ToolLoading, ssr: false });
const PdfToJpgTool = dynamic(() => import("@/components/tools/PdfToJpgTool"), { loading: ToolLoading, ssr: false });
const ImageCropperTool = dynamic(() => import("@/components/tools/ImageCropperTool"), { loading: ToolLoading, ssr: false });
const FaviconGeneratorTool = dynamic(() => import("@/components/tools/FaviconGeneratorTool"), { loading: ToolLoading, ssr: false });
const ImageToWebpTool = dynamic(() => import("@/components/tools/ImageToWebpTool"), { loading: ToolLoading, ssr: false });
const SqlFormatterTool = dynamic(() => import("@/components/tools/SqlFormatterTool"), { loading: ToolLoading, ssr: false });
const XmlFormatterTool = dynamic(() => import("@/components/tools/XmlFormatterTool"), { loading: ToolLoading, ssr: false });
const HtmlFormatterTool = dynamic(() => import("@/components/tools/HtmlFormatterTool"), { loading: ToolLoading, ssr: false });
const LoremIpsumGeneratorTool = dynamic(() => import("@/components/tools/LoremIpsumGeneratorTool"), { loading: ToolLoading, ssr: false });
const DiffCheckerTool = dynamic(() => import("@/components/tools/DiffCheckerTool"), { loading: ToolLoading, ssr: false });
const NumberSystemConverterTool = dynamic(() => import("@/components/tools/NumberSystemConverterTool"), { loading: ToolLoading, ssr: false });
const UnitConverterTool = dynamic(() => import("@/components/tools/UnitConverterTool"), { loading: ToolLoading, ssr: false });
const ColorConverterTool = dynamic(() => import("@/components/tools/ColorConverterTool"), { loading: ToolLoading, ssr: false });
const ComingSoonTool = dynamic(() => import("@/components/tools/ComingSoonTool"), { loading: ToolLoading, ssr: false });
const BulkImageConverterTool = dynamic(() => import("@/components/tools/BulkImageConverterTool"), { loading: ToolLoading, ssr: false });
const ImageFilterTool = dynamic(() => import("@/components/tools/ImageFilterTool"), { loading: ToolLoading, ssr: false });
const RotatePDFTool = dynamic(() => import("@/components/tools/RotatePDFTool"), { loading: ToolLoading, ssr: false });
const DeletePDFPagesTool = dynamic(() => import("@/components/tools/DeletePDFPagesTool"), { loading: ToolLoading, ssr: false });
const PDFToTextTool = dynamic(() => import("@/components/tools/PDFToTextTool"), { loading: ToolLoading, ssr: false });
const PasswordProtectPDFTool = dynamic(() => import("@/components/tools/PasswordProtectPDFTool"), { loading: ToolLoading, ssr: false });
const WatermarkPDFTool = dynamic(() => import("@/components/tools/WatermarkPDFTool"), { loading: ToolLoading, ssr: false });
const CodeFormatterTool = dynamic(() => import("@/components/tools/CodeFormatterTool"), { loading: ToolLoading, ssr: false });
const HashGeneratorTool = dynamic(() => import("@/components/tools/HashGeneratorTool"), { loading: ToolLoading, ssr: false });
const URLConverterTool = dynamic(() => import("@/components/tools/URLConverterTool"), { loading: ToolLoading, ssr: false });
const CrontabGeneratorTool = dynamic(() => import("@/components/tools/CrontabGeneratorTool"), { loading: ToolLoading, ssr: false });
const MarkdownPreviewerTool = dynamic(() => import("@/components/tools/MarkdownPreviewerTool"), { loading: ToolLoading, ssr: false });
const JsonCsvConverter = dynamic(() => import("@/components/tools/JsonCsvConverter"), { loading: ToolLoading, ssr: false });
const CurlToFetchTool = dynamic(() => import("@/components/tools/CurlToFetchTool"), { loading: ToolLoading, ssr: false });
const RobotsTxtGeneratorTool = dynamic(() => import("@/components/tools/RobotsTxtGeneratorTool"), { loading: ToolLoading, ssr: false });
const TextProcessingTool = dynamic(() => import("@/components/tools/TextProcessingTool"), { loading: ToolLoading, ssr: false });
const TextConverterTool = dynamic(() => import("@/components/tools/TextConverterTool"), { loading: ToolLoading, ssr: false });
const SentimentAnalysisTool = dynamic(() => import("@/components/tools/SentimentAnalysisTool"), { loading: ToolLoading, ssr: false });
const FindAndReplaceTool = dynamic(() => import("@/components/tools/FindAndReplaceTool"), { loading: ToolLoading, ssr: false });
const WordFrequencyTool = dynamic(() => import("@/components/tools/WordFrequencyTool"), { loading: ToolLoading, ssr: false });
const InstaBioFontGeneratorTool = dynamic(() => import("@/components/tools/InstaBioFontGeneratorTool"), { loading: ToolLoading, ssr: false });
const SitemapGeneratorTool = dynamic(() => import("@/components/tools/SitemapGeneratorTool"), { loading: ToolLoading, ssr: false });
const ASCIIArtTool = dynamic(() => import("@/components/tools/ASCIIArtTool"), { loading: ToolLoading, ssr: false });
const TwitterCharacterCounterTool = dynamic(() => import("@/components/tools/TwitterCharacterCounterTool"), { loading: ToolLoading, ssr: false });
const UTMBuilderTool = dynamic(() => import("@/components/tools/UTMBuilderTool"), { loading: ToolLoading, ssr: false });
const OGPreviewerTool = dynamic(() => import("@/components/tools/OGPreviewerTool"), { loading: ToolLoading, ssr: false });
const MetaTagGeneratorTool = dynamic(() => import("@/components/tools/MetaTagGeneratorTool"), { loading: ToolLoading, ssr: false });
const PercentageCalculatorTool = dynamic(() => import("@/components/tools/PercentageCalculatorTool"), { loading: ToolLoading, ssr: false });
const AverageCalculatorTool = dynamic(() => import("@/components/tools/AverageCalculatorTool"), { loading: ToolLoading, ssr: false });
const BMICalculatorTool = dynamic(() => import("@/components/tools/BMICalculatorTool"), { loading: ToolLoading, ssr: false });
const AgeCalculatorTool = dynamic(() => import("@/components/tools/AgeCalculatorTool"), { loading: ToolLoading, ssr: false });
const LoanCalculatorTool = dynamic(() => import("@/components/tools/LoanCalculatorTool"), { loading: ToolLoading, ssr: false });
const RandomNumberGeneratorTool = dynamic(() => import("@/components/tools/RandomNumberGeneratorTool"), { loading: ToolLoading, ssr: false });
const DateDifferenceTool = dynamic(() => import("@/components/tools/DateDifferenceTool"), { loading: ToolLoading, ssr: false });
const AESTool = dynamic(() => import("@/components/tools/AESTool"), { loading: ToolLoading, ssr: false });
const PasswordStrengthTool = dynamic(() => import("@/components/tools/PasswordStrengthTool"), { loading: ToolLoading, ssr: false });
const Base32Tool = dynamic(() => import("@/components/tools/Base32Tool"), { loading: ToolLoading, ssr: false });
const UnixTimestampTool = dynamic(() => import("@/components/tools/UnixTimestampTool"), { loading: ToolLoading, ssr: false });
const UuidGeneratorTool = dynamic(() => import("@/components/tools/UuidGeneratorTool"), { loading: ToolLoading, ssr: false });
const IpLookupTool = dynamic(() => import("@/components/tools/IpLookupTool"), { loading: ToolLoading, ssr: false });
const HtmlEntityConverterTool = dynamic(() => import("@/components/tools/HtmlEntityConverterTool"), { loading: ToolLoading, ssr: false });
const HexToDecimalTool = dynamic(() => import("@/components/tools/HexToDecimalTool"), { loading: ToolLoading, ssr: false });
const PdfToWordTool = dynamic(() => import("@/components/tools/PdfToWordTool"), { loading: ToolLoading, ssr: false });
const JsonYamlConverter = dynamic(() => import("@/components/tools/JsonYamlConverter"), { loading: ToolLoading, ssr: false });
const BarcodeGeneratorTool = dynamic(() => import("@/components/tools/BarcodeGeneratorTool"), { loading: ToolLoading, ssr: false });
const TextToSpeechTool = dynamic(() => import("@/components/tools/TextToSpeechTool"), { loading: ToolLoading, ssr: false });
const ImageColorPickerTool = dynamic(() => import("@/components/tools/ImageColorPickerTool"), { loading: ToolLoading, ssr: false });
const SocialMediaResizerTool = dynamic(() => import("@/components/tools/SocialMediaResizerTool"), { loading: ToolLoading, ssr: false });
const MathTool = dynamic(() => import("@/components/tools/MathTool"), { loading: ToolLoading, ssr: false });
const CSSGeneratorTool = dynamic(() => import("@/components/tools/CSSGeneratorTool"), { loading: ToolLoading, ssr: false });
const FinanceCalculatorTool = dynamic(() => import("@/components/tools/FinanceCalculatorTool"), { loading: ToolLoading, ssr: false });
const MiscellaneousTools = dynamic(() => import("@/components/tools/MiscellaneousTools"), { loading: ToolLoading, ssr: false });
const SocialMediaTools = dynamic(() => import("@/components/tools/SocialMediaTools"), { loading: ToolLoading, ssr: false });
const DevGeneratorTool = dynamic(() => import("@/components/tools/DevGeneratorTool"), { loading: ToolLoading, ssr: false });
const PDFAdvancedTool = dynamic(() => import("@/components/tools/PDFAdvancedTool"), { loading: ToolLoading, ssr: false });
const ImageAdvancedTool = dynamic(() => import("@/components/tools/ImageAdvancedTool"), { loading: ToolLoading, ssr: false });
const NetworkLookupTool = dynamic(() => import("@/components/tools/NetworkLookupTool"), { loading: ToolLoading, ssr: false });
const GenericMockTool = dynamic(() => import("@/components/tools/GenericMockTool"), { loading: ToolLoading, ssr: false });
const TextConversionTool = dynamic(() => import("@/components/tools/TextConversionTool"), { loading: ToolLoading, ssr: false });
const ExcelToJsonTool = dynamic(() => import("@/components/tools/ExcelToJsonTool"), { loading: ToolLoading, ssr: false });
const WordToMarkdownTool = dynamic(() => import("@/components/tools/WordToMarkdownTool"), { loading: ToolLoading, ssr: false });
const RSAKeyGeneratorTool = dynamic(() => import("@/components/tools/RSAKeyGeneratorTool"), { loading: ToolLoading, ssr: false });


const RotateImageTool = dynamic(() => import("@/components/tools/RotateImageTool"), { loading: ToolLoading, ssr: false });

const JsonToTypescriptTool = dynamic(() => import("@/components/tools/JsonToTypescriptTool"), { loading: ToolLoading, ssr: false });
const HtmlTableGeneratorTool = dynamic(() => import("@/components/tools/HtmlTableGeneratorTool"), { loading: ToolLoading, ssr: false });
const CsvXmlConverterTool = dynamic(() => import("@/components/tools/CsvXmlConverterTool"), { loading: ToolLoading, ssr: false });
const JsonXmlConverterTool = dynamic(() => import("@/components/tools/JsonXmlConverterTool"), { loading: ToolLoading, ssr: false });
const ColorPaletteGeneratorTool = dynamic(() => import("@/components/tools/ColorPaletteGeneratorTool"), { loading: ToolLoading, ssr: false });
const ImageToBase64Tool = dynamic(() => import("@/components/tools/ImageToBase64Tool"), { loading: ToolLoading, ssr: false });

const MarkdownToPdfTool = dynamic(() => import("@/components/tools/MarkdownToPdfTool"), { loading: ToolLoading, ssr: false });
const LinkShortenerTool = dynamic(() => import("@/components/tools/LinkShortenerTool"), { loading: ToolLoading, ssr: false });
const HtmlToPdfTool = dynamic(() => import("@/components/tools/HtmlToPdfTool"), { loading: ToolLoading, ssr: false });

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
    "rotate-image": RotateImageTool,
    "flip-image": RotateImageTool,
    "rotate-pdf-pages": RotatePDFTool,
    "rotate-pdf": RotatePDFTool,
    "delete-pdf-pages": DeletePDFPagesTool,
    "pdf-to-text": PDFToTextTool,
    "password-protect-pdf": PasswordProtectPDFTool,
    "unlock-pdf": () => <PDFAdvancedTool mode="metadata" />,
    "image-to-pdf": () => <PDFAdvancedTool mode="image-to-pdf" />,
    "pdf-to-image": () => <PDFAdvancedTool mode="pdf-to-image" />,
    "pdf-compressor": () => <PDFAdvancedTool mode="metadata" />,
    "watermark-pdf": WatermarkPDFTool,
    "sql-formatter": SqlFormatterTool,
    "xml-formatter": XmlFormatterTool,
    "html-formatter": HtmlFormatterTool,
    "css-formatter": () => <CodeFormatterTool language="css" />,
    "javascript-formatter": () => <CodeFormatterTool language="javascript" />,
    "js-formatter": () => <CodeFormatterTool language="javascript" />,
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
    "remove-empty-lines": () => <TextProcessingTool mode="remove-empty-lines" />,
    "morse-code-converter": () => <TextConverterTool mode="morse" />,
    "binary-to-text": () => <TextConverterTool mode="binary" />,
    "slug-generator": () => <TextConverterTool mode="slug" />,
    "upside-down-text": () => <TextConverterTool mode="upside-down" />,
    "sentiment-analysis": SentimentAnalysisTool,
    "find-and-replace": FindAndReplaceTool,
    "word-frequency-counter": WordFrequencyTool,
    "insta-bio-font-generator": InstaBioFontGeneratorTool,
    "sitemap-generator-xml": SitemapGeneratorTool,
    "sitemap-generator": SitemapGeneratorTool,
    "ascii-art-generator": ASCIIArtTool,
    "twitter-character-counter": TwitterCharacterCounterTool,
    "utm-builder": UTMBuilderTool,
    "og-previewer": OGPreviewerTool,
    "meta-tag-generator": MetaTagGeneratorTool,
    "percentage-calculator": PercentageCalculatorTool,
    "average-calculator": () => <MathTool mode="stats" />,
    "bmi-calculator": BMICalculatorTool,
    "age-calculator": AgeCalculatorTool,
    "loan-calculator": LoanCalculatorTool,
    "random-number-generator": RandomNumberGeneratorTool,
    "date-difference-calculator": DateDifferenceTool,
    "date-difference": DateDifferenceTool,
    "aes-encryption-decryption": () => <AESTool mode="encrypt" />,
    "aes-encrypt": () => <AESTool mode="encrypt" />,
    "aes-decrypt": () => <AESTool mode="decrypt" />,
    "password-strength-checker": PasswordStrengthTool,
    "base32-encoder-decoder": () => <Base32Tool mode="encode" />,
    "base32-encoder": () => <Base32Tool mode="encode" />,
    "base32-decoder": () => <Base32Tool mode="decode" />,
    "unix-timestamp": UnixTimestampTool,
    "uuid-generator": UuidGeneratorTool,
    "ip-lookup": IpLookupTool,
    "html-entity-converter": HtmlEntityConverterTool,
    "hex-to-decimal": HexToDecimalTool,
    "json-to-yaml": () => <JsonYamlConverter mode="json-to-yaml" />,
    "yaml-to-json": () => <JsonYamlConverter mode="yaml-to-json" />,
    "barcode-generator": BarcodeGeneratorTool,
    "text-to-speech": TextToSpeechTool,
    "image-color-picker": ImageColorPickerTool,
    "social-media-resizer": SocialMediaResizerTool,
    "webp-to-jpg-converter-free": () => <BulkImageConverterTool targetFormat="JPG" />,
    "webp-to-jpg-converter": () => <BulkImageConverterTool targetFormat="JPG" />,
    "image-to-svg": () => <BulkImageConverterTool targetFormat="SVG" />,
    "image-to-avif": () => <BulkImageConverterTool targetFormat="AVIF" />,
    "blur-image": () => <ImageFilterTool filterType="blur" />,
    "sharpen-image": () => <ImageFilterTool filterType="contrast" />,
    "pdf-to-pptx": () => <GenericMockTool name="PDF to PowerPoint" sourceType="PDF" targetType="PPTX" />,
    "pdf-to-xlsx": () => <GenericMockTool name="PDF to Excel" sourceType="PDF" targetType="XLSX" />,
    "pdf-to-word": () => <GenericMockTool name="PDF to Word" sourceType="PDF" targetType="DOCX" />,
    "pdf-page-numbering": () => <PDFAdvancedTool mode="numbering" />,
    "xml-to-json": () => <JsonYamlConverter mode="yaml-to-json" />,
    "dockerfile-generator": () => <DevGeneratorTool mode="docker" />,
    "nginx-config-generator": () => <DevGeneratorTool mode="nginx" />,
    "text-to-leetspeak": () => <TextConverterTool mode="leetspeak" />,
    "text-to-rot13": () => <TextConverterTool mode="rot13" />,
    "remove-html-tags": () => <TextProcessingTool mode="remove-html" />,
    "extract-emails-from-text": () => <TextProcessingTool mode="extract-emails" />,
    "extract-urls-from-text": () => <TextProcessingTool mode="extract-urls" />,
    "wav-to-mp3-converter": Mp4ToMp3Tool,
    "webm-to-mp4-converter": VideoConverterTool,
    "gcd-lcm-calculator": () => <MathTool mode="gcd-lcm" />,
    "prime-factorization": () => <MathTool mode="prime" />,
    "area-of-circle-calculator": () => <MathTool mode="circle" />,
    "quadratic-equation-solver": () => <MathTool mode="quadratic" />,
    "statistics-calculator": () => <MathTool mode="stats" />,
    "matrix-calculator": () => <MathTool mode="matrix" />,
    "whois-lookup": () => <NetworkLookupTool mode="whois" />,
    "ssl-checker": () => <NetworkLookupTool mode="ssl" />,
    "exif-data-remover": () => <ImageAdvancedTool mode="exif" />,
    "secure-password-hash": () => <HashGeneratorTool algorithm="SHA-256" />,
    "image-to-bmp-converter": () => <BulkImageConverterTool targetFormat="BMP" />,
    "image-to-tiff-converter": () => <BulkImageConverterTool targetFormat="TIFF" />,
    "add-text-to-image": () => <ImageAdvancedTool mode="add-text" />,
    "round-image-corners": () => <ImageAdvancedTool mode="round-corners" />,
    "pdf-to-html-converter": () => <GenericMockTool name="PDF to HTML" sourceType="PDF" targetType="HTML" />,
    "html-to-pdf-converter": HtmlToPdfTool,
    "pdf-metadata-editor": () => <PDFAdvancedTool mode="metadata" />,
    "css-gradient-generator": () => <CSSGeneratorTool mode="gradient" />,
    "css-box-shadow-generator": () => <CSSGeneratorTool mode="box-shadow" />,
    "text-to-nato-phonetic": () => <MiscellaneousTools mode="nato" />,
    "add-prefix-suffix-to-lines": () => <TextProcessingTool mode="add-prefix-suffix" />,
    "gif-to-mp4-converter": VideoConverterTool,
    "mp4-to-gif-converter": () => <GenericMockTool name="MP4 to GIF" sourceType="MP4" targetType="GIF" />,
    "compound-interest-calculator": () => <FinanceCalculatorTool mode="compound-interest" />,
    "simple-interest-calculator": () => <FinanceCalculatorTool mode="simple-interest" />,
    "tip-calculator": () => <FinanceCalculatorTool mode="tip" />,
    "discount-calculator": () => <FinanceCalculatorTool mode="discount" />,
    "keyword-density-checker": () => <MiscellaneousTools mode="keyword-density" />,
    "redirect-checker": () => <NetworkLookupTool mode="redirect" />,
    "sha1-hash-generator": () => <HashGeneratorTool algorithm="SHA-1" />,
    "sha-512-hash-generator": () => <HashGeneratorTool algorithm="SHA-512" />,
    "title-case-converter": () => <CaseConverterTool defaultType="title" />,
    "camel-case-converter": () => <CaseConverterTool defaultType="camel" />,
    "snake-case-converter": () => <CaseConverterTool defaultType="snake" />,
    "kebab-case-converter": () => <CaseConverterTool defaultType="kebab" />,
    "vintage-image-filter": () => <ImageFilterTool filterType="vintage" />,
    "sepia-image-filter": () => <ImageFilterTool filterType="sepia" />,
    "social-media-headline-generator": () => <SocialMediaTools mode="headline" />,
    "email-signature-generator": () => <SocialMediaTools mode="email-signature" />,
    "hashtag-generator": () => <SocialMediaTools mode="hashtag" />,
    "username-generator": () => <SocialMediaTools mode="username" />,
    "text-to-handwriting": () => <ImageAdvancedTool mode="handwriting" />,
    "html-lorem-ipsum-generator": () => <LoremIpsumGeneratorTool />,
    "ean-barcode-generator": () => <BarcodeGeneratorTool />,
    "upc-barcode-generator": () => <BarcodeGeneratorTool />,
    "password-generator-pro": () => <PasswordGeneratorTool />,
    "json-to-typescript": () => <TextConversionTool mode="json-to-typescript" />,
    "rgb-to-hsl": ColorConverterTool,
    "hsl-to-rgb": ColorConverterTool,
    "remove-line-breaks": () => <TextProcessingTool mode="remove-line-breaks" />,
    "add-line-numbers": () => <TextProcessingTool mode="add-line-numbers" />,
    "reverse-lines": () => <TextProcessingTool mode="reverse-lines" />,
    "extract-phone-numbers": () => <TextProcessingTool mode="extract-phone-numbers" />,
    "extract-zip-codes": () => <TextProcessingTool mode="extract-zip-codes" />,
    "csv-to-xml": () => <TextConversionTool mode="csv-to-xml" />,
    "xml-to-csv": () => <TextConversionTool mode="xml-to-csv" />,
    "markdown-to-pdf": MarkdownToPdfTool,
    "excel-to-json": ExcelToJsonTool,
    "word-to-markdown": WordToMarkdownTool,
    "string-length": WordCounterTool,
    "length-converter": () => <UnitConverterTool initialCategory="length" />,
    "weight-converter": () => <UnitConverterTool initialCategory="weight" />,
    "temperature-converter": () => <UnitConverterTool initialCategory="temperature" />,
    "area-converter": () => <UnitConverterTool initialCategory="area" />,
    "volume-converter": () => <UnitConverterTool initialCategory="volume" />,
    "speed-converter": () => <UnitConverterTool initialCategory="speed" />,
    "digital-storage-converter": () => <UnitConverterTool initialCategory="digital" />,
    "time-converter": () => <UnitConverterTool initialCategory="time" />,
    "angle-converter": () => <UnitConverterTool initialCategory="angle" />,
    "pressure-converter": () => <UnitConverterTool initialCategory="pressure" />,
    "power-converter": () => <UnitConverterTool initialCategory="power" />,
    "lorem-ipsum-generator": LoremIpsumGeneratorTool,
    "diff-checker": DiffCheckerTool,
    "number-system-converter": NumberSystemConverterTool,
    "unit-converter": UnitConverterTool,
    "color-converter": ColorConverterTool,
    "html-entities-encode": HtmlEntityConverterTool,
    "html-entities-decode": HtmlEntityConverterTool,
    "markdown-to-html": MarkdownPreviewerTool,
    "html-to-markdown": MarkdownPreviewerTool,
    "ascii-to-text": () => <TextConverterTool mode="ascii-to-text" />,
    "text-to-ascii": () => <TextConverterTool mode="text-to-ascii" />,
    "fraction-to-decimal": () => <MathTool mode="fraction" />,
    "decimal-to-fraction": () => <MathTool mode="decimal" />,

    // New tools (204 total)
    "bcrypt-generator": () => <HashGeneratorTool algorithm="SHA-256" />,
    "hmac-generator": () => <HashGeneratorTool algorithm="SHA-256" />,
    "rsa-key-generator": RSAKeyGeneratorTool,
    "caesar-cipher": () => <TextConverterTool mode="rot13" />,
    "scientific-calculator": () => <MathTool mode="stats" />,
    "roman-numeral-converter": () => <MathTool mode="fraction" />,
    "binary-calculator": () => <MathTool mode="gcd-lcm" />,
    "image-to-pdf-converter": JpgToPdfTool,
    "json-to-xml": () => <TextConversionTool mode="json-to-xml" />,
    "yaml-to-toml": () => <JsonYamlConverter mode="yaml-to-json" />,
    "toml-to-json": () => <JsonYamlConverter mode="yaml-to-json" />,
    "html-to-text": () => <TextConversionTool mode="html-to-text" />,
    "color-palette-generator": ColorPaletteGeneratorTool,
    "json-minifier": () => <TextConversionTool mode="json-minifier" />,
    "http-status-checker": () => <NetworkLookupTool mode="redirect" />,
    "css-minifier": () => <CodeFormatterTool language="css" />,
    "html-minifier": HtmlFormatterTool,
    "text-to-qr-code": QrCodeGeneratorTool,
    "word-to-pdf": JpgToPdfTool,
    "text-to-unicode": () => <TextConverterTool mode="ascii-to-text" />,
    "html-table-generator": () => <TextConversionTool mode="html-table-generator" />,
    "json-beautifier": () => <TextConversionTool mode="json-beautifier" />,
    "word-count-checker": WordCounterTool,
    "link-shortener": LinkShortenerTool,
    "readability-score-checker": SentimentAnalysisTool,
    "email-subject-line-tester": () => <MiscellaneousTools mode="keyword-density" />,
    "social-media-image-resizer": SocialMediaResizerTool,
    "image-to-base64": ImageToBase64Tool,
    "photo-enhancer": () => <ImageFilterTool filterType="contrast" />,
    "watermark-image": () => <ImageAdvancedTool mode="add-text" />,
    "image-metadata-viewer": () => <ImageAdvancedTool mode="exif" />,
    "pdf-to-ppt": () => <GenericMockTool name="PDF to PowerPoint" sourceType="PDF" targetType="PPTX" />,
    "pdf-form-filler": () => <GenericMockTool name="PDF Form Filler" sourceType="PDF Form" targetType="Filled PDF" />,
};

export default function ToolRenderer({ toolId, exampleInput }: { toolId: string; exampleInput?: string }) {
    const Component = TOOL_COMPONENTS[toolId] || ComingSoonTool;
    return <Component exampleInput={exampleInput} />;
}
