import "server-only";
import { Pool } from "pg";

// One connection pool per server process. RevStack gives each app a DATABASE_URL
// pointing at its own Postgres database; locally, set it in .env.local.
//
// Connections to a managed database are encrypted. The container trusts the AWS RDS
// certificate authority through NODE_EXTRA_CA_CERTS (see the Dockerfile); set
// PGSSLMODE=disable only for a local Postgres without TLS.
const globalForDb = globalThis as unknown as { pgPool?: Pool };

export function db(): Pool {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set. This app has no database configured.");
  }
  if (!globalForDb.pgPool) {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
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
    globalForDb.pgPool = pool;
  }
  return globalForDb.pgPool;
}

export function hasDatabase(): boolean {
  return Boolean(process.env.DATABASE_URL);
}
