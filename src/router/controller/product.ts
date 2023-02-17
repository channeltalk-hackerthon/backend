import express, { NextFunction, Request, Response, Router } from "express";

import createProduct from "../../db/api/product/create";

const productRouter: Router = express.Router();

productRouter.post(
  "/create",
  (req: Request, res: Response, next: NextFunction) => {
    createProduct(req.body.product_name, req.body.category, req.body.price)
      .then(() => {
        res.status(200).send("wish deleted!");
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }
);

// productRouter.post(
//   "/delete",
//   (req: Request, res: Response, next: NextFunction) => {
//     deleteUser(req.body.userId)
//       .then(() => {
//         res.status(200).send("wish deleted!");
//       })
//       .catch((err) => {
//         console.log(err);
//         next(err);
//       });
//   }
// );

export default productRouter;
