/// <reference path="states.d.ts" />

declare namespace Error {
  export interface APIError {
    error: string;
    message: string;
    statusCode: number;
  }
}
