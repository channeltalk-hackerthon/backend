import createProduct from "./create";
import mockProduct from "./mockData";

const createCollection = () => {
  return createProduct("dummy", 1, 10000);
};

const dropProductCollection = () => {
  return new Promise((res, rej) => {
    res(void 0);
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
