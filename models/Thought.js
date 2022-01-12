const { Schema, model } = require('mongoose');
const reactions = require('./Reaction');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    createdAt: { type: Date, default: Date.now },
    username: { type: String, required: true },
    reactions: [reactions]
  },
  // turn virtual settins on
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
)

// virtual to get the amount of reactions
thoughtSchema.virtual('reactionCount').get(() => {
  return this.reactions.length;
})

// initialize the Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;