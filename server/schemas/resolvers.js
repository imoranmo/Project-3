
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { Rhythm, Instrument, Post, User } = require('../models');

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
        return Post.find()
          .populate('rhythm')
          .populate({path:"comments", populate:{ path: 'user', model: 'User' }})
          .populate({path:"user"})
          ;
      },
    user: async (parent, { _id, userName }) => {
        return User.findOne(_id ? {_id}:{ userName }).populate('instruments');
      },
    users:async () => {
        return User.find();
      },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
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
  
        const correctPw = await user.checkPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const token = signToken(user);
  
        return { token, user };
      },
    },
  };
  
  module.exports = resolvers;
  