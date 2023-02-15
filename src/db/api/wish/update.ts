import { ObjectId } from 'mongoose';
import Wish from '../../schema/wish';

const updateWish = (wishId: ObjectId, product_name: String,  description: String, expire_at: Date, status: String) => {
    return new Promise((res, rej) => {
        Wish.updateOne(
            {
                _id: wishId
            },
            {
                $set: {
                    product_name: product_name,
                    description: description,
                    expire_at: expire_at,
                    status: status,
                }
            })
            .then((doc) => {
                res(doc);
            })
            .catch((err) => {
                rej(err);
            })
    })
    
}

export default updateWish;