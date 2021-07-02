import { Request, Response } from "express";
import { verifyPassword, generateAccessToken } from "../authentication";
import {
  badRequestResponse,
  internalServerErrorResponse,
  successResponse,
  unauthorizedResponse,
} from "../common/responses";
import { User } from "./user.entity";
import { createUser, getUserByEmail, getAllUsers } from "./user.manager";
export const getAll = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  successResponse(res, users);
};

export const register = async (req: Request, res: Response) => {
  if (!(await getUserByEmail(req.body.email))) {
    const user: User = await createUser(req.body);
    const newUser: any = { ...user };
    delete newUser.password;
    successResponse(res, newUser);
  } else {
    badRequestResponse(res, "email already exists");
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await getUserByEmail(req.body.email);
    const { password } = req.body;
    if (user) {
      if (verifyPassword(password, user.password)) {
        const accessToken = await generateAccessToken(user);
        successResponse(res, { accessToken });
      } else {
        unauthorizedResponse(res, "invalid username or password");
      }
    } else {
      unauthorizedResponse(res, "user does not exist");
    }
  } catch (error) {
    internalServerErrorResponse(res, error);
  }
};
