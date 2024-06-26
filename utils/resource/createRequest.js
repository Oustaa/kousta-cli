import fs from "node:fs";
import path from "node:path";

import { __dirname } from "../../constants/index.js";
import { replaceAll } from "../../helpers/replaceAll.js";
import { readKoustaJson } from "../../helpers/readkoustaJson.js";
import { nameCapitalize } from "../../helpers/nameCapitalize.js";

export async function createRequest(name) {
  const { database } = await readKoustaJson();
  const capitalizeName = nameCapitalize(name);

  const requestPath = path.join(
    process.cwd(),
    "src",
    "App",
    "Http",
    "Requests"
  );

  if (!fs.existsSync(requestPath)) {
    fs.mkdirSync(requestPath);
  }

  const validationContent = fs.readFileSync(
    path.join(
      __dirname(import.meta.url),
      "..",
      "..",
      "assets",
      database,
      "request.txt"
    ),
    "utf-8"
  );

  const modifiedValidationContent = replaceAll(validationContent, name);

  fs.writeFileSync(
    path.join(requestPath, `${capitalizeName}Request.ts`),
    modifiedValidationContent
  );
}

