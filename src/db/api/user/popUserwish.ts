import mongoose from 'mongoose';
import User from '../../schema/user';

const popUserwish = (userId: mongoose.Types.ObjectId, wishId: mongoose.Types.ObjectId) => {
    return new Promise((res, rej) => {
        User.updateOne({
            _id: userId
        }, {
            $pop: {
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

export default popUserwish