import { askQuestion } from "../ask.js";
import { createController } from "./createController.js";
import { createModel } from "./createModel.js";
import { createResource } from "./createResource.js";
import { createRequest } from "./createRequest.js";
import { createHttp } from "./createHttp.js";

async function makeHttp(name) {
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
    .command("make:http-group [resource-name]")
    .description(
      "Create a new http group ( C, M, RES, REQ ) with specified name"
    )
    .action(makeHttp)
    .on("--help", () => {
      console.log("\nExamples:");
      console.log(`  $ ${name} make:http-group`);
    });

  program
    .command("make:controller [controller-name]")
    .description("Create a new controller with specified name")
    .action(createController)
    .on("--help", () => {
      console.log("\nExamples:");
      console.log(`  $ ${name} make:controller`);
    });

  program
    .command("make:model [model-name]")
    .description("Create a new model with specified name")
    .action(createModel)
    .on("--help", () => {
      console.log("\nExamples:");
      console.log(`  $ ${name} make:model`);
    });

  program
    .command("make:resource [resource-name]")
    .description("Create a new resource with specified name")
    .action(createResource)
    .on("--help", () => {
      console.log("\nExamples:");
      console.log(`  $ ${name} make:resource`);
    });

  program
    .command("make:request [request-name]")
    .description("Create a new request with specified name")
    .action(createRequest)
    .on("--help", () => {
      console.log("\nExamples:");
      console.log(`  $ ${name} make:request`);
    });
}

