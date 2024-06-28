import path from "path";
import { execSync } from "child_process";
import { __dirname } from "../../constants/index.js";

export function initDbCommands(program) {
  program
    .command("db:migrate")
    .description("Sync the database tables")
    .option("-f, --force", "Force sync the tables")
    .action((cmd) => {
      const force = cmd.force || false;
      const scriptPath = path.resolve(__dirname(import.meta.url), "migrate.js");
      try {
        execSync(`ts-node ${scriptPath} ${force ? "--force" : ""}`, {
          stdio: "inherit",
        });
      } catch (error) {
        console.error("Something went wrong...");
        console.error(error);
      }
    });
}

