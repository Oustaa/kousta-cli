import fs from "node:fs";
import path from "node:path";

import { __dirname } from "../../constants/index.js";
import {
  nameCapitalize,
  readKoustaJson,
  replaceAll,
} from "../../helpers/index.js";
import { createSpinner } from "nanospinner";

export async function createResource(name) {
  name = name
    ? name
    : await askQuestion({
        type: "input",
        message: "Enter resource name:",
      });

  const spinner = createSpinner("Creating resource...").start();
  try {
    const capitalizeName = nameCapitalize(name);

    const { database } = await readKoustaJson();
    const modelsPath = path.join(
      process.cwd(),
      "src",
      "App",
      "Http",
      "Resources"
    );

    if (!fs.existsSync(modelsPath)) {
      fs.mkdirSync(modelsPath);
    }
    const modelContent = fs.readFileSync(
      path.join(
        __dirname(import.meta.url),
        "..",
        "..",
        "assets",
        database,
        "resource.txt"
      ),
      "utf-8"
    );

    const modifiedModelContent = replaceAll(modelContent, name);

    fs.writeFileSync(
      path.join(modelsPath, `${capitalizeName}Resource.ts`),
      modifiedModelContent
    );
    spinner.success();
  } catch (error) {
    console.log(error);
    spinner.error();
  }
}

