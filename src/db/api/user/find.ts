import { ObjectId } from 'mongoose';
import User from '../../schema/user';

const findUser = (userId: ObjectId) => {
    return new Promise((res, rej) => {
        User
            .findOne({_id: userId})
            .then((user) => {
                if (user == null) {
                    rej("User not exists");
                }
                res(user)
            })
            .catch((err) => rej(err))
    })
}

export default findUser;