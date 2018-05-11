// Dependencies
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const db = require('./models');
const passport = require("passport");
const logger = require("morgan");
const session = require("express-session");
const flash = require("connect-flash");
const cookieSession = require("cookie-session");

// Initializing Express
let app = express();
const PORT = process.env.PORT || 3001;
// Setting up flash messages for session users
app.use(flash());
// Serving up the public folder to give static content
app.use(express.static("public"));

// Parse application/JSON
app.use(bodyParser.json());
// Using morgan to log server requests
app.use(logger("dev"));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Requiring controllers
const clientControllers = require("./controllers/client-controllers");
app.use("/client-controllers", clientControllers);
const signUpControllers = require("./controllers/signUp-controllers");
app.use("/api/users", signUpControllers)
const authControllers = require("./controllers/auth-controllers");
app.use("/api/auth", authControllers);


// Starting the server
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log(`🌎 ==> Server now on port ${PORT}!`);
  });
});
