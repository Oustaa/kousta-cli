import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

/**
 * projectName: string
 * dbType : mongoDB | mysql
 * withAuth: boolean
 */

// Get the current directory of the script
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function initializeProject(options, endCb) {
  const projectPath = path.join(process.env.PWD, options.projectName);

  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath);
  }

  fs.readdir(
    path.join(__dirname, "..", "project"),
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
          path.join(__dirname, "..", "project", fileFolder)
        );
        if (stat.isDirectory()) {
          fs.mkdirSync(path.join(projectPath, fileFolder));
          return;
        }
        fs.copyFileSync(
          path.join(__dirname, "..", "project", fileFolder),
          path.join(projectPath, fileFolder)
        );
      });
    }
  );

  endCb();
}

