import { Router } from "express";
import fileRouter from "./file/file.router";

export const apiRouter: Router = Router();

apiRouter.use("/file", fileRouter);
