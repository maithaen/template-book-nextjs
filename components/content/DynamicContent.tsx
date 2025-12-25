"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ContentPage } from "@/components/content/ContentPage";
import { TableOfContents } from "@/components/content/TableOfContents";
import { compile, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeShiki from "@shikijs/rehype";
import { getMDXComponents } from "@/mdx-components";
import type { Element } from "hast";

interface ChapterMeta {
  title: string;
  description: string;
  order: number;
  slug: string;
}

interface ChapterContent extends ChapterMeta {
  content: string;
}

interface ChapterData {
  chapter: ChapterContent;
  prev: ChapterMeta | null;
  next: ChapterMeta | null;
}

interface DynamicContentProps {
  slug: string;
  initialData: ChapterData;
}

const mdxComponents = getMDXComponents({});

export function DynamicContent({ slug, initialData }: DynamicContentProps) {
  const { language } = useLanguage();
  const [data, setData] = useState<ChapterData>(initialData);
  const [mdxContent, setMdxContent] = useState<React.ReactNode | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Memoize the compileMDX function
  const compileMDX = useCallback(async (content: string) => {
    const code = await compile(content, {
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
                const lang = (this as unknown as { options?: { lang?: string } }).options?.lang;
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
    
    return <MDXContent components={mdxComponents} />;
  }, []);

  // Initial render of MDX content
  useEffect(() => {
    compileMDX(initialData.chapter.content).then(setMdxContent);
  }, [initialData.chapter.content, compileMDX]);

  // Fetch content when language changes
  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/chapter/${slug}?locale=${language}`);
        if (response.ok) {
          const newData: ChapterData = await response.json();
          setData(newData);
          const compiled = await compileMDX(newData.chapter.content);
          setMdxContent(compiled);
        }
      } catch (error) {
        console.error("Failed to fetch chapter content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [language, slug, compileMDX]);

  // Loading state
  const loadingIndicator = useMemo(() => (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-muted rounded w-3/4"></div>
      <div className="h-4 bg-muted rounded w-1/2"></div>
      <div className="h-4 bg-muted rounded w-5/6"></div>
    </div>
  ), []);

  return (
    <div className="flex gap-8">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <ContentPage
          title={data.chapter.title}
          description={data.chapter.description}
          prevChapter={data.prev}
          nextChapter={data.next}
        >
          {isLoading ? loadingIndicator : mdxContent}
        </ContentPage>
      </div>
      
      {/* Table of Contents - Hidden on mobile */}
      <aside className="hidden xl:block w-64 flex-shrink-0">
        <TableOfContents content={data.chapter.content} />
      </aside>
    </div>
  );
}
