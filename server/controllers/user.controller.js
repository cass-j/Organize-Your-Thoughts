const User = require("../models/user.model")
const bcrypt = require("mongoose-bcrypt");

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

module.exports.createUser = (req, res) => {
    User.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(400).json(err))
}

module.exports.updateUser = (req, res) => {
    User.findOneAndUpdate({_id:req.params.id}, req.body, {new:true, runValidators:true})
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(400).json(err))
}

module.exports.deleteUser = (req, res) => {
    User.deleteOne({_id:req.params.id})
        .then(confirmation => res.json(confirmation))
        .catch(err => res.json(err))
}