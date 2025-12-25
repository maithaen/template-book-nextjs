"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useMobileSidebar } from "@/lib/MobileSidebarContext";
import { ChevronRight, FileText } from "lucide-react";

interface Chapter {
  title: string;
  description: string;
  order: number;
  slug: string;
}

export function Sidebar() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const { language, t } = useLanguage();
  const { isOpen, close } = useMobileSidebar();
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    async function fetchChapters() {
      try {
        const res = await fetch(`/api/chapters?locale=${language}`);
        if (res.ok) {
          const data = await res.json();
          setChapters(data);
        }
      } catch (error) {
        console.error("Failed to fetch chapters:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchChapters();
  }, [language]);

  // Close sidebar on route change (mobile) - only when actually navigating
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      close();
      prevPathnameRef.current = pathname;
    }
  }, [pathname, close]);

  const isActive = (slug: string) => pathname === `/content/${slug}`;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={close}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 left-0 z-40 h-[calc(100vh-64px)] w-[272px] 
          border-r border-border bg-background
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full overflow-y-auto p-4">
          {/* Chapters Section */}
          <div className="mb-4">
            <h2 className="px-3 py-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              {t("chapters")}
            </h2>
          </div>

          {/* Chapter List */}
          <nav className="flex-1 space-y-1">
            {loading ? (
              // Loading skeleton
              <div className="space-y-2 px-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-10 rounded-lg bg-muted animate-pulse"
                  />
                ))}
              </div>
            ) : chapters.length > 0 ? (
              chapters.map((chapter) => (
                <Link
                  key={chapter.slug}
                  href={`/content/${chapter.slug}`}
                  className={`
                    group flex items-center gap-3 px-3 py-2.5 rounded-lg
                    text-sm transition-colors
                    ${
                      isActive(chapter.slug)
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-accent text-foreground/80 hover:text-foreground"
                    }
                  `}
                >
                  <FileText className={`h-4 w-4 flex-shrink-0 ${
                    isActive(chapter.slug) ? "text-primary" : "text-muted-foreground"
                  }`} />
                  <span className="flex-1 truncate">
                    {chapter.order}. {chapter.title}
                  </span>
                  <ChevronRight className={`h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity ${
                    isActive(chapter.slug) ? "opacity-100" : ""
                  }`} />
                </Link>
              ))
            ) : (
              <p className="px-3 text-sm text-muted-foreground">
                No chapters found
              </p>
            )}
          </nav>

          {/* Footer */}
          <div className="mt-auto pt-4 border-t border-border">
            <p className="px-3 text-xs text-muted-foreground">
              {t("footer")}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
