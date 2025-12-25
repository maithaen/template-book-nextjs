import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { MobileSidebarProvider } from "@/lib/MobileSidebarContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Book Template",
    template: "%s | Book Template",
  },
  description: "A modern, beautiful template for creating online books, documentation, and tutorials",
  keywords: ["book", "documentation", "tutorial", "nextjs", "mdx", "template"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Book Template",
    description: "A modern, beautiful template for creating online books, documentation, and tutorials",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <MobileSidebarProvider>
              {children}
            </MobileSidebarProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
