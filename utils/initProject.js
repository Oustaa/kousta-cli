import fs from "node:fs";
import path from "node:path";

import { __dirname } from "../constants/index.js";
import { populateEnv } from "./populateenv.js";
import { dbConnection } from "./dbConnection.js";
import { instalingDependencies } from "./installDependencies.js";

export async function initializeProject(options, endCb) {
  try {
    const projectPath = path.join(process.env.PWD, options.projectName);

    if (!fs.existsSync(projectPath)) {
      fs.mkdirSync(projectPath);
    }

    fs.readdir(
      path.join(__dirname(import.meta.url), "..", "project"),
      {
        recursive: true,
      },
      (err, files) => {
        if (err) {
          console.error(`Failed to read directory ${sourcePath}:`, err.message);
          process.exit(1);
        }

        files.forEach((fileFolder) => {
          const stat = fs.statSync(
            path.join(__dirname(import.meta.url), "..", "project", fileFolder)
          );
          if (stat.isDirectory()) {
            fs.mkdirSync(path.join(projectPath, fileFolder));
            return;
          }
          fs.copyFileSync(
            path.join(__dirname(import.meta.url), "..", "project", fileFolder),
            path.join(projectPath, fileFolder)
          );
        });
      }
    );

    fs.writeFileSync(
      path.join(process.cwd(), options.projectName, "kousta.json"),
      `{
  "projectName": "${options.projectName}",
  "database": "${options.dbType}"
}`
    );

    endCb();

    await populateEnv(options);

    await dbConnection(options);

    await instalingDependencies(options);
  } catch (error) {
    console.log(error);
  }
}

