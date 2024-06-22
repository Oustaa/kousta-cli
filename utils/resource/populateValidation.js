import fs from "node:fs";
import path from "node:path";

import { __dirname } from "../../constants/index.js";

export function populateValidation({ name, capitalizeName, dbType }) {
  const ValidationContent = fs.readFileSync(
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

  const modifiedValidationContent = ValidationContent.replaceAll(
    "<% name %>",
    name
  ).replaceAll("<% Name %>", capitalizeName);

  fs.writeFileSync(
    path.join(process.cwd(), "src", "resources", name, `${name}.validation.ts`),
    modifiedValidationContent
  );
}
