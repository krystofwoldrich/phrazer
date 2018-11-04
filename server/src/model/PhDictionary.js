import mongoose from "mongoose";
import { Schema } from "mongoose";

import LangEnum from "./utils/LanguageEnum";

export const phDictionarySchema = new Schema({
  name: {
    type: String,
    required: false
  },
  phrases: {
    type: [Schema.Types.ObjectId],
    default: []
  },
  nativeLanguage: {
    type: String,
    enum: Object.values(LangEnum),
    required: true
  },
  foreignLanguage: {
    type: Object.values(LangEnum),
    required: true
  }
});

export default mongoose.model("PhDictionary", phDictionarySchema);
