const { Rhythm, Instrument, Post, User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    rhythms: async () => {
      return Rhythm.find();
    },
    instruments: async () => {
      return Instrument.find();
    },
    post:async (parent, {postId}) => {
        return Post.findOne({ _id: postId});
      },
    posts:async () => {
        return Post.find();
      },
    user: async (parent, { userName }) => {
        return User.findOne({ userName });
      },
    users:async () => {
        return User.find();
      }
  },

    Mutation: {
      addUser: async (parent, { firstName, lastName, userName, email, password }) => {
        const user = await User.create({ firstName, lastName, userName, email, password });
        const token = signToken(user);
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('No user found with this email address');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const token = signToken(user);
  
        return { token, user };
      },
    },
  };
  
  module.exports = resolvers;
  