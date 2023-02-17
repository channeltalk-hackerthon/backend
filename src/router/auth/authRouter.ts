import express, { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import { destroySession, logOut } from "./logOut";
const authRouter: Router = express.Router();

const redirectHandler = (req: Request, res: Response, next: NextFunction) => {
  const { returnTo: returnToRaw } = req.query;

  let returnTo = "/";
  if (typeof returnToRaw === "string") {
    returnTo = decodeURIComponent(returnToRaw);
  }

  res.cookie("returnTo", returnTo);
  next();
};

authRouter
  .get("/kakao", redirectHandler)
  .get("/kakao", passport.authenticate("kakao"));

authRouter.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/loginFail",
  }),
  (req: Request, res: Response) => {
    const returnTo = req.cookies["returnTo"];
    res.clearCookie("returnTo");
    res.redirect(returnTo);
  }
);

authRouter.get(
  "/kakao/logout",
  (req: Request, res: Response, next: NextFunction) => {
    logOut(req)
      .then(() => {
        return destroySession(req);
      })
      .then(() => {
        res.clearCookie("connect.sid");
        res.redirect("/checkserver");
      })
      .catch((err) => {
        next(err);
      });
  }
);

export default authRouter;
