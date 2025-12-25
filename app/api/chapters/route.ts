import { NextResponse } from "next/server";
import { getChapters } from "@/lib/content";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") || "en";
  
  const chapters = getChapters(locale);
  
  return NextResponse.json(chapters);
}
