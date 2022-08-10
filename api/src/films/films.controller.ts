import { BaseController } from "../common/base.controller";
import { Request, Response } from "express";
import { FilmsService } from "./films.service";

export class FilmsController extends BaseController {
  constructor(private readonly filmsService: FilmsService) {
    super();
    this.bindRoutes([
      { path: "/", method: "get", func: this.fetch },
      { path: "/filters", method: "get", func: this.getFilters },
      { path: "*", method: "get", func: this.notFound },
    ]);
  }

  async fetch(req: any, res: Response) {
    try {
      const films = await this.filmsService.fetch(req.query);
      res.status(200).json(films);
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getFilters(req: Request, res: Response) {
    try {
      const filters = this.filmsService.getFilters();
      res.status(200).json(filters);
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  notFound(req: Request, res: Response) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
}