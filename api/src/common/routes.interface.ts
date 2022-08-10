import { NextFunction, Request, Response, Router } from "express";

export interface RoutesInterface {
  path: string;
  func: (req: Request, res: Response, next: NextFunction) => void;
  method: keyof Pick<Router, "post" | "get" | "patch" | "put">;
}
