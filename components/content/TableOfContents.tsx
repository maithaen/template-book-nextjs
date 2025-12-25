"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Check } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const { t } = useLanguage();

  // Extract headings from content using useMemo instead of useEffect + setState
  const headings = useMemo(() => {
    const headingRegex = /^(#{2,4})\s+(.+)$/gm;
    const extracted: Heading[] = [];
    let match;
    
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      
      extracted.push({ id, text, level });
    }
    
    return extracted;
  }, [content]);

  // Scroll tracking
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveId(id);
            
            // Mark as read
            setReadIds((prev) => {
              const newSet = new Set(prev);
              const currentIndex = headings.findIndex((h) => h.id === id);
              for (let i = 0; i <= currentIndex; i++) {
                newSet.add(headings[i].id);
              }
              return newSet;
            });
          }
        });
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      }
    );

    // Observe all headings
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Header height
      const y = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="sticky top-20 max-h-[calc(100vh-100px)] overflow-y-auto">
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
        {t("onThisPage")}
      </h2>
      
      <ul className="space-y-2">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          const isRead = readIds.has(heading.id);
          
          return (
            <li
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
            >
              <button
                onClick={() => handleClick(heading.id)}
                className={`
                  group flex items-center gap-2 text-sm py-1 w-full text-left
                  transition-colors duration-200
                  ${isActive
                    ? "text-primary font-medium"
                    : isRead
                    ? "text-muted-foreground"
                    : "text-muted-foreground/70 hover:text-foreground"
                  }
                `}
              >
                {isRead && !isActive && (
                  <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                )}
                <span
                  className={`
                    ${isActive ? "border-l-2 border-primary pl-2 -ml-2" : ""}
                    ${!isRead && !isActive ? "ml-5" : ""}
                    truncate
                  `}
                >
                  {heading.text}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
