import {ObjectId} from 'mongoose';
import Wish from '../../schema/wish';

const deleteWish = (wishId: ObjectId) => {
    return new Promise((res, rej) => {
        Wish.deleteOne(
            {
                _id: wishId,
            })
            .then((result) => {
                res(result);
            })
            .catch((err) => {
                rej(err);
            })
    })
}

export default deleteWish;