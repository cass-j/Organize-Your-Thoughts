const Validator = require("validator");
const isEmpty = require("is-empty");

const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    return re.test(password)
}

module.exports = function validateLoginInput(data) {
    let err = {};// Convert empty fields to an empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";// Email checks
    if (Validator.isEmpty(data.email)) {
        err.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        err.email = "Email is invalid";
    }// Password checks
    if (Validator.isEmpty(data.password)) {
        err.password = "Password field is required";
    // } if (!validatePassword(data.password)){
    //     err.password = "Password is invalid"
    }return {
        err,
        isValid: isEmpty(err)
    };
};