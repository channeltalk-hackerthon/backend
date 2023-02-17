import express, { NextFunction, Request, Response, Router } from "express";
import mongoose from "mongoose";
import deleteUser from "../../db/api/user/delete";
import popUserFriend from "../../db/api/user/popUserFriend";
import pushUserFriend from "../../db/api/user/pushUserFriend";
import isLoggedIn from "../auth/isLoggedIn";

const userRouter: Router = express.Router();

userRouter.get(
  "/isloggedin",
  (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      res.json({ isLoggedIn: true });
    } else {
      res.json({ isLoggedIn: false });
    }
  }
);

userRouter.delete(
  "/me",
  isLoggedIn,
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?._id) {
      res.status(500).json({ msg: `error occured`, cause: `not logged in` });
      return;
    }
    const userId = new mongoose.Types.ObjectId(req.user?._id);
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
  "/me/friend",
  isLoggedIn,
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?._id) {
      res.status(500).json({ msg: `error occured`, cause: `not logged in` });
      return;
    }
    const userId = new mongoose.Types.ObjectId(req.user?._id);
    const friendId = new mongoose.Types.ObjectId(req.body.friendId);

    popUserFriend(userId, friendId)
      .then(() => {
        res.status(200).json({ msg: "friend deleted!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: `error occured`, cause: `${err}` });
      });
  }
);

userRouter.put(
  "/me/friend",
  isLoggedIn,
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?._id) {
      res.status(500).json({ msg: `error occured`, cause: `not logged in` });
      return;
    }
    const userId = new mongoose.Types.ObjectId(req.user?._id);
    const friendId = new mongoose.Types.ObjectId(req.body.friendId);
    pushUserFriend(userId, friendId)
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
