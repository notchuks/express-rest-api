import { DocumentDefinition, FilterQuery } from "mongoose";
import { omit } from "lodash";

import UserModel, { UserDocument, UserInput } from "../models/user.model";

export async function createUser(input: DocumentDefinition<UserInput>) { // Used "Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">" because createdAt & updatedAt are automatically generated so dont need to be passed into this function type
  try {
    const user =  await UserModel.create(input);
    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function validatePassword({ email, password, }: { email: string; password: string; }): Promise<any> {
  const user = await UserModel.findOne({ email });

  if(!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if(!isValid) return false;

  return omit(user.toJSON(), "password");
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return await UserModel.findOne(query).lean();
}