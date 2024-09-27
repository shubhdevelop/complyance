import mongoose, { Schema, Document } from "mongoose";

enum ActionType {
  SUBMIT = "SUBMIT",
  APPROVE = "APPROVE",
  DELETE = "DELETE",
  REJECT = "REJECT",
}

enum Role {
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE",
  MANAGER = "MANAGER",
}

export interface Log extends Document {
  createdAt: Date;
  createdBy: string;
  content: string;
  withRole: Role;
  type: ActionType;
}

// Log Schema
const LogSchema: Schema = new Schema({
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
  withRole: { type: String, enum: Object.values(Role), required: true },
  type: { type: String, enum: Object.values(ActionType), required: true },
});

const Log =
  (mongoose.models.Log as mongoose.Model<Log>) ||
  mongoose.model<Log>("User", LogSchema);

export default Log;
