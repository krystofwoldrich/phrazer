import mongoose from "mongoose";
import { Schema } from "mongoose";
import { phUserSchema } from "./PhUser";
import { phCategorySchema } from "./PhCategory";
import { phSentenceSchema } from "./PhSentence";

export const phPhraseSchema = new Schema({
  nativeSentence: {
    type: phSentenceSchema,
    required: true
  },
  foreignSentence: {
    type: phSentenceSchema,
    required: false
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true
  },
  category: {
    type: [Schema.Types.ObjectId],
    default: []
  }
});

export default mongoose.model("PhPhrase", phPhraseSchema);
