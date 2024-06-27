import path from "path";
import fs from "fs";
import { createSpinner } from "nanospinner";
import { register } from "ts-node";
import { pathToFileURL } from "url";

// Register ts-node to handle TypeScript files
register({
  project: path.resolve(process.cwd(), "tsconfig.json"),
});

export async function dbMigration(force) {
  const spinner = createSpinner("Seeding the tables...").start();

  try {
    const modelsDir = path.resolve(process.cwd(), "./src/App/Models");
    const files = fs.readdirSync(modelsDir);

    for (const file of files) {
      if (file.endsWith(".ts")) {
        const modelPath = path.join(modelsDir, file);
        const model = await import(pathToFileURL(modelPath).href);

        if (model.default && typeof model.default.sync === "function") {
          await model.default.sync({ force });
          console.log(`Model ${file} synced successfully`);
        } else {
          console.warn(`Model ${file} does not export a valid Sequelize model`);
        }
      }
    }
    spinner.success();
  } catch (error) {
    console.log("\n", error);
    spinner.error();
  }
}

