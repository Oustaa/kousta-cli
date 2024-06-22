#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import { readFileSync, existsSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import { askQuestion } from "./utils/ask.js";
import { initializeProject } from "./utils/initProject.js";
import { createResource } from "./utils/resource/createResource.js";
import { __dirname } from "./constants/index.js";

let packageJson;
try {
  const packageJsonPath = join(__dirname(import.meta.url), "package.json");
  console.log(packageJsonPath);
  if (!existsSync(packageJsonPath)) {
    throw new Error(`package.json not found at ${packageJsonPath}`);
  }
  packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
} catch (error) {
  console.error("Failed to read package.json:", error.message);
  process.exit(1);
}

async function createProject(projectName, options) {
  let dbType = options.database;
  let withAuth = options.authentication;

  if (!projectName) {
    projectName = await askQuestion({
      type: "input",
      message: "Enter project name:",
      defaultValue: "project-name",
    });
  }

  if (!dbType) {
    dbType = await askQuestion({
      type: "list",
      message: "What type of database do you want to use?",
      defaultValue: "mongodb",
      choices: ["mongodb", "mysql"],
    });
  }

  if (typeof withAuth === "undefined") {
    withAuth = await askQuestion({
      type: "confirm",
      message: "Do you want to add authentication?",
      defaultValue: false,
    });
  }

  const spinner = createSpinner("Initializing project folder...").start();

  initializeProject(
    {
      projectName,
      dbType,
      withAuth,
    },
    spinner.success
  );

  try {
    const packageJsonContent = JSON.parse(
      readFileSync(join(process.cwd(), projectName, "package.json"), "utf-8")
    );

    packageJsonContent.name = projectName;

    writeFileSync(
      join(process.cwd(), projectName, "package.json"),
      JSON.stringify(packageJsonContent, null, 2)
    );
  } catch (error) {
    console.log(error);
  }
}

async function makeResource(name) {
  const resourceName = name
    ? name
    : await askQuestion({
        type: "input",
        message: "Enter the name of the resource:",
        defaultValue: "resource-name",
      });

  try {
    const spinner = createSpinner("Creating resource...").start();
    await createResource(resourceName);
    spinner.success();
  } catch (error) {
    console.log(error);
    spinner.error();
  }
}

figlet("Kousta CLI", (err, data) => {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }

  console.log(chalk.green(data));

  program
    .name(packageJson.name)
    .description(packageJson.description)
    .version(packageJson.version);

  program
    .command("create-project [project-name]")
    .description("Create a new project with specified options")
    .option("-db, --database <type>", "Add database support (mongodb or mysql)")
    .option("-auth, --authentication", "Add authentication support")
    .action((projectName, options) => createProject(projectName, options))
    .on("--help", () => {
      console.log("\nExamples:");
      console.log(
        `  $ ${packageJson.name} create-project my-project -db mongodb -auth`
      );
      console.log(
        `  $ ${packageJson.name} create-project another-project --database mysql`
      );
    });

  program
    .command("make:resource [resource-name]")
    .description("Create a new resource with specified name")
    .action(makeResource)
    .on("--help", () => {
      console.log("\nExamples:");
      console.log(`  $ ${packageJson.name} make:resource`);
    });

  program.on("--help", () => {
    console.log("\nExamples:");
    console.log(
      `  $ ${packageJson.name} create-project my-project -db mongodb -auth`
    );
    console.log(`  $ ${packageJson.name} make:resource`);
  });

  program.parse(process.argv);
});

