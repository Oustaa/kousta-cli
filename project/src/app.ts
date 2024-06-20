import express, { Application } from "express";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { connect } from "./database/config";

import Controller from "./utils/interfaces/Controler.interface";
import ErrorMiddleware from "./middleware/error.middleware";

export default class APP {
  private static instance: APP;
  public express: Application;

  private constructor() {
    this.express = express();
    this.initialiseDatabaseConnection();
    this.initialiseMiddleware();
    this.initialiseErrorHandling();
  }

  public static getApp(controllers: Controller[]): Application {
    if (!APP.instance) {
      APP.instance = new APP();
      APP.instance.initialiseControllers(controllers);
    }

    return APP.instance.express;
  }

  private initialiseMiddleware(): void {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(morgan("dev"));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
  }

  private initialiseControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.express.use(`/api`, controller.router);
    });
  }

  private initialiseErrorHandling(): void {
    this.express.use(ErrorMiddleware);
  }

  private initialiseDatabaseConnection(): void {
    connect();
  }
}
