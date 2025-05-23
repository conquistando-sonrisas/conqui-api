import { NextFunction, Request, RequestHandler, Response } from "express";
import { validationResult } from "express-validator";


export const validator: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  return next();
}