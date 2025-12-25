import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getChapterBySlug, getChapterNavigation, getAllSlugs } from "@/lib/content";
import { ContentPage } from "@/components/content/ContentPage";
import { TableOfContents } from "@/components/content/TableOfContents";
import { compile, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeShiki from "@shikijs/rehype";
import { getMDXComponents } from "@/mdx-components";
import type { Element } from "hast";

// Get custom MDX components at module level (using non-hook alias)
const mdxComponents = getMDXComponents({});

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
  
  // Compile MDX server-side with Shiki syntax highlighting
  const code = await compile(chapter.content, {
    outputFormat: "function-body",
    development: false,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeShiki, {
        theme: "github-dark",
        transformers: [
          {
            name: 'add-language-attr',
            // Add data-language attribute to pre element using Shiki's options
            pre(node: Element) {
              // Access the language from Shiki's options via 'this'
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const lang = (this as any).options?.lang;
              if (lang) {
                node.properties = node.properties || {};
                node.properties['data-language'] = lang;
              }
            }
          }
        ],
      }],
    ],
  });
  
  const { default: MDXContent } = await run(String(code), {
    ...runtime,
    baseUrl: import.meta.url,
  });
  
  return (
    <div className="flex gap-8">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <ContentPage
          title={chapter.title}
          description={chapter.description}
          prevChapter={prev}
          nextChapter={next}
        >
          <MDXContent components={mdxComponents} />
        </ContentPage>
      </div>
      
      {/* Table of Contents - Hidden on mobile */}
      <aside className="hidden xl:block w-64 flex-shrink-0">
        <TableOfContents content={chapter.content} />
      </aside>
    </div>
  );
}
