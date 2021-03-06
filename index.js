const express = require("express");
const app = express();
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
const passport = require("passport");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
require("./schemas/user");
require("./services/passport");


mongoose.connect(keys.mongoDb)
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
//Cookie data
app.use(
  cookieSession({
    keys: [keys.cookieKey],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
//Tell passport to use cookies
app.use(passport.initialize());
app.use(passport.session());

//Json Parser for requests
app.use(bodyParser.json());


require("./routes/authRoutes")(app);
require("./routes/blogRoutes")(app);
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello setup");
});

app.listen(PORT);
