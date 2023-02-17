import { Types } from "mongoose";
import Product from "../../../db/schema/product";

const readProduct = (productId: Types.ObjectId) => {
  return new Promise((res, rej) => {
    Product.findById(productId)
      .then((doc) => {
        res(doc);
      })
      .catch((err) => {
        rej(err);
      });
  });
};

export default readProduct;
