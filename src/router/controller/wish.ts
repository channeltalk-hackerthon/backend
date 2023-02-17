import express, { NextFunction, Request, Response, Router } from "express";
import mongoose from "mongoose";
import pushUserwish from "../../db/api/user/pushUserWish";

import createWish from "../../db/api/wish/create";
import deleteWish from "../../db/api/wish/delete";
import findWish from "../../db/api/wish/find";
import readWish from "../../db/api/wish/read";
import updateWish from "../../db/api/wish/update";
import isLoggedIn from "../auth/isLoggedIn";

const wishRouter: Router = express.Router();

wishRouter.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  const wishId = new mongoose.Types.ObjectId(req.params.id);

  findWish(wishId)
    .then((wish) => {
      res.json({ wish: wish });
    })
    .catch((err) => {
      res.status(500).json({ msg: "Error occured", cause: `${err}` });
    });
});

wishRouter.post(
  "/create",
  isLoggedIn,
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?._id) {
      res.status(500).json({ msg: `error occured`, cause: `not logged in` });
      return;
    }
    console.log(req.body);
    console.log(req.user?._id);
    createWish(
      req.user?._id,
      new mongoose.Types.ObjectId(req.body.productId),
      req.body.description,
      req.body.expire_at,
      req.body.type
    )
      .then((wish: any) => {
        console.log("working!");
        if (!req.user?._id) {
          res
            .status(500)
            .json({ msg: `error occured`, cause: `not logged in` });
          return;
        }
        const wishId = wish._id;
        return pushUserwish(req.user?._id, wishId);
      })
      .then(() => {
        res.status(200).json({ msg: "wish created!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: `error occured`, cause: `${err}` });
      });
  }
);

wishRouter.delete(
  "/delete",
  isLoggedIn,
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?._id) {
      res.status(500).json({ msg: `error occured`, cause: `not logged in` });
      return;
    }
    deleteWish(req.user?._id, req.body.wishId)
      .then(() => {
        res.status(200).json({ msg: "wish deleted!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: `error occured`, cause: `${err}` });
      });
  }
);

wishRouter.get(
  "/find",
  isLoggedIn,
  (req: Request, res: Response, next: NextFunction) => {
    findWish(req.body.wishId)
      .then((wish) => {
        res.status(200).json({ wish: wish });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: `error occured`, cause: `${err}` });
      });
  }
);

wishRouter.get(
  "/read",
  isLoggedIn,
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?._id) {
      res.status(500).json({ msg: `error occured`, cause: `not logged in` });
      return;
    }
    readWish(req.user?._id)
      .then((wishlist) => {
        res.status(200).json({ wishlist: wishlist });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: `error occured`, cause: `${err}` });
      });
  }
);

wishRouter.post(
  "/update",
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?._id) {
      res.status(500).json({ msg: `error occured`, cause: `not logged in` });
      return;
    }
    updateWish(
      req.user?._id,
      req.body.wishId,
      req.body.description,
      req.body.expire_at
    )
      .then(() => {
        res.status(200).send("wish deleted!");
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }
);
export default wishRouter;
