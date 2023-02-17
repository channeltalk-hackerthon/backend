import mongoose from 'mongoose';
import User from '../../schema/user';

const deleteUser = (userId: mongoose.Types.ObjectId) => {
    return new Promise((res, rej) => {
        User.deleteOne(
            {
                _id: userId,
            }
        )
            .then((result) => {
                res(result);
            })
            .catch((err) => {
                rej(err);
            })
    })
}

export default deleteUser;