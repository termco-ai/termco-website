import { NextResponse } from "next/server";
import { getLatestRelease } from "@/lib/releases";

export const revalidate = 300;

export async function GET() {
  const release = await getLatestRelease();
  return NextResponse.json(release, {
    status: release ? 200 : 503,
    headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" },
  });
}
