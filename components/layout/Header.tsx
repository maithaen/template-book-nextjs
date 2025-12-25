"use client";

import { useTheme } from "next-themes";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useMobileSidebar } from "@/lib/MobileSidebarContext";
import { Sun, Moon, Menu, X, Github, Search, Book } from "lucide-react";
import Link from "next/link";
import { useSyncExternalStore } from "react";

// Simple subscription for hydration detection
const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function Header() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { isOpen, toggle } = useMobileSidebar();
  
  // Using useSyncExternalStore to detect hydration without triggering lint error
  const mounted = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "lo" : "en");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        {/* Left Section: Mobile Menu + Logo */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            onClick={toggle}
            className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label={isOpen ? t("closeMenu") : t("openMenu")}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
            <Book className="h-6 w-6 text-primary" />
            <span className="hidden sm:inline bg-gradient-to-r from-green-500 to-teal-400 bg-clip-text text-transparent">
              BookTemplate
            </span>
          </Link>
        </div>

        {/* Center Section: Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              className="w-full h-10 pl-10 pr-16 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted">⌘K</kbd>
            </div>
          </div>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-1">
          {/* Mobile Search */}
          <button className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors">
            <Search className="h-5 w-5" />
          </button>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="p-2 rounded-lg hover:bg-accent transition-colors text-sm font-medium min-w-[40px]"
            aria-label={t("toggleLanguage")}
          >
            {language.toUpperCase()}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label={t("toggleTheme")}
          >
            {mounted && (theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            ))}
          </button>

          {/* GitHub Link */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-accent transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </header>
  );
}
