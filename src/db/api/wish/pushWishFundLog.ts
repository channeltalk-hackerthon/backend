import mongoose from "mongoose";
import Wish from "../../schema/wish";

const pushWishFundLog = (
  userId: mongoose.Types.ObjectId,
  fundLogId: mongoose.Types.ObjectId,
  price: Number
) => {
  return new Promise((res, rej) => {
    Wish.updateOne(
      {
        owner: userId,
      },
      {
        $push: {
          fundlogs: fundLogId,
        },
      }
    )
      .then(() => {
        return Wish.updateOne(
          { owner: userId },
          {
            $inc: {
              total: price,
            },
          }
        );
      })
      .then(() => {
        res(fundLogId);
      })
      .catch((err) => {
        rej(err);
      });
  });
};

export default pushWishFundLog;
