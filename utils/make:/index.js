import { createController } from "./createController.js";
import { createHttp } from "./createHttp.js";

async function makeResource(name) {
  const resourceName = name
    ? name
    : await askQuestion({
        type: "input",
        message: "Enter the name of the resource:",
      });

  try {
    await createHttp(resourceName);
  } catch (error) {
    console.log(error);
  }
}

export function initMakeCommands(program, name) {
  program
    .command("make:resource [resource-name]")
    .description("Create a new resource with specified name")
    .action(makeResource)
    .on("--help", () => {
      console.log("\nExamples:");
      console.log(`  $ ${name} make:resource`);
    });

  program
    .command("make:controller [controller-name]")
    .description("Create a new controller with specified name")
    .action(createController)
    .on("--help", () => {
      console.log("\nExamples:");
      console.log(`  $ ${name} make:controller`);
    });
}

