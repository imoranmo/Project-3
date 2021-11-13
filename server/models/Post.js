const { Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');
const dateFormat = require('../utils/dateFormat');

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
    rhythm: {
      type: Schema.Types.ObjectId,
      ref: 'Rhythm',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    comments: [{
                  type: Schema.Types.ObjectId,
                  ref: 'Comment',
              }]
  })

  const Post = model('Post', postSchema)

  module.exports = Post
