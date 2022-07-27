const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
var cors = require('cors');

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [
    "http://localhost:4200"
  ], credentials: true
}));

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});


// Route imports
const user = require("./routes/userRoute");
const assignment = require("./routes/assignmentRoute");
const team = require("./routes/teamRoute");



app.use("/api/v1", user)
app.use("/api/v1", assignment)
app.use("/api/v1", team)

//middleware for error
const errorMiddleware = require('./middleware/error')
app.use(errorMiddleware);
module.exports = app;