import { ErrorRes } from "./interface";

// http error handler class
export class HttpError extends Error {
  constructor(
    public message: ErrorRes = "",
    private status: number,
    public error?: string,
    public data?: any
  ) {
    super();
    this.initMessage();
    this.name = this.constructor.name;
    if (this.stack) Error.captureStackTrace(this, this.constructor);
  }

  private initMessage() {
    if (!this.message && this.constructor)
      this.message =
        this.constructor.name.match(/[A-Z][a-z]+|[0-9]+/g)?.join(" ") ??
        "Error";
  }

  get statusCode(): number {
    return this.status;
  }

  get response() {
    return {
      message: this.message,
      statusCode: this.status,
      error: this.error,
      data: this.data,
    };
  }

  // static method to check value if http-error
  static isHttpError(value: any): value is HttpError {
    if (!value || typeof value !== "object") return false;
    if (value instanceof HttpError) return true;
    return false;
  }
}
