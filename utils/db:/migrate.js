import path from "path";
import fs from "fs";
import { createSpinner } from "nanospinner";
import { register } from "ts-node";

// Register ts-node to handle TypeScript imports
register();

export async function dbMigration(force) {
  const spinner = createSpinner("Seeding the tables...").start();

  try {
    const modelsDir = path.resolve(process.cwd(), "./src/App/Models");
    const files = fs.readdirSync(modelsDir);

    for (const file of files) {
      console.log(file);
      if (file.endsWith(".ts") || file.endsWith(".js")) {
        const modelPath = path.join(modelsDir, file);
        const model = await import(modelPath);

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
    console.error("\n", error);
    spinner.error();
  }
}

// Get the force argument from the command line
const force = process.argv.includes("--force");
dbMigration(force);

