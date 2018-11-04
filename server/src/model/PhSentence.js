import mongoose from "mongoose";
import { Schema } from "mongoose";

export const phSentenceSchema = new Schema({
  sentence: {
    type: String,
    required: false
  },
  language: {
    type: String,
    required: true
  },
  soundFileUrl: {
    type: String,
    required: false
  }
});

export default mongoose.model("PhSentence", phSentenceSchema);
