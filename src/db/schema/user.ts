import {Schema, model, Types} from 'mongoose';

interface IUser {
    name: String,
    provider: String,
    snsId: String,
    wishlist: [Types.ObjectId],
    friendList: [Types.ObjectId],
}

const userSchema = new Schema<IUser> (
    {
        name: {type: String, required: true},
        provider: {type: String, required: true},
        snsId: {type: String, required: true},
        wishlist: [{type: Schema.Types.ObjectId, ref: 'Wish', required: true}],
        friendList: [{type: Schema.Types.ObjectId, ref: 'User', required: true}]
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    }
)

const User = model<IUser>('User', userSchema);

export default User;