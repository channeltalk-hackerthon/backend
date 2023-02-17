import mongoose from "mongoose";
import User from "../../schema/user";
import findUser from "../user/find";

const readWish = (owner: mongoose.Types.ObjectId) => {
  return new Promise((res, rej) => {
    findUser(owner)
      .then((user: any) => {
        const userId = user._id;
        return User.findById(userId).populate("wishlist");
      })
      .then((user: any) => {
        res(user.wishlist);
      })
      .catch((err) => {
        rej(err);
      });
  });
};

export default readWish;
