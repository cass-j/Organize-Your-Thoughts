const mongoose = require("mongoose")

const ThoughtSchema = new mongoose.Schema({
   title: {
      type: String,
      required: [true, "Title cannot be empty"],
      trim: true,
   },
   thought: {
      type: String,
      required: [true, "Thought cannot be empty"],
      trim: true,
   },
   userId: {
      type: String,
      required: [true, "userId cannot be empty"]
   },
   username: {
      type: String,
      required: [true, "username cannot be empty"]
   },
   // isMature: { type: Boolean, 
   //     default: false,
   // },
   // isPrivate: { type: Boolean,
   //     default: false
   // },
   comments: {
      type: [{
         userId: {
            type: String,
            required: true
         },
         username: {
            type: String,
            required: true
         },
         comment: {
            type: String,
            minlength: [1, "Comment cannot be blank."],
            trim: true
         }
      }, { timestamps: true }]
   },
}, { timestamps: true })

module.exports = mongoose.model('Thought', ThoughtSchema);