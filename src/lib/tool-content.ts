import fs from "fs";
import path from "path";
import matter from "gray-matter";

const toolsContentDirectory = path.join(process.cwd(), "src/content/tools");

export function getToolAboutContent(slug: string) {
  const fullPath = path.join(toolsContentDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content } = matter(fileContents);
  return content;
}
