import logger from "@/common/logger";
import { HttpError } from "@/utils/errors";
import { ErrorRequestHandler } from "express";
import { saveErrorLog } from "@/utils/save-log";

export const errorLogMiddleware: ErrorRequestHandler = (
  error,
  _req,
  _res,
  next
) => {
  if (!HttpError.isHttpError(error)) {
    // save error log
    saveErrorLog(error);
    // console on error
    logger.error(error);
  }
  next(error);
};
