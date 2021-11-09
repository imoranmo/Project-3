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
    date_created: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    rhythm_id: {
      type: String,
      required: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'users',
          key: 'id'
      }
    },
    comments: [Comment.schema]
  })

  const Post = model('Post', postSchema)

  module.exports = Post
