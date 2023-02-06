import { DocumentDefinition } from "mongoose";
import UserModel, { UserType } from "../models/user.model";

export async function createUser(input: DocumentDefinition<UserType>) {
  try {
    return await UserModel.create(input);
  } catch (e: any) {
    throw new Error(e);
  }
}