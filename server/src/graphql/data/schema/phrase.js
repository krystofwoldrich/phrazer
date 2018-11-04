import { gql } from "apollo-server-express";
import Phrase from "./../../../model/PhPhrase";
import Sentence from "./../../../model/PhSentence";

export const typeDef = gql`
  input SentenceInput {
    sentence: String
    language: String!
  }
  type Sentence {
    id: ID!
    sentence: String
    language: String!
    soundUrl: String
  }
  type Phrase {
    id: ID!
    native: Sentence!
    foreign: Sentence!
    userId: String!
    categories: [String]
  }
  extend type Query {
    getPhrases: [Phrase]
  }
  extend type Mutation {
    createPhrase(
      native: SentenceInput!
      foreign: SentenceInput
      userId: String!
      dictionaryId: String!
      categoryId: [String]!
    ): Phrase
    updatePhrase(
      id: ID!
      nativeSentence: String
      foreignSentence: String
      categoryId: [String]!
    ): Phrase
    deletePhrase(id: ID!): Phrase
  }
`;

export const resolvers = {
  Query: {
    getPhrases: () => {
      let result = Phrase.find({})
        .exec()
        .then(r => r)
        .catch(e => console.log(e));

      return result;
    }
  },
  Mutation: {
    createPhrase: async (obj, args, context, info) => {
      const newNative = new Sentence(args.native);
      const newForeign = args.foreign ? new Sentence(args.foreign) : null;
      const newPhrase = new Phrase({
        native: newNative,
        foreign: newForeign,
        userId: args.userId,
        categories: args.categoryId
      });

      newPhrase.save();

      return newPhrase;
    },
    updatePhrase: async (obj, args, context, info) => {
      //   const user = await User.findOne({
      //     "dictionaries._id": args.id
      //   });
      //   const dictionary = user.dictionaries.id(args.id);

      //   dictionary.set(args);
      //   user.save();

      return null;
    },
    deletePhrase: async (obj, args, context, info) => {
      //   const user = await User.findOne({
      //     "dictionaries._id": args.id
      //   });
      //   const dictionary = user.dictionaries.id(args.id);

      //   dictionary.remove();
      //   user.save();

      return null;
    }
  }
};
