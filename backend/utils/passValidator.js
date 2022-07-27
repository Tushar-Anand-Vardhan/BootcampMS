const passwordValidator = require('password-validator');


// Create a schema
const schema = new passwordValidator();

// Add properties to it
const validatePassword = (password) => {
    schema.is().min(8).is().max(100).has().uppercase().has().lowercase().has().digits().has().not().spaces();
    const errs = []
    schema.validate(password, { details: true }).forEach(err => {
        errs.push(err.message)
    });
    return errs;
}

module.exports = validatePassword;


