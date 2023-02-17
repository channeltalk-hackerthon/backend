import User from "../../schema/user";
import { createUserRecVec } from "../recommendation_vector/create";

const createUser = (
  name: String,
  provider: String,
  snsId: String,
  ageRange: Number,
  gender: String
) => {
  return new Promise((res, rej) => {
    createUserRecVec(ageRange, gender)
      .then((recvec: any) => {
        const recvecId = recvec._id;
        const newuser = new User({
          name: name,
          gender: gender,
          provider: provider,
          snsId: snsId,
          ageRange: ageRange,
          wishlist: [],
          friendList: [],
          fundLogList: [],
          recommendation_vector: recvecId,
          deleted: false,
        });
        return newuser.save();
      })
      .then((doc) => {
        res(doc);
      })
      .catch((err) => {
        rej(err);
      });
  });
};

export default createUser;
