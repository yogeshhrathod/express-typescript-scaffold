import { Request, Response, NextFunction } from "express";
import { NetworkAuthenticationRequire } from "http-errors";
import config from "../../config/config";
import {
  internalServerErrorResponse,
  unauthorizedResponse,
} from "../common/responses";
import { getUserById } from "../users/user.manager";
const jwt = require("jsonwebtoken");

export const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      req.headers &&
      ![null, undefined].includes(req.headers.authorization as any)
    ) {
      const accessToken: string = (req.headers.authorization || "")
        .toString()
        .replace("Bearer", "")
        .trim();
      try {
        const payload = await jwt.verify(accessToken, config.secret);
        req.user = await getUserById(payload.id);
        next();
      } catch (error) {
        unauthorizedResponse(res, "invalid access token");
      }
    } else {
      unauthorizedResponse(res, "token not found");
    }
  } catch (error) {
    internalServerErrorResponse(res, error);
  }
};
