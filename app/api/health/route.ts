import { NextResponse, type NextRequest } from "next/server";
import { db, hasDatabase } from "@/lib/db";

export const dynamic = "force-dynamic";

// RevStack checks this every few seconds to decide whether the app can take traffic, so by
// default it only confirms the app is up. Checking the database on every call would keep
// an idle database from pausing and take the app out of service while it wakes.
// /api/health?check=database also checks the database.
export async function GET(request: NextRequest) {
  if (request.nextUrl.searchParams.get("check") !== "database") {
    return NextResponse.json({ ok: true });
  }
  if (!hasDatabase()) {
    return NextResponse.json({ ok: true, database: "not configured" });
  }
  try {
    await db().query("select 1");
    return NextResponse.json({ ok: true, database: "ok" });
  } catch (error) {
    // Details go to the server log, never to the public response.
    console.error("health check: database unreachable:", error instanceof Error ? error.message : error);
    return NextResponse.json({ ok: false, database: "unreachable" }, { status: 503 });
  }
}
