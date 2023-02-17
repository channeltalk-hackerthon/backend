import { ObjectId } from 'mongoose';
import User from '../../schema/user';

const popUserFriend = (userId: ObjectId, friendId: ObjectId) => {
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