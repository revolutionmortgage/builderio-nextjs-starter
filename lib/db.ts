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
  globalForDb.pgPool ??= new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.PGSSLMODE === "disable" ? false : { rejectUnauthorized: true },
    max: 5,
  });
  return globalForDb.pgPool;
}

export function hasDatabase(): boolean {
  return Boolean(process.env.DATABASE_URL);
}
