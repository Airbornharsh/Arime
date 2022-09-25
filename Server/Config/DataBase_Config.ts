import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const DB_URI = process.env.DB_URI;

const DbConnect = async () => {
  try {
    const connect = await mongoose.connect(DB_URI);
    console.log("DB Connected");

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

    const user = mongoose.models.User || mongoose.model("User", userSchema);

    return { connect, user };
  } catch (e) {
    console.log(e);
  }
};

export default DbConnect;
