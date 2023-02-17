import Product from "../../schema/product";
import mongoose from 'mongoose';

const createProduct = (product_name: String, product_description: String, currency: String, price: Number) => {
    const newproduct = new Product({
        product_name: product_name,
        product_description: product_description,
        currency: currency,
        price: price,
    })

    return new Promise((res, rej) => {
        newproduct
            .save()
            .then((doc) => {
                res(doc);
            })
            .catch((err) => {
                rej(err);
            })
    })
}

export default createProduct;