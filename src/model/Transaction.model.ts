import mongoose, { Schema, Document } from "mongoose";

enum Status {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface Transaction extends Document {
  amount: number;
  status: Status;
  createdBy: string;
  description: string;
  createdAt: Date;
}

// Transaction Schema
const TransactionSchema: Schema = new Schema({
  amount: { type: Number, required: true },
  status: {
    type: String,
    enum: Object.values(Status),
    required: true,
    default: Status.PENDING,
  },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Transaction =
  (mongoose.models.Transaction as mongoose.Model<Transaction>) ||
  mongoose.model<Transaction>("Transaction", TransactionSchema);

export default Transaction;
