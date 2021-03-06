// Requiring Dependencies
const validator = require("validator");
const isEmpty = require("lodash.isempty");

// Validation function
module.exports = function validateInput(data) {
    let errors = {};

    // Field validator
    if(validator.isEmpty(data.firstName)) {
        errors.firstName = "This field is required.";
    }

    // Field validator
    if(validator.isEmpty(data.lastName)) {
        errors.lastName = "This field is required.";
    }

    // Field validator
    if(validator.isEmpty(data.age)) {
        errors.age = "This field is required.";
    }

    // If the email doesn't match
    if(validator.isEmpty(data.years_exp)) {
        errors.years_exp = "This field is required.";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}