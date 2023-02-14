import {Schema, model, ObjectId} from 'mongoose';

interface IFundLog {
    wishId: ObjectId,
    funder: ObjectId,
    currency: String,
    price: Number,
}

const fundlogSchema = new Schema<IFundLog> (
    {
        wishId: {type: Schema.Types.ObjectId, ref: 'Wish', required: true},
        funder: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        currency: {type: String, required: true},
        price: {type: Number, required: true},
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    }
)

const FundLog = model<IFundLog>('FundLog', fundlogSchema);

export default FundLog;