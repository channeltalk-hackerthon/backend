import {Schema, model, ObjectId} from 'mongoose';

interface IRecommendation {
    recommendation_age: [Number],
    recommendation_gender: [Number],
    recommendation_brand: [Number],
    recommendation_category: [Number],
    recommendation_price: [Number],
}


const recommendationSchema = new Schema<IRecommendation> (
    {
        recommendation_age: {type: [Number], required: true},
        recommendation_gender: {type: [Number], required: true},
        recommendation_brand: {type: [Number], required: true},
        recommendation_category: {type: [Number], required: true},
        recommendation_price: {type: [Number], required: true},
    }
)

const Recommendation = model<IRecommendation>('Recommendation', recommendationSchema);

export default Recommendation;