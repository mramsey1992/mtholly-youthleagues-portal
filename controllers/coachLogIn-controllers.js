// Dependencies
const express = require("express");
const jwt = require("jsonwebtoken");

// Config
const config = require("../client/src/Shared/Config/config");

// User Model
const { Coach } = require("../models");

// Pass Encrpytion
const bCrypt = require("bcrypt-nodejs");

// Express router
const router = express.Router();

// ----------------------------------------------------------------------------------- //
// Auth route
router.post("/", (req, res) => {
    // Req.body data
    const { email, password } = req.body;
    // Find a Coach by email
    Coach.findOne({
        where: {
            email: email
        } 
    }).then(function(user) {
        // If user is found, compare passwords
        if(user) {
            if(bCrypt.compareSync(password, user.password)) {
                // Apply JWT after log-in
                const token = jwt.sign({
                    id: user.id,
                    username: user.email
                }, config.jwtSecret);
                // Redirect/Add JWT
                res.json({ token })
            } else {
                // Display error message
                res.status(401).json({ errors: { form: "The password does not match"} })
            }
        } else {
            // Display error message
            res.status(401).json({ errors: { form: "The email address does not exist"} })
        }
    })
})

// ----------------------------------------------------------------------------------- //
module.exports = router;