import pkg from "pg";
import { config } from "./config.mjs";
const { Pool } = pkg;

// Create a pool of connections

export const pool = new Pool({
  user: config.postgres.user,
  host: config.postgres.host,
  database: config.postgres.database,
  password: config.postgres.password,
  port: config.postgres.port || 5432,
});

// Test the connection immediately
export function connectPgSQL() {
  pool.connect((err, client, release) => {
    if (err) {
      console.error("Error connecting to PostgreSQL:", err.stack);
    } else {
      console.log("PostgreSQL connected successfully ✓".green);
      release();
    }
  });
}
export async function disconnectPgSQL() {
  try {
    await pool.end();
    console.log("PostgreSQL disconnected successfully ✓");
  } catch (err) {
    console.error("Error disconnecting PostgreSQL:", err.stack);
  }
}
