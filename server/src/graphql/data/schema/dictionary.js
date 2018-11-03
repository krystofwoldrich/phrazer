import { gql } from "apollo-server-express";
import User from "./../../../model/PhUser";
import Dictionary from "./../../../model/PhDictionary";

export const typeDef = gql`
  type Dictionary {
    id: String!
    name: String
    phrases: [String]
    nativeLanguage: String!
    foreignLanguage: String!
  }
  extend type Query {
    getDictionaries: [Dictionary]
  }
  extend type Mutation {
    createDictionary(
      name: String
      userId: String!
      nativeLanguage: String!
      foreignLanguage: String!
    ): Dictionary
    updateDictionary(id: ID!, name: String, phrases: [String]): Dictionary
    deleteDictionary(id: ID!): Dictionary
  }
`;

export const resolvers = {
  Mutation: {
    createDictionary: async (obj, args, context, info) => {
      const newDic = new Dictionary(args);

      const user = await User.findById(args.userId)
        .exec()
        .then(user => user)
        .catch(err => console.log(err));

      user.dictionaries.push(newDic);

      user.save();

      return newDic;
    },
    updateDictionary: (obj, args, context, info) => {
      return null;
    },
    deleteDictionary: (obj, args, context, info) => {
      return null;
    }
  }
};
