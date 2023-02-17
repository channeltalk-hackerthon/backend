import { model, ObjectId, Schema } from "mongoose";

interface IFundLog {
  wishId: ObjectId;
  funder: ObjectId;
  price: Number;
  deleted: Boolean;
}

const fundlogSchema = new Schema<IFundLog>(
  {
    wishId: { type: Schema.Types.ObjectId, ref: "Wish", required: true },
    funder: { type: Schema.Types.ObjectId, ref: "User", required: true },
    price: { type: Number, required: true },
    deleted: { type: Boolean, required: true },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const FundLog = model<IFundLog>("FundLog", fundlogSchema);

export default FundLog;
