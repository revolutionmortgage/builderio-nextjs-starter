import { NextResponse } from "next/server";
import { db, hasDatabase } from "@/lib/db";

export const dynamic = "force-dynamic";

// Used by the platform to check the app is up. Reports the database too, if there is one.
export async function GET() {
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
