import {Schema, model, connect, ObjectId} from 'mongoose';

interface IWish {
    product_name: String,
    product_id: ObjectId,
    description: String,
    currency: String,
    price: Number,
    funded_amount: Number,
    started_at: Date,
    expire_at: Date,
    status: 'active' | 'inactive',
}

const wishSchema = new Schema<IWish> (
    {
        product_name: {type: String, required: true},
        product_id: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
        description: {type: String, required: true},
        currency: {type: String, required: true},
        price: {type: Number, required: true},
        funded_amount: {type: Number, required: true},
        started_at: {type: Date, required: true},
        expire_at: {type: Date, required: true},
        status: {type: String, enum: ['active', 'inactive'], required: true}
    }
)

const Wish = model<IWish>('Wish', wishSchema);

export default Wish;