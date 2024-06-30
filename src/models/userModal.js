import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Provide a username"],
    undefined: true,
  },

  email: {
    type: String,
    required: [true, "Please Provide a email"],
    undefined: true,
  },

  password: {
    type: String,
    required: [true, "Please Provide a password"],
    undefined: true,
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

const User = mongoose.models.user || mongoose.model("user", userSchema);
export default User;