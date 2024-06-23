import fs from "node:fs";
import path from "node:path";

import { __dirname } from "../../constants/index.js";
import { replaceAll } from "../../helpers/replaceAll.js";

export function populateModel({ name, dbType }) {
  const modelContent = fs.readFileSync(
    path.join(
      __dirname(import.meta.url),
      "..",
      "..",
      "assets",
      dbType,
      "<% name %>.model.txt"
    ),
    "utf-8"
  );

  const modifiedModelContent = replaceAll(modelContent, name);

  fs.writeFileSync(
    path.join(process.cwd(), "src", "resources", name, `${name}.model.ts`),
    modifiedModelContent
  );
}

