import { ObjectId } from 'mongoose';
import User from '../../schema/user';

const pushUserwish = (userId: ObjectId, wishId: ObjectId) => {
    return new Promise((res, rej) => {
        User.updateOne({
            _id: userId
        }, {
            $push: {
                wishlist: wishId,
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

export default pushUserwish