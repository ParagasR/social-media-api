const { Schema, model } = require('mongoose');

// Schema to create reactions to associate with the Thought model
const reactionSchema = new Schema(
  {
    reactionId: {},
    reactionBody: { type: String, required: true, maxlength: 280 },
    username: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
      // getter function to format the date
      get: (createdAtVal) => {
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
    }
  }
)


// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    createdAt: { type: Date, default: Date.now },
    username: { type: String, required: true },
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

// virtual to get the amount of reactions
thoughtSchema.virtual('reactionCount').get(() => {
  return this.reactions.length;
})

// initialize the Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;