import { ObjectId } from 'mongoose';
import User from '../../schema/user';

const pushUserFriend = (userId: ObjectId, friendId: ObjectId) => {
    return new Promise((res, rej) => {
        User.updateOne({
            _id: userId
        }, {
            $push: {
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

export default pushUserFriend