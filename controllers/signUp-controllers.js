// Dependencies
const express = require("express");
// Express Router
const router = express.Router();

// Validations
const validation = require("../client/src/Shared/Validations/signup");

// Middleware
const middleware = require("../client/src/Shared/Middleware/authenticateMiddleware");

// Password encrpytion
const bCrypt = require("bcrypt-nodejs");

// User Model
const { Users } = require("../models");

// ----------------------------------------------------------------------------------- //
// User Signup POST
router.post("/", (req, res) => {
    const { errors, isValid } = validation(req.body);

    // If theres an error, send it to the client   
    if (isValid) {
        // Deconstructing the variable
        const { firstName, lastName, email, phone, password, address, city, state, zip, county } = req.body;
        // searching for an email
        Users.findOne({
            where: {
                email: email
            }
        }).then(function(user, err) {
            // If the email already exists
            if (user) {
                res.status(400).json(errors);
            } else if(!user) {

                // Generating hashed passwords
                const userPassword = bCrypt.hashSync(password);
                // User form object
                const data = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phone: phone,
                    userPassword: userPassword,  
                    address: address,
                    city: city, 
                    state: state, 
                    zip:  zip,
                    county: county
                }
                // Else, create user
                Users.create(data).then(function(newUser, created) {
                    // If new user
                    if (newUser) {
                        return newUser;
                    }
         
                }).then(newUser => res.json({ success: true }))
                    // Catch errors
                    .catch(err => console.log(err));
            } 
        })
    }  else if(!isValid) {
        // send errors
        res.status(400).json(errors);
    }
});

// ----------------------------------------------------------------------------------- //

// Route to check if an already exists during sign up - This activates OnBlur with the email field
router.get("/:identifier", (req, res) => {
    // Find the passed paramter within the email column
    Users.findOne({
        where: {
            email: req.params.identifier
        }
        // If it exists send that user email back
    }).then(user => {
        res.json({ user });
    })
});

// ----------------------------------------------------------------------------------- //
module.exports = router;