const { Schema, model, Types } = require('mongoose');

// Schema to create reactions to associate with the Thought model
const reactionSchema = new Schema(
  {
    reactionId: { type: Schema.ObjectId, default: () => new Types.ObjectId },
    reactionBody: { type: String, required: true, maxlength: 280 },
    username: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
      // getter function to format the date
      get: formatDate
    }
  }
)

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  // turn virtual settins on
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
)

function formatDate(createdAtVal) {
  const d = new Date(createdAtVal);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate;
  const year = d.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  };
  if (day.length < 2) {
    day = '0' + day;
  };

  return [month, day, year].join('-');
}

// virtual to get the amount of reactions
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
})

// initialize the Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;