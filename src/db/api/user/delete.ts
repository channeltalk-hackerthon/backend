import mongoose from "mongoose";
import User from "../../schema/user";

const deleteUser = (userId: mongoose.Types.ObjectId) => {
  return new Promise((res, rej) => {
    User.updateOne(
      {
        _id: userId,
      },
      { $set: { deleted: true } }
    )
      .then((result) => {
        res(result);
      })
      .catch((err) => {
        rej(err);
      });
  });
};

export default deleteUser;
