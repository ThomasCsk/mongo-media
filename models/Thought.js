const {Schema, model, Types} = require('mongoose');

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: 'Reaction text is required',
      validate: [({ length }) => length <= 280, 'Please keep the text between 1 and 280 characters long']
    },
    username: {
      type: String,
      required: 'Username is required'
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => {
        return (createdAtVal.getMonth()+1) + '/' + createdAtVal.getDate() + '/' + createdAtVal.getFullYear() 
        + ' at ' + createdAtVal.getHours() + ':' + createdAtVal.getMinutes() + ':' + createdAtVal.getSeconds();
      }
    }
  }
)

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'Thought text is required',
      validate: [({ length }) => length <= 280, 'Please keep the text between 1 and 280 characters long']
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => {
        return (createdAtVal.getMonth()+1) + '/' + createdAtVal.getDate() + '/' + createdAtVal.getFullYear() 
        + ' at ' + createdAtVal.getHours() + ':' + createdAtVal.getMinutes();
      }
    },
    username: {
        type: String,
        required: 'Username is required'
    },
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

ThoughtSchema.virtual('reactionCount').get(function(){
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;