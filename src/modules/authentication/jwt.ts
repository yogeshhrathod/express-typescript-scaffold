import { User } from "../users/user.entity";
import jwt from "jsonwebtoken";
import config from "../../config/config";

export const generateAccessToken = async (user: User) => {
  const payload = {
    user: user.id,
    email: user.email,
    organization: user.organization,
    isActive: user.isActive,
  };
  return await jwt.sign(payload, config.secret as string, {
    expiresIn: 36000,
    algorithm: "HS256",
  });
};
