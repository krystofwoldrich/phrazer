import { gql } from "apollo-server-express";
import { typeDef as User } from "./schema/user";
import { typeDef as Dictionary } from "./schema/dictionary";
import { typeDef as Phrase } from "./schema/phrase";

const Query = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

export default [Query, User, Dictionary, Phrase];
