import fs from "node:fs";
import path from "node:path";

import { __dirname } from "../../constants/index.js";
import { replaceAll } from "../../helpers/replaceAll.js";

export function populateController({ name, capitalizeName, dbType }) {
  const ControllerContent = fs.readFileSync(
    path.join(
      __dirname(import.meta.url),
      "..",
      "..",
      "assets",
      dbType,
      "<% name %>.controller.txt"
    ),
    "utf-8"
  );

  const modifiedControllerContent = replaceAll(ControllerContent, name);

  fs.writeFileSync(
    path.join(process.cwd(), "src", "resources", name, `${name}.controller.ts`),
    modifiedControllerContent
  );

  const controllerInitializerContent = fs.readFileSync(
    path.join(process.cwd(), "src", "helpers", "initialiseControllers.ts"),
    "utf-8"
  );

  const updatedContent = controllerInitializerContent
    .replaceAll(
      "// <% controller-import %>",
      `import ${capitalizeName}Controller from "../resources/${name}/${name}.controller";
// <% controller-import %>`
    )
    .replaceAll(
      "//<% controller %>",
      `${capitalizeName}Controller,
    //<% controller %>`
    );

  fs.writeFileSync(
    path.join(process.cwd(), "src", "helpers", "initialiseControllers.ts"),
    updatedContent
  );
}

