import mongoose, { Schema } from "mongoose";

// User Schema
const AccountSchema: Schema = new Schema({
  provider: { type: String, required: true },
  type: { type: String, required: true },
  providerAccountId: { type: String, required: true },
  access_token: { type: String, required: true },
  token_type: { type: String, required: true },
  scope: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const Account =
  mongoose.models.Account || mongoose.model("Account", AccountSchema);

export default Account;
