import { model, Schema } from "mongoose";

interface IRecommendation {
  recommendation_age: [Number]; //length: 12
  recommendation_gender: [Number]; //length: 2
  recommendation_category: [Number]; // length: 2076
  recommendation_price: [Number]; // length: 8
}

const recommendationSchema = new Schema<IRecommendation>({
  recommendation_age: { type: [Number], required: true },
  recommendation_gender: { type: [Number], required: true },
  recommendation_category: { type: [Number], required: true },
  recommendation_price: { type: [Number], required: true },
});

const Recommendation = model<IRecommendation>(
  "Recommendation",
  recommendationSchema
);

export default Recommendation;
