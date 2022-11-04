const mongoose = require("mongoose")

const ThoughtSchema = new mongoose.Schema({
    thought: { type: String,
        required: [true, "Thought cannot be empty"], 
        minlength: [1, "Thoughts cannot be empty."]},
    userId: { type: String, 
        required: true
    },
    isMature: { type: Boolean, 
        default: false,
    },
    isPrivate: { type: Boolean,
        default: false
    },
    comments: { type: [{
        userId: { type : String
        },
        comment: { type:String,
        minlength: [1, "Comments cannot be empty."],
        trim: true
    }}, {timestamps:true}]},
}, {timestamps: true})

module.exports = mongoose.model('Thought', ThoughtSchema);