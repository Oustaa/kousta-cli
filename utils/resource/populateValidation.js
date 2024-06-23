import fs from "node:fs";
import path from "node:path";

import { __dirname } from "../../constants/index.js";
import { replaceAll } from "../../helpers/replaceAll.js";

export function populateValidation({ name, dbType }) {
  const validationContent = fs.readFileSync(
    path.join(
      __dirname(import.meta.url),
      "..",
      "..",
      "assets",
      dbType,
      "<% name %>.validation.txt"
    ),
    "utf-8"
  );

  const modifiedValidationContent = replaceAll(validationContent, name);

  fs.writeFileSync(
    path.join(process.cwd(), "src", "resources", name, `${name}.validation.ts`),
    modifiedValidationContent
  );
}

