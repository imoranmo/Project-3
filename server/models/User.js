const { Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new Schema ({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    userName: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/
    },
    bio: {
      type: String
    },
    rating: {
      type: Number,
      default: 100
    },
    password: {
      type: String,
      required: true
      // ,match: ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$

    },
    instrumentId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Instrument',
      }
    ],
    postId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      }
    ]

  })


// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
  userSchema.methods.checkPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

const User = model("User", userSchema)

module.exports = User;
