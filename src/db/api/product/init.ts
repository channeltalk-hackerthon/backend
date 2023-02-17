import createProduct from "./create";
import mockProduct from "./mockData";
import mongoose from "mongoose";

const createCollection = () => {
  return createProduct("dummy", 1, 10000);
};

const dropProductCollection = () => {
  const conn = mongoose.createConnection(`${process.env.MONGO_URL}`);
  return new Promise((res, rej) => {
    conn
      .dropCollection("products")
      .then(() => {
        console.log("🤖 Reset Product DB Collection 🤖");
        res(void 0);
      })
      .catch((err) => {
        console.log("👾 Failed to Reset Product 👾");
        rej(err);
      });
  });
};

const initProductDB = () => {
  return new Promise((res, rej) => {
    createCollection()
      .then(() => {
        return dropProductCollection();
      })
      .then(() => {
        const saveMockPromises = mockProduct.map((product) => {
          return createProduct(
            product.product_name,
            product.category,
            product.price
          );
        });
        return Promise.all(saveMockPromises);
      })
      .then(() => {
        res(void 0);
      })
      .catch((err) => {
        rej(err);
      });
  });
};

export default initProductDB;
