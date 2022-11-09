const User = require("../models/user.model")
// Load input validation
const validateRegisterInput = require("../utils/register.utils");
const validateLoginInput = require("../utils/login.utils");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const secret = "he bites my feet, I feel the passion"

const generateToken = (id) => {
    return jwt.sign({id}, secret, {expiresIn: "30d",})
}

module.exports.index = (req, res) => {
    res.json({
        user_message: "User API",
        user_get_routes: "/api/users, /api/users/':id'",
        user_post_routes: "/api/users ({username: String, email: String, password: String, *thoughts: String}) *Optional",
        user_put_routes: "/api/users/'id' ({name:String, type:String, description:String, *skill1:String, *skill2:String, *skill3:String}) *Optional",
        user_delete_routes: "/api/users/':id'",

        thought_message: "Thought API",
        thought_get_routes: "/api/thoughts, /api/thoughts/':id'",
        thought_post_routes: "/api/thoughts ({thought: String, userId: String, *comment: String}) *Optional",
        thought_put_routes: "/api/thoughts/'id' ({thought: String, userId: String, *comment: String}) *Optional",
        thought_delete_routes: "/api/thoughts/':id'"
    });
}

module.exports.findAllUsers = (req, res) => {
    User.find({})
    .then(user => {
        console.log(user)
        res.json(user)
    })
    .catch(err => {
        console.log(err)
        res.json(err)
    })
}

module.exports.findAUser = (req, res) => {
    User.findOne({_id:req.params.id})
    .then(user => res.json(user))
    .catch(err => res.json(err))
}

module.exports.findMe = (req, res) => {
    User.findOne({_id:req.params.id})
    .then(user => res.json(user))
    .catch(err => res.json(err))
}

module.exports.createUser = async (req, res) => {
    console.log(req);
    const { err, isValid } = validateRegisterInput(req.body)
    const {username, email, password} = req.body;
    if (!isValid) {
        return res.status(400).json({errors:{message:err}})
    }

    bcrypt.hash(password, 8, function(err, hash) {
        const data = {username, email, password:hash}
        User.create(data)
        .then(user => res.json({
            _id:user._id, 
            username:user.username, 
            email:user.email, 
            token: generateToken(user._id)
        }))
        .catch(err => res.status(400).json(err))
    });
}

module.exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    await User.findOne({username: username})
    .then(user => {
        bcrypt.compare(password, user.password)
        .then(pass => {
            if (!pass) {
                res.status(400).json("Invalid username / password")
            } else {
                res.json({
                    _id:user._id, 
                    username:user.username, 
                    email:user.email, 
                    token: generateToken(user._id)
                })
            }
        });
    })
    .catch(err => res.status(400).json(err))
}

module.exports.updateUser = (req, res) => {
    const { err, isValid } = validateRegisterInput(req.body)
    if (!isValid) {
        return res.status(400).json(err)
    }
    const {_id, username, email, password} = req.body;

    bcrypt.hash(password, 8, function(err, hash) {
        const user = {_id, username, email, password:hash}
        User.findOneAndUpdate({_id:req.params.id}, user, {new:true, runValidators:true})
            .then(updatedUser => res.json(updatedUser))
            .catch(err => res.status(400).json(err))
    });
}

module.exports.deleteUser = (req, res) => {
    User.deleteOne({_id:req.params.id})
        .then(confirmation => res.json(confirmation))
        .catch(err => res.json(err))
}