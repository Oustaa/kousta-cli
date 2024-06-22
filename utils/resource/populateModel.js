import fs from "node:fs";
import path from "node:path";

import { __dirname } from "../../constants/index.js";

export function populateModel({ name, capitalizeName, dbType }) {
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

  const modifiedModelContent = modelContent
    .replaceAll("<% name %>", name)
    .replaceAll("<% Name %>", capitalizeName);

  fs.writeFileSync(
    path.join(process.cwd(), "src", "resources", name, `${name}.model.ts`),
    modifiedModelContent
  );
}

