// User Model
const { Coach } = require("../models");
// Dependencies
const express = require("express");
// Express Router
const router = express.Router();

// ----------------------------------------------------------------------------------- //
// Find all coaches
    router.get("/", function(req, res) {
        Coach.findAll({})
        .then(function(dbCoach){
            res.json(dbCoach);
        });
    });

// ----------------------------------------------------------------------------------- //
module.exports = router;
