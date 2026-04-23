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
  if (lowercase.includes('image')) return { name: "Image Tools", slug: "image-tools" };
  if (lowercase.includes('pdf')) return { name: "PDF Tools", slug: "pdf-tools" };
  if (lowercase.includes('json') || lowercase.includes('formatter') || lowercase.includes('format') || lowercase.includes('developer') || lowercase.includes('curl') || lowercase.includes('regex') || lowercase.includes('binary') || lowercase.includes('hex') || lowercase.includes('base64')) return { name: "Developer Tools", slug: "developer-tools" };
  if (lowercase.includes('word') || lowercase.includes('text') || lowercase.includes('case')) return { name: "Text Tools", slug: "text-tools" };
  if (lowercase.includes('calculate') || lowercase.includes('math') || lowercase.includes('percentage') || lowercase.includes('bmi') || lowercase.includes('average') || lowercase.includes('convert-')) return { name: "Math & Calculators", slug: "math-calculators" };
  if (lowercase.includes('seo') || lowercase.includes('marketing') || lowercase.includes('link') || lowercase.includes('slug')) return { name: "Marketing & Social", slug: "marketing-tools" };
  if (lowercase.includes('password') || lowercase.includes('secure') || lowercase.includes('encrypt') || lowercase.includes('decrypt') || lowercase.includes('aes')) return { name: "Security & Privacy", slug: "security-privacy" };
  
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
