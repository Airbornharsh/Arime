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
  favs: {
    type: [
      {
        animeId: { type: String },
        addedAt: {
          type: Date,
        },
      },
    ],
    required: true,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
