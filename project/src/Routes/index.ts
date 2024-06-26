import { Router } from "express";

const appRoutes = Router();

const controllers: { api: any[]; web: any[] } = {
  api: [],
  web: [],
};

controllers.api.forEach((controller) => {
  if (controller && controller.path && controller.router) {
    appRoutes.use(`/api${controller.path}`, controller.router);
  } else {
    console.error("Invalid API controller:", controller);
  }
});

controllers.web.forEach((controller) => {
  if (controller && controller.path && controller.router) {
    appRoutes.use(controller.path, controller.router);
  } else {
    console.error("Invalid Web controller:", controller);
  }
});

export default appRoutes;
