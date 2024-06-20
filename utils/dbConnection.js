import fs from "node:fs";
import path from "node:path";
import { __dirname } from "../constants/index.js";
import { createSpinner } from "nanospinner";

export async function dbConnection({ dbType, projectName }) {
  const spinner = createSpinner("Istableshing db connection...").start();

  // read config.txt the corresponding database
  const configTxtContent = fs.readFileSync(
    path.join(__dirname(import.meta.url), "..", "assets", dbType, "config.txt")
  );
  // write to the config.ts in the database folder in the project
  fs.writeFileSync(
    path.join(process.cwd(), projectName, "src", "database", "config.ts"),
    configTxtContent
  );

  spinner.success();
}

