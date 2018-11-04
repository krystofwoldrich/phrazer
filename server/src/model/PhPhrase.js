import mongoose from "mongoose";
import { Schema } from "mongoose";
import { phSentenceSchema } from "./PhSentence";

export const phPhraseSchema = new Schema({
  native: {
    type: phSentenceSchema,
    required: true
  },
  foreign: {
    type: phSentenceSchema,
    required: false
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  categories: {
    type: [Schema.Types.ObjectId],
    default: []
  }
});

export default mongoose.model("PhPhrase", phPhraseSchema);
