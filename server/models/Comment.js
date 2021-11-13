const { Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const commentSchema = new Schema ({

    content: {
      type: String,
      required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  })

  const Comment = model('Comment', commentSchema)

module.exports = Comment;
