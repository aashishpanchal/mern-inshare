// async catch error wrapper
import { Response, NextFunction, RequestHandler } from "express";

// for function
export function wrapper(fn: RequestHandler) {
  const callback = function (...args: any[]) {
    const next: NextFunction = args[args.length - 1];
    const res: Response = args.length > 3 ? args[2] : args[1];
    Promise.resolve(fn.apply(this, args))
      .then((data) => {
        // check data if exist or not
        if (data && data !== res) {
          if (data.status) {
            // find status
            const status = data.status || 200;
            // delete status
            delete data.status;
            // return response
            return res.status(status).send(data);
          }
          // return response
          return res.send(data);
        }
      })
      .catch(next);
  };

  return callback;
}
