import {Schema, model, ObjectId} from 'mongoose';

interface IProduct {
    product_name: String,
    product_description: String,
    currency: String,
    price: Number,
}

const productSchema = new Schema<IProduct> (
    {
        product_name: {type: String, required: true},
        product_description: {type: String, required: true},
        currency: {type: String, required: true},
        price: {type: Number, required: true},
    }
)

const Product = model<IProduct>('Product', productSchema);

export default Product;