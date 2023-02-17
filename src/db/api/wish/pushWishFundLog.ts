import mongoose from "mongoose";
import Wish from "../../schema/wish";

const pushWishFundLog = (
  userId: mongoose.Types.ObjectId,
  fundLogId: mongoose.Types.ObjectId
) => {
  return new Promise((res, rej) => {
    Wish.updateOne(
      {
        _id: userId,
      },
      {
        $push: {
          fundlogs: fundLogId,
        },
      }
    )
      .then((doc) => {
        res(fundLogId);
      })
      .catch((err) => {
        rej(err);
      });
  });
};

export default pushWishFundLog;
