import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  emailId: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
