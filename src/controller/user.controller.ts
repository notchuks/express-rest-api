import { Request, Response } from "express";
import logger from "../utils/logger";

import UserModel from "../models/user.model";
import { createUser } from "../service/user.service";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}