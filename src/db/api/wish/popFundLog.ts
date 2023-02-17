import mongoose from 'mongoose';
import Wish from '../../schema/wish';

const popFundLog = (userId: mongoose.Types.ObjectId, fundLogId: mongoose.Types.ObjectId) => {
    return new Promise((res, rej) => {
        Wish.updateOne({
            _id: userId,
        }, {
            $pop: {
                fundlogs: fundLogId,
            }
        })
        .then((doc) => {
            res(doc);
        })
        .catch((err) => {
            rej(err)
        })
    })
}

export default popFundLog;