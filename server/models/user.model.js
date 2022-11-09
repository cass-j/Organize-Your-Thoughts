const mongoose = require("mongoose")
const Thought = require("./thought.model")


const validateEmail = (email) => {
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    return re.test(email);
}

const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    return re.test(password)
}

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        minlength: [3, "Username must be at least 3 characters long."],
        unique: ["Username already exists", true]
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        minlength: [5, "Email must be at least 5 characters long."],
        unique: [true, "Email already exists"],
        trim: true,
        lowercase: true,
        validate: [validateEmail, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long."],
        // validate: [validatePassword, "Password must contain: a lowercase, a capital letter, a number, a special character !#$%&'*+/=?^_`{|}~-"]
    },
    token: {
        type: String,
    },
    thoughts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thought"
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema, 'users');