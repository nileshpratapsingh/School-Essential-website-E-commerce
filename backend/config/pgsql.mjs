import pkg from "pg";
import { config } from "./config.mjs";
const { Pool } = pkg;
// Create a pool of connections
export const pool = new Pool({
    connectionString: config.postgres.url,
    ssl: {
        rejectUnauthorized: false
    }
});
// export const pool = new Pool(
//     config.postgres.url
//         ? {
//             connectionString: config.postgres.url,
//             ssl: { rejectUnauthorized: false },
//         }
//         : {
//             user: config.postgres.user,
//             host: config.postgres.host,
//             database: config.postgres.database,
//             password: config.postgres.password,
//             port: config.postgres.port || 5432,
//         },
// );

//     user: config.postgres.user,
//     host: config.postgres.host,
//     database: config.postgres.database,
//     password: config.postgres.password,
//     port: config.postgres.port || 5432,
// });

// Test the connection immediately
export function connectPgSQL() {
    pool.connect((err, client, release) => {
        if (err) {
            console.error("Error connecting to PostgreSQL:", err.stack);
            console.log("Env variables:");
            console.log("\nURl:",config.postgres.url);
            console.log("\nUser:",config.postgres.user);
            console.log("Host:",config.postgres.host);
            console.log("Database:",config.postgres.host);
            console.log("Password:",config.postgres.password);
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
