import { getRepository } from "typeorm";
import { User } from "./user.entity";

export const createUser = async (userInfo: User): Promise<User> => {
  try {
    const userRepository = await getRepository(User);
    return await userRepository.save(userRepository.create(new User(userInfo)));
  } catch (error) {
    throw new Error("exception while creating user");
  }
};

export const getUserByEmail = async (
  email: string
): Promise<User | undefined> => {
  try {
    return await getRepository(User).findOne({ email });
  } catch (error) {
    throw new Error("exception while creating user");
  }
};

export const getUserById = async (id: string): Promise<User | undefined> => {
  try {
    return await getRepository(User).findOne({ id });
  } catch (error) {
    throw new Error("exception while creating user");
  }
};

export const getAllUsers = async (): Promise<Array<User> | undefined> => {
  try {
    return await getRepository(User).find();
  } catch (error) {
    throw new Error("exception while creating user");
  }
};
