const express = require("express")
const app = express()

app.use(express.json());


// Route imports
const user = require("./routes/userRoute");
const assignment = require("./routes/assignmentRoute");
const team  =  require("./routes/teamRoute");

app.use("/api/v1",user)
app.use("/api/v1",assignment)
app.use("/api/v1",team)
module.exports = app;