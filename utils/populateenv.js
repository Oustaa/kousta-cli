import fs from "node:fs";
import path from "node:path";
import { randomBytes } from "crypto";
import { __dirname } from "../constants/index.js";
import { createSpinner } from "nanospinner";

export async function populateEnv({ dbType, projectName }) {
  const spinner = createSpinner("Populatig .env file...").start();

  try {
    const envPath = path.join(process.cwd(), projectName, ".env.example");
    const dbEnvDist = fs
      .readFileSync(
        path.join(__dirname(import.meta.url), "..", "assets", dbType, "env.txt")
      )
      .toString();

    const envContents = fs.readFileSync(envPath).toString();

    const updatedEnvContents = envContents
      .replace("<% database %>", dbEnvDist)
      .replace("<% access_token %>", randomBytes(64).toString("hex"))
      .replace("<% refresh_token %>", randomBytes(64).toString("hex"));

    fs.writeFileSync(
      path.join(process.cwd(), projectName, ".env"),
      updatedEnvContents
    );

    envValidate({ dbType, projectName });

    spinner.success();
  } catch (error) {
    console.log(error);
    spinner.error();
  }
}

function envValidate({ dbType, projectName }) {
  try {
    const envValidationPath = path.join(
      process.cwd(),
      projectName,
      "src",
      "utils",
      "validateEnv.ts"
    );
    const dbEnvValidationDist = fs
      .readFileSync(
        path.join(
          __dirname(import.meta.url),
          "..",
          "assets",
          dbType,
          "envValidation.txt"
        )
      )
      .toString();

    const envValidationContents = fs.readFileSync(envValidationPath).toString();

    const updatedEnvValidationContents = envValidationContents.replace(
      "<% env-validation %>,",
      dbEnvValidationDist
    );

    fs.writeFileSync(envValidationPath, updatedEnvValidationContents);
  } catch (error) {
    console.log(error);
  }
}

