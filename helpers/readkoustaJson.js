import fs from "node:fs"
import path from "node:path";

export const readKoustaJson = async () => {
    if (!fs.existsSync(path.join(process.cwd(), "kousta.json"))) {
        throw new Error(`kousta.json not found, please check if it exists in the root of your project`);
    }

    const koustaJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), "kousta.json"), "utf-8"));

    return koustaJson
}