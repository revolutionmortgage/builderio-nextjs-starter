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
    const { rows } = await db().query<{ version: string }>("select version()");
    return NextResponse.json({ ok: true, database: rows[0].version.split(" on ")[0] });
  } catch (error) {
    return NextResponse.json(
      { ok: false, database: error instanceof Error ? error.message : "unreachable" },
      { status: 503 },
    );
  }
}
