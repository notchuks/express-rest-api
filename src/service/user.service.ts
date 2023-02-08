import { DocumentDefinition } from "mongoose";
import UserModel, { UserType } from "../models/user.model";

export async function createUser(input: DocumentDefinition<Omit<UserType, "createdAt" | "updatedAt" | "comparePassword">>) { // omiting createdAt & updatedAt because theyre automatically generated so dont need to be passed into this function type
  try {
    return await UserModel.create(input);
  } catch (e: any) {
    throw new Error(e);
  }
}