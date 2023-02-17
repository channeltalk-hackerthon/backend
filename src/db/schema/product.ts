import mongoose, {Schema, model, ObjectId} from 'mongoose';

interface IProduct {
    product_name: String,
    price: Number,
    recommendation_vector: ObjectId
}


const productSchema = new Schema<IProduct> (
    {
        product_name: {type: String, required: true},
        price: {type: Number, required: true},
        recommendation_vector: {type: Schema.Types.ObjectId, ref: 'Recommendation', required: true},
    }
)

const Product = model<IProduct>('Product', productSchema);

export default Product;