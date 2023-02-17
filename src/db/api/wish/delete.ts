import mongoose, {ObjectId} from 'mongoose';
import Wish from '../../schema/wish';

const deleteWish = (owner: mongoose.Types.ObjectId, wishId: mongoose.Types.ObjectId) => {
    return new Promise((res, rej) => {
        Wish.updateOne(
            {
                _id: wishId,
                owner: owner,
            },
            {
                $set: {
                    status: 'inactive'
                }
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