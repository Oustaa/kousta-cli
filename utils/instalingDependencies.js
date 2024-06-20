import fs from "node:fs";
import path from "node:path";
import util from "node:util";
import { exec as execCb } from "node:child_process";

import { createSpinner } from "nanospinner";
import { __dirname } from "../constants/index.js";

const exec = util.promisify(execCb);

export async function instalingDependencies({ dbType, projectName }) {
  const dependencies = fs
    .readFileSync(
      path.join(
        __dirname(import.meta.url),
        "..",
        "assets",
        dbType,
        "install.txt"
      )
    )
    .toString();

  const spinner = createSpinner("Instaling dependencies...").start();

  await exec(`npm i ${dependencies}`, {
    cwd: path.join(process.cwd(), projectName),
  });

  spinner.success();
}

