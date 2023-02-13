import { DocumentDefinition } from "mongoose";
import { omit } from "lodash";

import UserModel, { UserType } from "../models/user.model";

export async function createUser(input: DocumentDefinition<Omit<UserType, "createdAt" | "updatedAt" | "comparePassword">>) { // omiting createdAt & updatedAt because theyre automatically generated so dont need to be passed into this function type
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