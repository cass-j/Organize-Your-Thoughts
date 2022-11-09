const Validator = require("validator");
const isEmpty = require("is-empty"); 

const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    return re.test(password)
}

module.exports = function validateRegisterInput(data) {
    let err = {};// Convert empty fields to an empty string so we can use validator functions
    data.username = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";// username checks

    if (Validator.isEmpty(data.username)) {
        err.username = "username field is required";
    }// Email checks
    if (Validator.isEmpty(data.email)) {
        err.email = "Email is required";
    } else if (!Validator.isEmail(data.email)) {
        err.email = "Email is invalid";
    }// Password checks
    if (Validator.isEmpty(data.password)) {
        err.password = "Password is required";
    } if (Validator.isEmpty(data.password2)) {
        err.password2 = "Confirm password is required";
    } if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        err.password = "Password must be at least 6 characters";
    } if (!Validator.equals(data.password, data.password2)) {
        err.password2 = "Passwords must match";
    } if (!validatePassword(data.password)){
        err.password = "Password must contain one lowercase and capital letter, one number, and a special character !#$%&*+/=?^_{|}~-"
    }return {
        err,
        isValid: isEmpty(err)
    };
};