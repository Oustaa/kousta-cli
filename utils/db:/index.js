export default function dbProgram(program) {
  program
    .command("db:migrate")
    .description("Sync the database tables")
    .option("-f, --force", "Force sync the tables")
    .action((cmd) => {
      const force = cmd.force || false;
      const scriptPath = resolve(
        __dirname(import.meta.url),
        "/utils/db:/migrat.ts"
      );
      execSync(`ts-node ${scriptPath} ${force ? "--force" : ""}`, {
        stdio: "inherit",
      });
    });
}

