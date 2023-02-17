import mongoose from "mongoose";
import Wish from "../../schema/wish";
import readProduct from "../product/read";

const createWish = (
  owner: mongoose.Types.ObjectId,
  product_id: mongoose.Types.ObjectId,
  description: String,
  expire_at: Date,
  type: String
) => {
  return new Promise((res, rej) => {
    readProduct(product_id)
      .then((product: any) => {
        const newwish = new Wish({
          owner: owner,
          product_name: product.product_name,
          product_id: product_id,
          description: description,
          price: product.price,
          total: 0,
          fundlogs: [],
          started_at: new Date(),
          expire_at: expire_at,
          type: type,
          status: "active",
        });
        return newwish.save();
      })
      .then((doc) => {
        res(doc);
      })
      .catch((err) => {
        rej(err);
      });
  });
};

export default createWish;
