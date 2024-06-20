import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

export function __dirname(url) {
  const __filename = fileURLToPath(url);
  return dirname(__filename);
}

