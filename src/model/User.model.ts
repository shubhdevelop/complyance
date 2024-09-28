import mongoose, { Schema, Document } from "mongoose";

enum Role {
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE",
  MANAGER = "MANAGER",
}

interface User extends Document {
  email: string;
  fullname: string;
  role: Role;
  transactions: string;
  createdAt: Date;
  image: string;
  incompleteUserDetails: boolean;
}

// User Schema
const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  fullname: { type: String, required: true },
  role: { type: String, enum: Role, required: true },
  transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }],
  createdAt: { type: Date, default: Date.now },
  image: { type: String, required: false },
  incompleteUserDetails: { type: Boolean, required: true, default: true },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
