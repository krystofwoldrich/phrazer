import { merge } from "lodash";
import { resolvers as userResolvers } from "./schema/user";
import { resolvers as dictionaryResolvers } from "./schema/dictionary";
import { resolvers as phraseResolvers } from "./schema/phrase";

const resolvers = {};

export default merge(
  resolvers,
  userResolvers,
  dictionaryResolvers,
  phraseResolvers
);
