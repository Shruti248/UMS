const Validator = require('validator');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};