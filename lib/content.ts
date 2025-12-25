import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ChapterMeta {
  title: string;
  description: string;
  order: number;
  slug: string;
}

export interface ChapterContent extends ChapterMeta {
  content: string;
}

const contentDirectory = path.join(process.cwd(), "content");

/**
 * Get all chapters for a specific locale
 */
export function getChapters(locale: string = "en"): ChapterMeta[] {
  const localeDir = path.join(contentDirectory, locale);
  
  if (!fs.existsSync(localeDir)) {
    return [];
  }

  const files = fs.readdirSync(localeDir).filter((file) => file.endsWith(".mdx"));
  
  const chapters: ChapterMeta[] = files.map((file) => {
    const filePath = path.join(localeDir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);
    
    const slug = file.replace(/\.mdx$/, "");
    
    return {
      title: data.title || slug,
      description: data.description || "",
      order: data.order || 0,
      slug,
    };
  });
  
  return chapters.sort((a, b) => a.order - b.order);
}

/**
 * Get a single chapter by slug
 */
export function getChapterBySlug(slug: string, locale: string = "en"): ChapterContent | null {
  const filePath = path.join(contentDirectory, locale, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  
  return {
    title: data.title || slug,
    description: data.description || "",
    order: data.order || 0,
    slug,
    content,
  };
}

/**
 * Get all slugs for static generation (both locales)
 */
export function getAllSlugs(): string[] {
  const slugs = new Set<string>();
  const locales = ["en", "lo"];
  
  for (const locale of locales) {
    const localeDir = path.join(contentDirectory, locale);
    
    if (fs.existsSync(localeDir)) {
      const files = fs.readdirSync(localeDir).filter((file) => file.endsWith(".mdx"));
      files.forEach((file) => {
        slugs.add(file.replace(/\.mdx$/, ""));
      });
    }
  }
  
  return Array.from(slugs);
}

/**
 * Get next and previous chapters for navigation
 */
export function getChapterNavigation(
  currentSlug: string,
  locale: string = "en"
): { prev: ChapterMeta | null; next: ChapterMeta | null } {
  const chapters = getChapters(locale);
  const currentIndex = chapters.findIndex((ch) => ch.slug === currentSlug);
  
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }
  
  return {
    prev: currentIndex > 0 ? chapters[currentIndex - 1] : null,
    next: currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null,
  };
}
