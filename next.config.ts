import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server build, used by the Dockerfile for RevStack.
  output: "standalone",
  // The built-in Postgres (lib/db.ts) loads its own database files at run time.
  serverExternalPackages: ["@electric-sql/pglite"],
};

export default nextConfig;
