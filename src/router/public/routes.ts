import express, { Router, Request, Response, NextFunction } from "express";

import wishRouter from "../controller/wish";
import userRouter from "../controller/user";
import productRouter from "../controller/product";
import fundLogRouter from "../controller/fundLog";

const router: Router = express.Router();

router.use("/wish", wishRouter);
router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("fundLog", fundLogRouter);

export default router;
