import mongoose from 'mongoose';
import User from '../../schema/user';

const popUserWish = (userId: mongoose.Types.ObjectId, wishId: mongoose.Types.ObjectId) => {
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

export default popUserWish

//userwishlist에서 pop을 할 필요가 없음!! (추천 데이터를 위해서)