import {ObjectId} from 'mongoose';
import Wish from '../../schema/wish';

const deleteWish = (owner: ObjectId, wishId: ObjectId) => {
    return new Promise((res, rej) => {
        Wish.deleteOne(
            {
                _id: wishId,
                owner: owner,
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