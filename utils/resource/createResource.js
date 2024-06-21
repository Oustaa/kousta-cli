import fs from "node:fs"
import path from "node:path"

import { __dirname } from "../../constants/index.js"
import { nameCapitalize, readKoustaJson } from "../../helpers/index.js"
import { populateModel } from "./populateModel.js"

export const createResource = async (name) => {
    const capitalizeName = nameCapitalize(name)
    if (!fs.existsSync(path.join(process.cwd(), "src", "resources",))) {
        fs.mkdirSync(path.join(process.cwd(), "src", "resources",))
    }

    if (!fs.existsSync(path.join(process.cwd(), "src", "resources", name))) {
        fs.mkdirSync(path.join(process.cwd(), "src", "resources", name))
    }

    try {
        const projectInfo = await readKoustaJson();

        populateModel(
            { name, capitalizeName, dbType: projectInfo.database }
        )


    } catch (error) {
        throw new Error(error)
    }



}