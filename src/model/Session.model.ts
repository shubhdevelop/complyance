import mongoose, { Schema } from "mongoose";

// User Schema
const SessionSchema: Schema = new Schema({
  sessionToken: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  expires: { type: Date, required: true },
});

const Session =
  mongoose.models.Session || mongoose.model("Session", SessionSchema);

export default Session;
