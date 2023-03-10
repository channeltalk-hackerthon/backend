import {Schema, model, connect, ObjectId} from 'mongoose';

interface IWish {
    owner: ObjectId,
    product_name: String,
    product_id: ObjectId,
    description: String,
    price: Number,
    total: Number,
    fundlogs: [ObjectId],
    started_at: Date,
    expire_at: Date,
    type: String,
    status: 'active' | 'inactive' | 'completed',
}

const wishSchema = new Schema<IWish> (
    {
        owner: {type: Schema.Types.ObjectId, ref: 'User', required: true}, 
        product_name: {type: String, required: true},
        product_id: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
        description: {type: String, required: true},
        price: {type: Number, required: true},
        total: {type: Number, required: true},
        fundlogs: [{type: Schema.Types.ObjectId, ref: 'FundLog', required: true}],
        started_at: {type: Date, required: true},
        expire_at: {type: Date, required: true},
        type: {type: String, required: true},
        status: {type: String, enum: ['active', 'inactive', 'completed'], required: true}
    }
)

const Wish = model<IWish>('Wish', wishSchema);

export default Wish;