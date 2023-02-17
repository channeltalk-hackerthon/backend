import mongoose from 'mongoose';
import Wish from '../../schema/wish';

const findWish = (wishId: mongoose.Types.ObjectId) => {
    return new Promise((res, rej) => {
        Wish
            .findById(wishId)
            .then((wish) => {
                if (wish == null) {rej("Wish not exists")}
                else {res(wish)}
            })
            .catch((err) => rej(err))
    })
}

export default findWish