import express, { Express } from "express";
import { Server } from "http";
import { FilmsController } from "./films/films.controller";
import cors from "cors";

export class App {
  app: Express;
  port: number;
  server!: Server;
  filmsController: FilmsController;

  constructor(filmsController: FilmsController) {
    this.app = express();
    this.port = 3000;
    this.filmsController = filmsController;
  }

  public async init() {
    this.useRoutes();
    this.server = this.app.listen(this.port);
    console.log("Server works!");
  }

  useRoutes() {
    this.app.use(cors());
    this.app.use("/", this.filmsController.router);
  }
}
