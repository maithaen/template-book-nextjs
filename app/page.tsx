"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Book, Globe, Moon, Smartphone, ArrowRight, Sparkles } from "lucide-react";

const features = [
  {
    icon: Globe,
    titleKey: "feature1Title" as const,
    descKey: "feature1Desc" as const,
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: Moon,
    titleKey: "feature2Title" as const,
    descKey: "feature2Desc" as const,
    gradient: "from-purple-500 to-pink-400",
  },
  {
    icon: Book,
    titleKey: "feature3Title" as const,
    descKey: "feature3Desc" as const,
    gradient: "from-green-500 to-teal-400",
  },
  {
    icon: Smartphone,
    titleKey: "feature4Title" as const,
    descKey: "feature4Desc" as const,
    gradient: "from-orange-500 to-yellow-400",
  },
];

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-teal-500/10 dark:from-green-500/5 dark:to-teal-500/5" />
          
          {/* Animated Circles */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          
          <div className="relative max-w-6xl mx-auto px-6 py-24 lg:py-32">
            <div className="text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Next.js 16 + MDX</span>
              </div>

              {/* Title */}
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-400 bg-clip-text text-transparent">
                  {t("heroTitle")}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
                {t("heroSubtitle")}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/content/chapter-1">
                  <Button size="lg" className="group gap-2 px-8">
                    {t("getStarted")}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg" className="gap-2">
                    <Book className="h-4 w-4" />
                    {t("learnMore")}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-muted/30">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything you need
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Built with modern technologies for the best developer and reader experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-4`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-2">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t(feature.descKey)}
                  </p>

                  {/* Hover Effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Start Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Quick Start
              </h2>
              <p className="text-lg text-muted-foreground">
                Get started in under 5 minutes
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-sm text-muted-foreground font-mono">terminal</span>
              </div>
              <div className="p-6 font-mono text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-500">$</span>
                  <span>git clone https://github.com/your-repo/web-book-template.git my-book</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-500">$</span>
                  <span>cd my-book</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-500">$</span>
                  <span>pnpm install</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">$</span>
                  <span>pnpm dev</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-8">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-muted-foreground">
              {t("footer")}
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
