import express, { NextFunction, Request, Response, Router } from "express";

import createWish from "../../db/api/wish/create";
import deleteWish from "../../db/api/wish/delete";
import findWish from "../../db/api/wish/find";
import popFundLog from "../../db/api/wish/popFundLog";
import pushFundLog from "../../db/api/wish/pushFundLog";
import readWish from "../../db/api/wish/read";
import updateWish from "../../db/api/wish/update";
import isLoggedIn from "../auth/isLoggedIn";

const wishRouter: Router = express.Router();

wishRouter.post(
  "/create",
  isLoggedIn,
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?._id) {
      res.status(500).json({ msg: `error occured`, cause: `not logged in` });
      return;
    }
    createWish(
      req.user?._id,
      req.body.product_name,
      req.body.product_id,
      req.body.description,
      req.body.price,
      req.body.expire_at,
      req.body.type
    )
      .then(() => {
        res.status(200).send("wish created!");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: `error occured`, cause: `${err}` });
      });
  }
);

wishRouter.post(
  "/delete",
  (req: Request, res: Response, next: NextFunction) => {
    deleteWish(req.body.owner, req.body.wishId)
      .then(() => {
        res.status(200).send("wish deleted!");
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }
);

wishRouter.get("/find", (req: Request, res: Response, next: NextFunction) => {
  findWish(req.body.wishId)
    .then(() => {
      res.status(200).send("wish found!");
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

wishRouter.post(
  "/popFundLog",
  (req: Request, res: Response, next: NextFunction) => {
    popFundLog(req.body.userId, req.body.fundLogId)
      .then(() => {
        res.status(200).send("wish deleted!");
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }
);

wishRouter.post(
  "/pushFundLog",
  (req: Request, res: Response, next: NextFunction) => {
    pushFundLog(req.body.userId, req.body.fundLogId)
      .then(() => {
        res.status(200).send("wish deleted!");
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }
);

wishRouter.get("/read", (req: Request, res: Response, next: NextFunction) => {
  readWish(req.body.owner)
    .then(() => {
      res.status(200).send("wish deleted!");
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

wishRouter.post(
  "/update",
  (req: Request, res: Response, next: NextFunction) => {
    updateWish(
      req.body.owner,
      req.body.wishId,
      req.body.product_name,
      req.body.description,
      req.body.expire_at,
      req.body.status
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
