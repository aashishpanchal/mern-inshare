import express from "express";
import { join } from "path";
import { pathToRegexp } from "path-to-regexp";
import type { Application, NextFunction, Request, Response } from "express";

type Options = {
  rootPath?: string;
  exclude?: string[];
  renderPath?: string;
};

export const isRouteExcluded = (req: Request, paths: string[] = []) => {
  return paths.some((path) => {
    const re = pathToRegexp(path);
    const queryParamsIndex = req.originalUrl.indexOf("?");
    const pathname =
      queryParamsIndex >= 0
        ? req.originalUrl.slice(0, queryParamsIndex)
        : req.originalUrl;
    if (!re.exec(pathname + "/")) {
      return false;
    }
    return true;
  });
};

// this middleware help to render react build file
export const serveStaticFile = (app: Application, options: Options = {}) => {
  const clientPath = options?.rootPath || join(process.cwd(), "public");
  const indexFilePath = join(clientPath, "index.html");
  options.renderPath = options?.renderPath || "*";

  const renderFile = (req: Request, res: Response, next: NextFunction) => {
    if (!isRouteExcluded(req, options.exclude)) res.sendFile(indexFilePath);
    else next();
  };

  app.use(express.static(clientPath));
  app.get(options.renderPath, renderFile);
};
