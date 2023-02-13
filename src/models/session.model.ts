import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import { UserType } from "./user.model";

// He used UserDocument in tutorial.
export interface SessionType extends mongoose.Document {
  user: UserType["_id"];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
);

const SessionModel = mongoose.model<SessionType>("Session", sessionSchema);

export default SessionModel;