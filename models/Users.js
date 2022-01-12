const { Schema, model } = require('mongoose');
const { isEmail } = require('validator')

//Schema to create User model
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, validate: [isEmail, 'Please enter in a valid email address'] },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'Users' }]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
)

userSchema.virtual('friendCount').get(() => {
  return this.friends.length;
})