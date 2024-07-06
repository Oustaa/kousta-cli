import express, { Application } from "express";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import { connect } from "@/Database/config";
import ErrorMiddleware from "@/Middleware/error.middleware";

export default class APP {
  private static instance: APP;
  public express: Application;

  private constructor() {
    this.express = express();
    this.initialiseDatabaseConnection();
    this.initialiseMiddleware();
    this.initialiseErrorHandling();
  }

  public static getApp(): Application {
    if (!APP.instance) {
      APP.instance = new APP();
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
  
  private initialiseErrorHandling(): void {
    this.express.use(ErrorMiddleware);
  }

  private initialiseDatabaseConnection(): void {
    connect();
  }
}
