import createOneHot from "../../../utils/createOneHot";
import createOnes from "../../../utils/createOnes";
import Recommendation from "../../schema/recommendation_vector";

const createUserRecVec = (ageRange: Number, gender: String) => {
  let genderId = 0;
  if (gender == "male") {
    genderId = 0;
  } else {
    genderId = 1;
  }
  const newRecVec = new Recommendation({
    recommendation_age: createOneHot(ageRange, 12),
    recommendation_gender: createOneHot(genderId, 2),
    recommendation_category: createOnes(2076),
    recommendation_price: createOnes(8),
  });
  return new Promise((res, rej) => {
    newRecVec
      .save()
      .then((doc) => {
        res(doc);
      })
      .catch((err) => {
        rej(err);
      });
  });
};

const createProductRecVec = (category: Number, price: Number) => {
  const newRecVec = new Recommendation({
    recommendation_age: createOnes(12),
    recommendation_gender: createOnes(2),
    recommendation_category: createOneHot(category, 2076),
    recommendation_price: createOneHot(price, 8),
  });

  return new Promise((res, rej) => {
    newRecVec
      .save()
      .then((doc) => {
        res(doc);
      })
      .catch((err) => {
        rej(err);
      });
  });
};

export { createUserRecVec, createProductRecVec };
