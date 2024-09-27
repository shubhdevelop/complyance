import mongoose, { Schema, Document } from "mongoose";

enum Role {
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE",
  MANAGER = "MANAGER",
}

export interface User extends Document {
  username: string;
  fullname: string;
  role: Role;
  transactions: string;
  createdAt: Date;
}

// User Schema
const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  fullname: { type: String, required: true },
  role: { type: String, enum: Object.values(Role), required: true },
  transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }],
  createdAt: { type: Date, default: Date.now },
});

const userModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default userModel;
