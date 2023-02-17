import mongoose, { ObjectId} from "mongoose";
import Wish from "../../schema/wish";

const createWish = (owner: mongoose.Types.ObjectId, product_name: String, product_id: mongoose.Types.ObjectId, description: String, price: Number, expire_at: Date, type: String) => {
    const newwish = new Wish({
        owner: owner,
        product_name: product_name,
        product_id: product_id,
        description: description,
        price: price,
        total: 0,
        fundlogs: [],
        started_at: new Date(),
        expire_at: expire_at,
        type: type,
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