import fs from "node:fs";
import path from "node:path";

import { __dirname } from "../../constants/index.js";
import { replaceAll, nameCapitalize } from "../../helpers/index.js";
import { readKoustaJson } from "../../helpers/readkoustaJson.js";
import { createSpinner } from "nanospinner";
import { askQuestion } from "../ask.js";

export async function createModel(name) {
  name = name
    ? name
    : await askQuestion({
        type: "input",
        message: "Enter the model name:",
      });

  const spinner = createSpinner("Creating model...").start();

  const capitalizeName = nameCapitalize(name);
  const projectInfo = await readKoustaJson();

  try {
    const modelsPath = path.join(process.cwd(), "src", "App", "Models");
    if (!fs.existsSync(modelsPath)) {
      fs.mkdirSync(modelsPath);
    }
    const modelContent = fs.readFileSync(
      path.join(
        __dirname(import.meta.url),
        "..",
        "..",
        "assets",
        projectInfo.database,
        "Model.txt"
      ),
      "utf-8"
    );

    const modifiedModelContent = replaceAll(modelContent, name);

    fs.writeFileSync(
      path.join(modelsPath, `${capitalizeName}Model.ts`),
      modifiedModelContent
    );
    spinner.success();
  } catch (error) {
    console.log(error);
    spinner.error();
  }
}

