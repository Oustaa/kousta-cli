import { __dirname } from "../../constants/index.js";
import { createModel } from "./createModel.js";
import { createRequest } from "./createRequest.js";
import { createController } from "./createController.js";
import { createResource } from "./createResource.js";

export const createHttp = async (name) => {
  try {
    createModel(name);
    createRequest(name);
    createController(name);
    createResource(name);
  } catch (error) {
    throw new Error(error);
  }
};

