// Dependencies
const express = require("express");
// Express Router
const router = express.Router();
// Validations
const validation = require("../client/src/Shared/Validations/signup");
// Middleware
const middleware = require("../client/src/Shared/Middleware/authenticateMiddleware");
//Kid Model
const { Users, Kids, Sport, Team } = require("../models");

router.get("/:kidId", (req,res) => {
    console.log("I made it here");
    
    Kids.findOne({
        where: {
            id: req.params.kidId
        },
        include: [Team, Sport]
    }).then(kid => {
        res.json(kid);
    });
});


module.exports = router;