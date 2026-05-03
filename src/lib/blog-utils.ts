import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIRECTORY = path.join(process.cwd(), 'src/content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  publishDate: string;
  isPublished: boolean;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  featuredImage?: string;
  toolSlug?: string;
  toolName?: string;
  category: {
    name: string;
    slug: string;
  };
}

// Map filenames to readable categories based on common prefixes or manual mapping
const categoryMapping: Record<string, string> = {
  "image": "Image Tools",
  "pdf": "PDF Tools",
  "developer": "Developer Tools",
  "text": "Text Tools",
  "security": "Security & Privacy",
  "math": "Math & Calculators",
  "marketing": "Marketing & Social",
};

function getCategoryFromFilename(filename: string) {
  const lowercase = filename.toLowerCase();
<<<<<<< HEAD

  // Image tools — check before converter to avoid conflicts
  if (
    lowercase.includes('image') ||
    lowercase.includes('jpg') || lowercase.includes('jpeg') ||
    lowercase.includes('png') || lowercase.includes('webp') ||
    lowercase.includes('svg') || lowercase.includes('ico') ||
    lowercase.includes('gif') || lowercase.includes('bmp') ||
    lowercase.includes('tiff') || lowercase.includes('tif') ||
    lowercase.includes('heic') || lowercase.includes('avif') ||
    lowercase.includes('blur') || lowercase.includes('crop') ||
    lowercase.includes('resize') || lowercase.includes('watermark') ||
    lowercase.includes('compress') || lowercase.includes('filter') ||
    lowercase.includes('color-pick') || lowercase.includes('favicon')
  ) return { name: "Image Tools", slug: "image-tools" };

  // PDF tools
  if (lowercase.includes('pdf')) return { name: "PDF Tools", slug: "pdf-tools" };

  // Security tools
  if (
    lowercase.includes('password') || lowercase.includes('encrypt') ||
    lowercase.includes('decrypt') || lowercase.includes('aes') ||
    lowercase.includes('bcrypt') || lowercase.includes('hash') ||
    lowercase.includes('sha') || lowercase.includes('md5')
  ) return { name: "Security & Privacy", slug: "security-privacy" };

  // Marketing tools
  if (
    lowercase.includes('seo') || lowercase.includes('meta-tag') ||
    lowercase.includes('utm') || lowercase.includes('slug') ||
    lowercase.includes('og-tag') || lowercase.includes('hashtag') ||
    lowercase.includes('robots') || lowercase.includes('sitemap') ||
    lowercase.includes('qr-code') || lowercase.includes('barcode')
  ) return { name: "Marketing & Social", slug: "marketing-tools" };

  // Developer tools
  if (
    lowercase.includes('json') || lowercase.includes('formatter') ||
    lowercase.includes('developer') || lowercase.includes('curl') ||
    lowercase.includes('regex') || lowercase.includes('binary') ||
    lowercase.includes('hex') || lowercase.includes('base64') ||
    lowercase.includes('base32') || lowercase.includes('xml') ||
    lowercase.includes('yaml') || lowercase.includes('toml') ||
    lowercase.includes('csv') || lowercase.includes('html-format') ||
    lowercase.includes('css-format') || lowercase.includes('js-format') ||
    lowercase.includes('sql') || lowercase.includes('jwt') ||
    lowercase.includes('minify') || lowercase.includes('crontab') ||
    lowercase.includes('uuid') || lowercase.includes('timestamp') ||
    lowercase.includes('ip-lookup') || lowercase.includes('url-encode') ||
    lowercase.includes('url-decode') || lowercase.includes('html-entity') ||
    lowercase.includes('markdown') || lowercase.includes('diff')
  ) return { name: "Developer Tools", slug: "developer-tools" };

  // Text tools
  if (
    lowercase.includes('word') || lowercase.includes('text') ||
    lowercase.includes('case') || lowercase.includes('lorem') ||
    lowercase.includes('palindrome') || lowercase.includes('reverse') ||
    lowercase.includes('line-number') || lowercase.includes('prefix') ||
    lowercase.includes('suffix') || lowercase.includes('find-replace') ||
    lowercase.includes('whitespace') || lowercase.includes('duplicate') ||
    lowercase.includes('speech') || lowercase.includes('fancy') ||
    lowercase.includes('fliptext') || lowercase.includes('nato')
  ) return { name: "Text Tools", slug: "text-tools" };

  // Math & Calculators — only actual math/calculation topics
  if (
    lowercase.includes('calculat') || lowercase.includes('converter') ||
    lowercase.includes('bmi') || lowercase.includes('average') ||
    lowercase.includes('percentage') || lowercase.includes('loan') ||
    lowercase.includes('tip') || lowercase.includes('gcd') ||
    lowercase.includes('prime') || lowercase.includes('area-of') ||
    lowercase.includes('unit') || lowercase.includes('temperature') ||
    lowercase.includes('length') || lowercase.includes('weight') ||
    lowercase.includes('volume') || lowercase.includes('speed') ||
    lowercase.includes('pressure') || lowercase.includes('energy') ||
    lowercase.includes('currency') || lowercase.includes('time-zone') ||
    lowercase.includes('age-') || lowercase.includes('date-diff') ||
    lowercase.includes('scientific')
  ) return { name: "Math & Calculators", slug: "math-calculators" };

=======
  if (lowercase.includes('image')) return { name: "Image Tools", slug: "image-tools" };
  if (lowercase.includes('pdf')) return { name: "PDF Tools", slug: "pdf-tools" };
  if (lowercase.includes('json') || lowercase.includes('formatter') || lowercase.includes('format') || lowercase.includes('developer') || lowercase.includes('curl') || lowercase.includes('regex') || lowercase.includes('binary') || lowercase.includes('hex') || lowercase.includes('base64')) return { name: "Developer Tools", slug: "developer-tools" };
  if (lowercase.includes('word') || lowercase.includes('text') || lowercase.includes('case')) return { name: "Text Tools", slug: "text-tools" };
  if (lowercase.includes('calculate') || lowercase.includes('math') || lowercase.includes('percentage') || lowercase.includes('bmi') || lowercase.includes('average') || lowercase.includes('convert-')) return { name: "Math & Calculators", slug: "math-calculators" };
  if (lowercase.includes('seo') || lowercase.includes('marketing') || lowercase.includes('link') || lowercase.includes('slug')) return { name: "Marketing & Social", slug: "marketing-tools" };
  if (lowercase.includes('password') || lowercase.includes('secure') || lowercase.includes('encrypt') || lowercase.includes('decrypt') || lowercase.includes('aes')) return { name: "Security & Privacy", slug: "security-privacy" };
  
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
  return { name: "General Tools", slug: "general-tools" };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(BLOG_DIRECTORY)) return [];

  const filenames = fs.readdirSync(BLOG_DIRECTORY);
  
  const posts = filenames
    .filter(fn => fn.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(BLOG_DIRECTORY, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      const slug = filename.replace(/\.md$/, '');
      
      const category = getCategoryFromFilename(filename);

      return {
        slug,
        title: data.title || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        publishDate: data.date || data.publishDate || new Date().toISOString(),
        isPublished: true,
        content,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        featuredImage: data.featuredImage,
        toolSlug: data.toolSlug,
        toolName: data.toolName,
        category,
      };
    });

  return posts.sort((a, b) => (new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIRECTORY, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const category = getCategoryFromFilename(slug);

  return {
    slug,
    title: data.title || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    publishDate: data.date || data.publishDate || new Date().toISOString(),
    isPublished: true,
    content,
    metaTitle: data.metaTitle,
    metaDescription: data.metaDescription,
    featuredImage: data.featuredImage,
    toolSlug: data.toolSlug,
    toolName: data.toolName,
    category,
  };
}
