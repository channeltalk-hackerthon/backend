import { model, ObjectId, Schema } from "mongoose";

interface IUser {
  name: String;
  gender: "male" | "female";
  provider: String;
  snsId: String;
  ageRange: Number;
  wishlist: [ObjectId];
  friendList: [ObjectId];
  fundLogList: [ObjectId];
  recommendation_vector: ObjectId;
  deleted: Boolean;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    provider: { type: String, required: true },
    snsId: { type: String, required: true },
    ageRange: { type: Number, required: true },
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Wish", required: true }],
    friendList: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    fundLogList: [
      { type: Schema.Types.ObjectId, ref: "FundLog", required: true },
    ],
    recommendation_vector: {
      type: Schema.Types.ObjectId,
      ref: "Recommendation",
      required: true,
    },
    deleted: { type: Boolean, required: true },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const User = model<IUser>("User", userSchema);

export default User;
