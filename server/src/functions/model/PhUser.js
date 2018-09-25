import mongoose from "mongoose";
import { Schema } from "mongoose";

const phUserSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

export default mongoose.model("PhUser", phUserSchema);
