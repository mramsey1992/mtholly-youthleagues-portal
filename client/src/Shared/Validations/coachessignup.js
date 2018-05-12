// Requiring Dependencies
const validator = require("validator");
const isEmpty = require("lodash.isempty");

// Validation function
module.exports = function validateInput(data) {
    let errors = {};

    // Field validator
    if(validator.isEmpty(data.first_name)) {
        errors.first_name = "This field is required.";
    }

    // Field validator
    if(validator.isEmpty(data.last_name)) {
        errors.last_name = "This field is required.";
    }

    // Field validator
    if(validator.isEmpty(data.password)) {
        errors.password = "This field is required.";
    }

    // Field validator
    if(validator.isEmpty(data.phone)) {
        errors.phone = "This field is required.";
    }

    // Field validator
    if(validator.isEmpty(data.email)) {
        errors.email = "This field is required.";
    }

    // If the email doesn't match
    if(!validator.isEmail(data.email)) {
        errors.email = "Email is invalid.";
    }

    // Field validator
    if(!validator.isEmail(data.sport)) {
        errors.sport = "This field is required.";
    }

    // Field validator
    if(validator.isEmpty(data.address)) {
        errors.address = "This field is required.";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}