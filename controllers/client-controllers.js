// Requiring dependencies
const express = require("express");
// Express Router
const router = express.Router();

// ----------------------------------------------------------------------------------- //
// Landing page
router.get("*", function (req, res) {
    res.send(File(path.join(__dirname, "./public/index.html")));
});

// ----------------------------------------------------------------------------------- //
module.exports = router;

