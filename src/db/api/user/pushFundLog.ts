import mongoose from "mongoose";
import User from "../../../db/schema/user";

const pushUserFundLog = (
  funderId: mongoose.Types.ObjectId,
  fundlogId: mongoose.Types.ObjectId
) => {
  return new Promise((res, rej) => {
    User.updateOne(
      {
        _id: funderId,
      },
      {
        $push: { fundLogList: fundlogId },
      }
    )
      .then((result) => {
        res(result);
      })
      .catch((err) => {
        rej(err);
      });
  });
};

export default pushUserFundLog;
