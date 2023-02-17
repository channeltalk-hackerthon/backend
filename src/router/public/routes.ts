import express, { Router } from "express";

import fundLogRouter from "../controller/fundLog";
import productRouter from "../controller/product";
import userRouter from "../controller/user";
import wishRouter from "../controller/wish";

const router: Router = express.Router();

router.use("/wish", wishRouter);
router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/fundLog", fundLogRouter);

export default router;
