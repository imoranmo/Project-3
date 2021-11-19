
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { Rhythm, Instrument, Post, User, Comment } = require('../models');

const resolvers = {
  Query: {
    rhythms: async () => {
      return Rhythm.find();
    },
    instruments: async () => {
      return Instrument.find();
    },
    post:async (parent, {postId}, context) => {
        
      if (!context.user){
        throw new AuthenticationError('You need to be logged in!');
      } else if (postId === "new") {
        return {
          "_id" :null,
          "title" : null,
          "content" : null,
          "date_created" : null,
          "user" : null,
          "rhythm" : null,
          "url" : null,
          "comments" : []
        }
      }
      return Post.findOne({ _id: postId})
          .populate('rhythm')
          .populate({path:"comments", populate:{ path: 'user', model: 'User' }})
          .populate({path:"user"});
      },
    posts:async (parent, {user}) => {
        return Post.find(user ? {user} : {})
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
      updateUser: async (parent, { firstName, lastName, userName, email, bio, img, instruments }, context) => {
        const _id = context.user._id
        const user = await User.findOneAndUpdate({_id},{ firstName, lastName, userName, email, bio, img,  instruments });
        return { user };
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
      addPost: async(parent, args, context) => {
        const user = context.user._id;
        if (!user){
          throw new AuthenticationError('You must ben signed in');
        }

        const post = await Post.create({...args, user});
        return post;
      },
      updatePost: async(parent, {postId, content, url, rhythm, title, user }, context) => {
        const loggedUserId = context.user._id;
        if (!loggedUserId){
          throw new AuthenticationError('You must ben signed in');
        } else if (loggedUserId != user) {
          throw new AuthenticationError(`You can't edit this post`);
        }
        const post = await Post.findOneAndUpdate({_id: postId}, {content, url, rhythm, title});
        return post;
      },
    addComment: async(parent,{postId, content}, context) => {
      const user = context.user._id
      const comId = await Comment.create({content, user})
      let post = await Post.findOne({_id:postId})
      const comments = post.comments
      comments.push(comId._id);
      await Post.findOneAndUpdate({_id:postId}, {comments}).populate('user')
      return comId;
    },
    updateComment: async(parent,{_id, postId}, context) => {
      await Comment.findOneAndUpdate({_id:postId})
    },
    deleteComment: async(parent,{_id}, context) => {
        return await Comment.findOneAndDelete({_id})
    }
  }
  };
  
  module.exports = resolvers;
  