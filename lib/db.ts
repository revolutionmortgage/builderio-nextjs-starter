import "server-only";
import type { PGlite } from "@electric-sql/pglite";
import { Pool } from "pg";

// The app's Postgres database.
//
// On RevStack, DATABASE_URL points at the app's own database and this connects to it.
// Anywhere else (Builder.io Fusion, `pnpm dev` on a laptop) there is no DATABASE_URL,
// and the app runs a real Postgres inside itself instead (PGlite), keeping its data in
// .data/postgres. Same SQL either way, nothing to install or set up. To use a database
// of your own locally, set DATABASE_URL in .env.local (compose.yaml starts one).
//
// Connections to a managed database are encrypted. The container trusts the AWS RDS
// certificate authority through NODE_EXTRA_CA_CERTS (see the Dockerfile); set
// PGSSLMODE=disable only for a local Postgres without TLS.

export type Rows<T> = { rows: T[] };

export interface Db {
  query<T = Record<string, unknown>>(sql: string, params?: unknown[]): Promise<Rows<T>>;
  // Runs fn inside one transaction: everything in it is saved together, or not at all.
  transaction<T>(fn: (tx: Db) => Promise<T>): Promise<T>;
}

const globalForDb = globalThis as unknown as { appDb?: Db };

export function db(): Db {
  globalForDb.appDb ??= process.env.DATABASE_URL ? postgres(process.env.DATABASE_URL) : embedded();
  return globalForDb.appDb;
}

// Whether the app is using the real database RevStack gave it, rather than the one it
// runs inside itself.
export function hasManagedDatabase(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

function postgres(url: string): Db {
  const pool = new Pool({
    connectionString: url,
    ssl: process.env.PGSSLMODE === "disable" ? false : { rejectUnauthorized: true },
    max: 5,
    // Fail fast instead of hanging if the database is unreachable or stuck. The first
    // connection after a quiet spell can take a few seconds while the database wakes.
    connectionTimeoutMillis: 15_000,
    query_timeout: 10_000,
    statement_timeout: 10_000,
    idleTimeoutMillis: 30_000,
  });
  // An idle connection that drops (for example when the database restarts) is reported
  // here rather than through a query; without a listener it would stop the server.
  pool.on("error", (err) => console.error("postgres pool error:", err.message));
  return {
    query: <T,>(sql: string, params?: unknown[]) => pool.query(sql, params) as unknown as Promise<Rows<T>>,
    async transaction(fn) {
      const client = await pool.connect();
      try {
        await client.query("begin");
        const out = await fn({
          query: <T,>(sql: string, params?: unknown[]) => client.query(sql, params) as unknown as Promise<Rows<T>>,
          transaction: () => Promise.reject(new Error("transactions cannot be nested")),
        });
        await client.query("commit");
        return out;
      } catch (err) {
        await client.query("rollback").catch(() => {});
        throw err;
      } finally {
        client.release();
      }
    },
  };
}

function embedded(): Db {
  // Loaded only when needed, so the deployed app never starts it.
  const ready: Promise<PGlite> = (async () => {
    const [{ PGlite }, { mkdir }] = await Promise.all([import("@electric-sql/pglite"), import("node:fs/promises")]);
    console.log("No DATABASE_URL: using the built-in Postgres in .data/postgres");
    await mkdir(".data", { recursive: true });
    return PGlite.create(".data/postgres");
  })();
  return {
    query: async <T,>(sql: string, params?: unknown[]) => (await ready).query<T>(sql, params),
    transaction: async (fn) =>
      (await ready).transaction((tx) =>
        fn({
          query: <T,>(sql: string, params?: unknown[]) => tx.query<T>(sql, params),
          transaction: () => Promise.reject(new Error("transactions cannot be nested")),
        }),
      ),
  };
}
