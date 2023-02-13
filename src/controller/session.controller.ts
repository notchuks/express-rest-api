import { Request, Response } from "express";
import config from "config";

import { signJwt } from "../utils/jwt.utils";
import { createSession } from "../service/session.service";
import { validatePassword } from "../service/user.service"

export async function createUserSessionHandler(req: Request, res: Response) {

  // Validate the user's password
  const user = await validatePassword(req.body);

  if(!user) {
    res.status(401).send("Invalid user credentials");
  }

  // Create a session
  const session = await createSession(user._id, req.get("user-agent") || "");

  // Create an accessToken
  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") }
  );

  // Create a refreshToken

  // Return access & refresh tokens
}