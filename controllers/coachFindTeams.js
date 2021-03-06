// User Model
const {
	Team,
	Coach, 
	GamesInfo,
	Practice
} = require("../models");
// Dependencies
const express = require("express");
// Express Router
const router = express.Router();

// ----------------------------------------------------------------------------------- //
// retrieve all sports from data base.
router.get("/:id", (req, res) => {
	let data = [];
	Coach.findOne({
		where: {
			id: req.params.id
        },
        include: [
            Team
        ]
	}).then(coachInfo => {
		data.push(coachInfo);
		console.log(`Coach Info Team ID: ${coachInfo.TeamId}`);
		GamesInfo.findAll({
            where: {
                TeamId: coachInfo.TeamId
            }
        }).then(foundGames => {
			data.push(foundGames);
            Practice.findAll({
				where: {
					TeamId: coachInfo.TeamId
				}
			}).then(practices => {
				data.push(practices);
				res.json(data);
			});
        });
	})
});
    
// ----------------------------------------------------------------------------------- //
module.exports = router;