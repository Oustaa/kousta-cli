import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import HttpException from "@/Utils/exceptions/http.exception";

export function isAuthorised(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      let token = req.headers["authorization"];

      if (token) {
        token = token.substring(7);
        const user = jwt.verify(token, process.env.ACCESS_TOKEN!);

        if (user) {
          req.user = user;
        } else {
          throw new HttpException(403, "Invalid token");
        }
      } else {
        throw new HttpException(403, "No token provided");
      }

      const result = await originalMethod.call(this, req, res, next);
      return result;
    } catch (error) {
      next(error);
    }
  };

  return descriptor;
}
