import Product from "../../schema/product";
import mongoose from 'mongoose';
import Recommendation_vector from "../../schema/recommendation_vector";


const createProduct = (product_name: String, category: Number, price: Number) => {
    const newproduct = new Product({
        product_name: product_name,
        category: category,
        price: price,
        recommendation_vector: new Recommendation_vector({
            recommendation_age: [1,1,1,1,1,1,1,1,1,1,1],
            recommendation_gender: [1],
            recommendation_category: [],
            recommendation_price: []
        })

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