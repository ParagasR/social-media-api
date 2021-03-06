const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');
const Thought = require('./Thought');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, 'Please enter in a valid email address']
    },
    thoughts:
      [
        {
          type: Schema.Types.ObjectId,
          ref: 'thought'
        }
      ],
    friends:
      [
        {
          type: Schema.Types.ObjectId,
          ref: 'user'
        }
      ]
  },
  // turn virtual settings on
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
)

// virtual to keep track how many friends a user has
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
})

// initialize the User model
const User = model('user', userSchema);

module.exports = User;