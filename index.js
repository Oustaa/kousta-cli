#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import figlet from "figlet";
import { readFileSync } from "fs";
import { join } from "path";

const packageJsonPath = join(process.env.PWD, "package.json");
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));

const askQuestion = async ({
  type,
  message,
  defaultValue,
  choices,
  validate,
}) => {
  const answer = await inquirer.prompt({
    name: "answer",
    type,
    message,
    choices,
    validate,
    default() {
      return defaultValue;
    },
  });

  return answer.answer;
};

async function createProject(options) {
  const argv = process.argv;
  let projectName = argv[argv.indexOf("create-project") + 1];
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

  console.log(`Project Name: ${projectName}`);
  console.log(`Database Type: ${dbType}`);
  console.log(`With Authentication: ${withAuth}`);
  // Further code to initialize the project
}

async function makeResource() {
  const resourceName = await askQuestion({
    type: "input",
    message: "Enter the name of the resource:",
    defaultValue: "resource-name",
  });

  console.log(`Creating resource: ${resourceName}`);
  // Further code to create the resource
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
    .option(
      "-db, --database <type>",
      "Add database support (mongodb or mysql)",
      "mongodb"
    )
    .option("-auth, --authentication", "Add authentication support")
    .action(createProject)
    .on("--help", () => {
      console.log("\nExamples:");
      console.log(
        "  $ kousta-node-cli create-project my-project -db mongodb -auth"
      );
      console.log(
        "  $ kousta-node-cli create-project another-project --database mysql"
      );
    });

  program
    .command("make:resource")
    .description("Create a new resource with specified name")
    .action(makeResource)
    .on("--help", () => {
      console.log("\nExamples:");
      console.log("  $ kousta-node-cli make:resource");
    });

  program.on("--help", () => {
    console.log("\nExamples:");
    console.log(
      "  $ kousta-node-cli create-project my-project -db mongodb -auth"
    );
    console.log("  $ kousta-node-cli make:resource");
  });

  program.parse(process.argv);
});

