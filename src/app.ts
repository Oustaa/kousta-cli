import express, { Application } from "express";
import mongoose from "mongoose";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import Controller from "@/utils/interfaces/Controler.interface";
import ErrorMiddleware from "@/middleware/error.middleware";

class APP {
  public express: Application;
  public port: number;

  constructor(controllers: Controller[], path: number) {
    this.express = express();
    this.port = 3000;

    this.initialiseDatabaseConnection();
    this.initialiseMiddleware();
    this.initialiseControllers(controllers);
    this.initialiseErrorHandling();
  }
  private initialiseMiddleware(): void {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(morgan("dev"));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
  }

  private initialiseControllers(controler: Controller[]): void {
    controler.forEach((controller) => {
      this.express.use(`/api`, controller.router);
      //   this.express.use(controller.path, controller.router);
    });
  }

  private initialiseErrorHandling(): void {
    this.express.use(ErrorMiddleware);
  }

  private initialiseDatabaseConnection(): void {
    const { MONGO_USER, MONGO_PASS, MONGO_PATH } = process.env;
    mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASS}${MONGO_PATH}`);
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

export default APP;
