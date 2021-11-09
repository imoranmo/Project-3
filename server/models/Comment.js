const { Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const commentSchema = new Schema ({

    content: {
      type: String,
      required: true
    },
    date_created: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    user_id: {
      type: String,
      required: true
    }
  })

  const Comment = model('Comment', commentSchema)

module.exports = Comment;
