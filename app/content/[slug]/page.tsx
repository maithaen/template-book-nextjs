import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getChapterBySlug, getChapterNavigation, getAllSlugs } from "@/lib/content";
import { DynamicContent } from "@/components/content/DynamicContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const locale = cookieStore.get("language")?.value || "en";
  
  const chapter = getChapterBySlug(slug, locale);
  
  if (!chapter) {
    return { title: "Chapter Not Found" };
  }
  
  return {
    title: chapter.title,
    description: chapter.description,
  };
}

export default async function ChapterPage({ params }: PageProps) {
  const { slug } = await params;
  // Default to English for SSR, client will handle language switching
  const locale = "en";
  
  const chapter = getChapterBySlug(slug, locale);
  
  if (!chapter) {
    notFound();
  }
  
  const { prev, next } = getChapterNavigation(slug, locale);

  return (
    <DynamicContent
      slug={slug}
      initialData={{
        chapter,
        prev,
        next,
      }}
    />
  );
}
