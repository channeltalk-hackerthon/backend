import {ObjectId} from 'mongoose';
import User from '../../schema/user';
import Wish from '../../schema/wish';
import findUser from '../user/find';

const readWish = (userId: ObjectId) => {
    return new Promise((res, rej) => {
        findUser(userId)
            .then((user: any) => {
                user.populate('wishlist');
                res(user.wishlist);
            })
            .catch((err) => {
                rej(err);
            })
    })
}

export default readWish