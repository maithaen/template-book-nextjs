# 📚 Web Book Template Next.js

A modern, beautiful, and feature-rich Next.js template for creating online books, documentation, coding tutorials, or any book-style web applications.

![Next.js](https://img.shields.io/badge/Next.js-16.x-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- 📖 **Multi-chapter content organization** - Organize your content into chapters with automatic navigation
- 🌍 **Multi-language support (i18n)** - Built-in support for English and Lao with easy extension
- 🌓 **Dark/Light theme toggle** - Automatic system detection with manual override
- 📱 **Responsive design** - Mobile-first approach with collapsible sidebar
- 📑 **Table of Contents** - Dynamic TOC with scroll tracking and read indicators
- 🎨 **MDX Support** - Write content in Markdown with React components
- 🐳 **Docker-ready** - Production-ready Dockerfile and docker-compose

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.x | React framework with App Router |
| React | 19.x | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling |
| MDX | 3.x | Markdown + JSX for content |
| next-themes | 0.4.x | Theme management |
| gray-matter | 4.x | Frontmatter parsing |
| lucide-react | Latest | Icons |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the template
git clone https://github.com/maithaen/template-book-nextjs.git my-book
cd my-book

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## 📁 Project Structure

```
template-book-nextjs/
├── app/                          # Next.js App Router
│   ├── api/chapters/             # Chapters API endpoint
│   ├── content/[slug]/           # Dynamic content pages
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   ├── content/                  # ContentPage, TableOfContents
│   ├── layout/                   # Header, Sidebar
│   ├── providers/                # ThemeProvider
│   └── ui/                       # Button, etc.
├── content/
│   ├── en/                       # English MDX chapters
│   └── lo/                       # Lao MDX chapters
├── lib/
│   ├── i18n/                     # Language context & translations
│   ├── content.ts                # MDX utilities
│   └── MobileSidebarContext.tsx  # Mobile sidebar state
├── Dockerfile                    # Production Docker build
├── docker-compose.yml            # Docker Compose config
└── .env.example                  # Environment variables template
```

## 📝 Adding Content

Create MDX files in the `content/[locale]/` directory:

```mdx
---
title: "Chapter Title"
description: "Brief description"
order: 1
---

# Your Content

Write Markdown with **bold**, *italics*, and more.

## Code Examples

\`\`\`javascript
const hello = "world";
\`\`\`

## Tables

| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |
```

## 🎨 Customization

### Colors
Edit CSS variables in `app/globals.css`:

```css
:root {
  --primary: oklch(0.65 0.19 160);
  --background: oklch(1 0 0);
  /* ... */
}
```

### Translations
Add/edit translations in `lib/i18n/locales/`:
- `en.json` - English
- `lo.json` - Lao
- Add more languages as needed

### Metadata
Update `app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  title: "Your Book Title",
  description: "Your description",
};
```

## 🐳 Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build manually
docker build -t my-book .
docker run -p 3000:3000 my-book
```

## 📊 API Endpoints

### GET `/api/chapters?locale=en`

Returns list of chapters for the specified locale.

```json
[
  {
    "title": "Introduction",
    "description": "Welcome to the book",
    "order": 1,
    "slug": "chapter-1"
  }
]
```

## 🎭 Use Cases

- 📕 Technical documentation
- 📚 Educational textbooks
- 🎨 Manga/comic readers
- 📖 Online novels
- 📋 User guides & handbooks

## 📄 License

MIT License - Feel free to use for any project!

## 🤝 Credits

Built with ❤️ using:
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MDX](https://mdxjs.com/)
- [Lucide Icons](https://lucide.dev/)
