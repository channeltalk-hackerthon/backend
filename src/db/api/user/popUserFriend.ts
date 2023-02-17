import mongoose from 'mongoose';
import User from '../../schema/user';

const popUserFriend = (userId: mongoose.Types.ObjectId, friendId: mongoose.Types.ObjectId) => {
    return new Promise((res, rej) => {
        User.updateOne({
            _id: userId
        }, {
            $pop: {
                friendList: friendId,
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

export default popUserFriend