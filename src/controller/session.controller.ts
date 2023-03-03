import { Request, Response } from "express";
import config from "config";

import { signJwt } from "../utils/jwt.utils";
import { createSession, findSessions, updateSession } from "../service/session.service";
import { validatePassword } from "../service/user.service"

export async function createUserSessionHandler(req: Request, res: Response) {

  // Validate the user's password
  const user = await validatePassword(req.body);

  if(!user) {
    return res.status(401).send("Invalid user credentials");
  }

  // Create a session
  const session = await createSession(user._id, req.get("user-agent") || "");

  // Create an accessToken
  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") }
  );

  // Create a refreshToken
  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("refreshTokenTtl") }
  );

  // Return access & refresh tokens
  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  // user in res.locals is gotten when we deserialize the user object from our accessToken, which we derived when creating a session by signing our user object + our session id. Refer jwt.utils
  const userId = res.locals.user._id;
  // console.log("userId: ", userId);

  const sessions = await findSessions({ user: userId, valid: true });
  // console.log("sessions: ", { sessions });

  return res.send(sessions);
}

export async function deleteUserSessionHandler(req: Request, res: Response) {
  // We assign the decoded object to res.locals.user in deserializeUser(a middleware for all routes). refer above + jwt.utils + deserializeUser for more info.
  const sessionId = res.locals.user.session;

  // set session validity to false instead of deleting it
  await updateSession({ _id: sessionId }, { valid: false });

  // After the above is implemented, the user can still get sessions with that accessToken when using postman because the accessToken is still in the request header in our postman environment variables. But with the response below when using a client, we can set the accessToken to null in subsequent get requests, so that a 403 forbidden error can be returned instead of the user.
  return res.send({
    accessToken: null, 
    refreshToken: null,
  });

}