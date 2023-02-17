import mongoose from "mongoose";
import Wish from "../../schema/wish";

const updateWish = (
  owner: mongoose.Types.ObjectId,
  wishId: mongoose.Types.ObjectId,
  description: String,
  expire_at: Date
) => {
  return new Promise((res, rej) => {
    Wish.updateOne(
      {
        _id: wishId,
        owner: owner,
      },
      {
        $set: {
          description: description,
          expire_at: expire_at,
        },
      }
    )
      .then((doc) => {
        res(doc);
      })
      .catch((err) => {
        rej(err);
      });
  });
};

export default updateWish;
