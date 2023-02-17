import express, { NextFunction, Request, Response, Router } from "express";

import deleteUser from "../../db/api/user/delete";
import popUserFriend from "../../db/api/user/popUserFriend";
import pushUserFriend from "../../db/api/user/pushUserFriend";
import isLoggedIn from "../auth/isLoggedIn";

const userRouter: Router = express.Router();

userRouter.delete(
  "/delete",
  isLoggedIn,
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?._id) {
      res.status(500).json({ msg: `error occured`, cause: `not logged in` });
      return;
    }
    console.log(req.user?._id);
    deleteUser(req.user?._id)
      .then(() => {
        res.status(200).json({ msg: "user deleted!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: `error occured`, cause: `${err}` });
      });
  }
);

userRouter.delete(
  "/friend/delete",
  isLoggedIn,
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?._id) {
      res.status(500).json({ msg: `error occured`, cause: `not logged in` });
      return;
    }
    popUserFriend(req.user?._id, req.body.friendId)
      .then(() => {
        res.status(200).json({ msg: "friend deleted!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: `error occured`, cause: `${err}` });
      });
  }
);

userRouter.post(
  "/friend/add",
  isLoggedIn,
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?._id) {
      res.status(500).json({ msg: `error occured`, cause: `not logged in` });
      return;
    }
    pushUserFriend(req.user?._id, req.body.friendId)
      .then(() => {
        res.status(200).json({ msg: "friend added!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: `error occured`, cause: `${err}` });
      });
  }
);

export default userRouter;
