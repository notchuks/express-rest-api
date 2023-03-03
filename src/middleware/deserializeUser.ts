import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  // get is used to help us safely request a property that we dont know if it exists or not.
  const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");
  // console.log(accessToken);

  // const refreshToken = get(req, "headers.x-refresh", "");
  // Helper function to circumvent string | string [] type error. Doesn't check for undefined. use an if block later if error shows up(for undefined).
  const getHeader = () => Array.isArray(req.headers['x-refresh']) ? req.headers['x-refresh'][0] : req.headers['x-refresh'];
  const refreshToken = getHeader();
  // console.log(refreshToken);

  if(!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken);
  // console.log(expired);
  // console.log("decoded: ", decoded);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if(expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });
    // console.log("New Access Token: ", newAccessToken);

    if(newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
    }

    const result = verifyJwt(newAccessToken as string); // as string

    res.locals.user = result.decoded;
    
    return next();
  }

  return next();
}

export default deserializeUser;