import httpStatus from "http-status";
import { ErrorRes } from "./interface";
import { HttpError } from "./http.error";

export class BadRequest extends HttpError {
  constructor(message?: ErrorRes) {
    super(message, httpStatus.BAD_REQUEST, "BadRequest");
  }
}

export class Unauthorized extends HttpError {
  constructor(message?: ErrorRes) {
    super(message, httpStatus.UNAUTHORIZED, "Unauthorized");
  }
}

export class Forbidden extends HttpError {
  constructor(message?: ErrorRes) {
    super(message, httpStatus.FORBIDDEN, "Forbidden");
  }
}

export class NotFound extends HttpError {
  constructor(message?: ErrorRes) {
    super(message, httpStatus.NOT_FOUND, "NotFound");
  }
}

export class Conflict extends HttpError {
  constructor(message?: ErrorRes) {
    super(message, httpStatus.CONFLICT, "Conflict");
  }
}

export class UnprocessableEntity extends HttpError {
  constructor(message?: ErrorRes) {
    super(message, httpStatus.UNPROCESSABLE_ENTITY, "UnprocessableEntity");
  }
}

export class InternalServerError extends HttpError {
  constructor(message?: ErrorRes) {
    super(message, httpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error");
  }
}

export class NotImplemented extends HttpError {
  constructor(message?: ErrorRes) {
    super(message, httpStatus.NOT_IMPLEMENTED, "NotImplement");
  }
}

export class BadGateway extends HttpError {
  constructor(message?: ErrorRes) {
    super(message, httpStatus.BAD_GATEWAY, "BadGateway");
  }
}
