import { merge } from "lodash";
import { resolvers as userResolvers } from "./schema/user";
import { resolvers as dictionaryResolvers } from "./schema/dictionary";

const resolvers = {};

export default merge(resolvers, userResolvers, dictionaryResolvers);
