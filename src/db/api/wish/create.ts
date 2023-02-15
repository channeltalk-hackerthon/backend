import mongoose, { ObjectId} from "mongoose";
import Wish from "../../schema/wish";

const createWish = (owner: ObjectId, product_name: String, product_id: ObjectId, description: String, currency: String, price: Number, expire_at: Date) => {
    const newwish = new Wish({
        owner: owner,
        product_name: product_name,
        product_id: product_id,
        description: description,
        currency: currency,
        price: price,
        fundlogs: [],
        started_at: new Date(),
        expire_at: expire_at,
        status: 'active',
    })

    return new Promise((res, rej) => {
        newwish
            .save()
            .then((doc) => {
                res(doc);
            })
            .catch((err) => {
                rej(err);
            })
    })
}

export default createWish