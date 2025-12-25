"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/button";

interface ChapterMeta {
  title: string;
  description: string;
  order: number;
  slug: string;
}

interface ContentPageProps {
  title: string;
  description: string;
  children: React.ReactNode;
  prevChapter?: ChapterMeta | null;
  nextChapter?: ChapterMeta | null;
}

export function ContentPage({
  title,
  description,
  children,
  prevChapter,
  nextChapter,
}: ContentPageProps) {
  const { t } = useLanguage();

  return (
    <article className="max-w-3xl mx-auto">
      {/* Header */}
      <header className="mb-8 pb-6 border-b border-border">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-green-500 to-teal-400 bg-clip-text text-transparent">
          {title}
        </h1>
        {description && (
          <p className="text-lg text-muted-foreground">{description}</p>
        )}
      </header>

      {/* Content */}
      <div className="mdx-content">{children}</div>

      {/* Navigation */}
      <nav className="mt-12 pt-6 border-t border-border">
        <div className="flex items-center justify-between gap-4">
          {/* Previous Chapter */}
          {prevChapter ? (
            <Link href={`/content/${prevChapter.slug}`} className="flex-1">
              <Button variant="outline" className="w-full justify-start gap-2 h-auto py-3 px-4">
                <ChevronLeft className="h-4 w-4 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">
                    {t("previousChapter")}
                  </div>
                  <div className="text-sm font-medium truncate">
                    {prevChapter.title}
                  </div>
                </div>
              </Button>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {/* Next Chapter */}
          {nextChapter ? (
            <Link href={`/content/${nextChapter.slug}`} className="flex-1">
              <Button variant="outline" className="w-full justify-end gap-2 h-auto py-3 px-4">
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">
                    {t("nextChapter")}
                  </div>
                  <div className="text-sm font-medium truncate">
                    {nextChapter.title}
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
              </Button>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </nav>
    </article>
  );
}
