import { NextResponse } from "next/server";
import { getChapterBySlug, getChapterNavigation } from "@/lib/content";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  const { slug } = await params;
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") || "en";
  
  const chapter = getChapterBySlug(slug, locale);
  
  if (!chapter) {
    return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
  }
  
  const { prev, next } = getChapterNavigation(slug, locale);
  
  return NextResponse.json({
    chapter,
    prev,
    next,
  });
}
