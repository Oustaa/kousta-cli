import fs from "node:fs"
import path from "node:path"

import { __dirname } from "../../constants/index.js"

export function populateController({ name, capitalizeName, dbType }) {
    const ControllerContent = fs.readFileSync(path.join(__dirname(import.meta.url), "..", "..", "assets", dbType, "<% name %>.controller.txt"), "utf-8")

    const modifiedControllerContent = ControllerContent.replaceAll("<% name %>", name).replaceAll("<% Name %>", capitalizeName)

    fs.writeFileSync(path.join(process.cwd(), "src", "resources", name, `${name}.controller.ts`), modifiedControllerContent)
}