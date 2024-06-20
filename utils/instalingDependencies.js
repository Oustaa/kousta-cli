import path from "node:path";
import util from "node:util";
import { exec as execCb } from "node:child_process";

import { createSpinner } from "nanospinner";

const exec = util.promisify(execCb);

export async function instalingDependencies(projectName) {
  const spinner = createSpinner("Instaling dependencies...").start();

  await exec("npm i", {
    cwd: path.join(process.cwd(), projectName),
  });

  spinner.success();
}

