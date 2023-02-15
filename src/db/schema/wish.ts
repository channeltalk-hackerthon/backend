import {Schema, model, connect, ObjectId} from 'mongoose';

interface IWish {
    owner: ObjectId,
    product_name: String,
    product_id: ObjectId,
    description: String,
    currency: String,
    price: Number,
    fundlogs: [ObjectId],
    started_at: Date,
    expire_at: Date,
    status: 'active' | 'inactive',
}

const wishSchema = new Schema<IWish> (
    {
        owner: {type: Schema.Types.ObjectId, ref: 'User', required: true}, 
        product_name: {type: String, required: true},
        product_id: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
        description: {type: String, required: true},
        currency: {type: String, required: true},
        price: {type: Number, required: true},
        fundlogs: [{type: Schema.Types.ObjectId, ref: 'FundLog', required: true}],
        started_at: {type: Date, required: true},
        expire_at: {type: Date, required: true},
        status: {type: String, enum: ['active', 'inactive'], required: true}
    }
)

const Wish = model<IWish>('Wish', wishSchema);

export default Wish;