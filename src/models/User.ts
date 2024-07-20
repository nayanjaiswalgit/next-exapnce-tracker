import mongoose, { Document, Schema } from "mongoose";

const userSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Please Provide a username"],
    unique: true,
    lowercase: true,
    trim: true,

  },

  email: {
    type: String,
    required: [true, "Please Provide a email"],
    unique: true,
    match: [/.+\@.+\..+/, "Please provide a valid email"]
  },

  password: {
    type: String,
    required: [true, "Please Provide a password"],
  },

  isVerified: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});


export interface User extends Document {
  username:  String,
  email: String,
  password: String,
  isVerified: Boolean,
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
}

const UserModal = (mongoose.models.User as mongoose.Model<User>)  || mongoose.model<User>("User", userSchema);
export default UserModal;