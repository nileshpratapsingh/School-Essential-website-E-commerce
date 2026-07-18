/*
 *  This is a dynamic route register.
 *  No need to register manual routers.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import Log from "./logger.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function registerRoutes(app) {

    const routesPath = path.join(__dirname, "../routes");

    const routeFiles = fs
    .readdirSync(routesPath)
    .filter(file =>
        file.endsWith(".mjs") &&
            file !== "index.mjs"
    )
    .sort();

    for (const file of routeFiles) {
        try {
            const routeModule = await import(
                pathToFileURL(path.join(routesPath, file))
            );

            if (!routeModule.default) {
                throw new Error(`No default export found in ${file}`);
            }

            const basePath = routeModule.basePath || "/";
            app.use(basePath, routeModule.default);
            Log.routerLogger(file, 1000);
        } catch (error) {
            console.error(`Failed to load route ${file}:`, error.message);
        }
    }
}
