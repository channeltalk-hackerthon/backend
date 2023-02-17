import Recommendation from "db/schema/recommendation_vector";
import mongoose from "mongoose";

const updateUserRecVec = (
  userRecVec: mongoose.Types.ObjectId,
  productRecVec: mongoose.Types.ObjectId,
  like: Boolean,
  learning_rate: Number
) => {
  Recommendation.findById(productRecVec).then((doc) => {
    const product_category = doc?.recommendation_category;
    const product_price = doc?.recommendation_price;
  });
};
