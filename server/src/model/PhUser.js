import mongoose from "mongoose";
import { Schema } from "mongoose";
import { phDictionarySchema } from "./PhDictionary";

export const phUserSchema = new Schema({
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
  },
  dictionaries: {
    type: [phDictionarySchema],
    default: []
  }
});

export default mongoose.model("PhUser", phUserSchema);
