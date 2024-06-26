import fs from "node:fs";
import path from "node:path";

import { __dirname } from "../../constants/index.js";
import { replaceAll, nameCapitalize } from "../../helpers/index.js";
import { readKoustaJson } from "../../helpers/readkoustaJson.js";
import { askQuestion } from "../ask.js";
import { createSpinner } from "nanospinner";

export async function createController(name) {
  name = name
    ? name
    : await askQuestion({
        type: "input",
        message: "Enter controller name:",
      });

  const spinner = createSpinner("Creating controller...").start();
  try {
    const capitalizeName = nameCapitalize(name);
    const { database: dbType } = await readKoustaJson();

    const controllerPath = path.join(
      process.cwd(),
      "src",
      "App",
      "Http",
      "Controllers"
    );

    if (!fs.existsSync(controllerPath)) {
      fs.mkdirSync(controllerPath);
    }

    const ControllerContent = fs.readFileSync(
      path.join(
        __dirname(import.meta.url),
        "..",
        "..",
        "assets",
        dbType,
        "Controller.txt"
      ),
      "utf-8"
    );

    const modifiedControllerContent = replaceAll(ControllerContent, name);

    fs.writeFileSync(
      path.join(controllerPath, `${capitalizeName}Controller.ts`),
      modifiedControllerContent
    );

    spinner.success();
  } catch (error) {
    console.log(error);
    spinner.error();
  }
}

