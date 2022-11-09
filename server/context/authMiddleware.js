const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const User = require("../../../../server/models/user.model")
const secret = "he bites my feet, I feel the passion"

const protect = async (req, res, next) => {
    let token

    if (req.headers.authorization && 
        req.headers.authorization.startWith('Bearer')
    ) {
        try {
            // Get token
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decode = jwt.verify(token, secret)

            // Get user from token
            req.user = await User.findById(decode.id).select('-password')

            next()
        } catch (error) {
            console.log(error);
            res.status(401).json("Not Authorized")
            
        }
    }
    if (!token) {
        console.log(error);
        res.status(401).json("Not Authorized")
    }
}

module.exports = (protect, secret);
