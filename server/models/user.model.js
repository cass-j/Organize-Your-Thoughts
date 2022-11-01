const mongoose = require("mongoose")

const validateEmail = (email) => {
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    return re.test(email);
}

const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    return re.test(password)
}

const UserSchema = new mongoose.Schema({
    username: { type: String,
        required: [true, "Username is required"], 
        minlength: [3, "Username must be at least 3 characters long."],
        unique: [true, "Username already exists"]},
    email: { type: String,
        required: [true, "Email is required"],
        minlength: [5, "Email must be at least 5 characters long."],
        unique: [true, "Email already exists"],
        trim: true,
        lowercase: true,
        validate: [validateEmail, "Please enter a valid email address"],
    },
    password: { type: String,
        required: [true, "Password is required"], 
        minlength: [6, "Password must be at least 6 characters long."],
        validate: [validatePassword, "Password must contain at least one lowercase letter, one capital letter, one number, and a special character !#$%&'*+/=?^_`{|}~-"]
    },
    thoughts: {type: [String]}
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);