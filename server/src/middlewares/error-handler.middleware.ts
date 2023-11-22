import config from "@/config";
import httpStatus from "http-status";
import { HttpError } from "@/utils/errors";
import { ErrorRequestHandler } from "express";

export const errorHandlerMiddleware: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next
) => {
  const isDev = config.get<boolean>("is_dev", false);
  // http-errors-apis recognize errors
  if (HttpError.isHttpError(error))
    return res.status(error.statusCode).send(error.response);

  // internal server errors
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    message: isDev ? error.message : `Something went wrong!`,
    error: isDev ? error.name : "Internal server error",
    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
  });
};
