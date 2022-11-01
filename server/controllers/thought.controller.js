const Thought = require("../models/thought.model")

module.exports.findAllThoughts = (req, res) => {
    Thought.find({})
    .then(thought => {
        console.log(thought)
        res.json(thought)
    })
    .catch(err => {
        console.log(err)
        res.json(err)
    })
}

module.exports.findAThought = (req, res) => {
    Thought.findOne({_id:req.params.id})
    .then(thought => res.json(thought))
    .catch(err => res.json(err))
}

module.exports.createThought = (req, res) => {
    Thought.create(req.body)
        .then(thought => res.json(thought))
        .catch(err => res.status(400).json(err))
}

module.exports.updateThought = (req, res) => {
    Thought.findOneAndUpdate({_id:req.params.id}, req.body, {new:true, runValidators:true})
        .then(updatedThought => res.json(updatedThought))
        .catch(err => res.status(400).json(err))
}

module.exports.forgetThought = (req, res) => {
    Thought.deleteOne({_id:req.params.id})
        .then(confirmation => res.json(confirmation))
        .catch(err => res.json(err))
}