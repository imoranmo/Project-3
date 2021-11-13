const { Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');
const Comment = require('./Comment');

const postSchema = new Schema({

    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    url: {
      type: String,
    },
    dateCreated: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    rhythms: {
      type: Schema.Types.ObjectId,
      ref: 'Rhythm',
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    comments: [Comment.schema]
  })

  const Post = model('Post', postSchema)

  module.exports = Post
