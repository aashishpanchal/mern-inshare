import * as z from "zod";
import httpStatus from "http-status";
import type { NextFunction, Request, Response } from "express";

export function zodMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof z.ZodError)
    res.status(httpStatus.BAD_REQUEST).json({
      message: "Validation Error",
      statusCode: httpStatus.BAD_REQUEST,
      error: err.issues,
    });
  else _next(err);
}
