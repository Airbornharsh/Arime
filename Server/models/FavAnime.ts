import { Schema, model } from "mongoose";

const favAnimeSchema = new Schema({
  emailId: {
    type: String,
    required: true,
  },
  animeId: {
    type: String,
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now(),
  },
});

export default model("Anime", favAnimeSchema);
