const app = require("./app")
const dotenv = require("dotenv")
const connectDatabase = require("./config/database")

//handeling uncaught exceptions

process.on("uncaughtException", (err) => {
    console.log(`Error; ${err.message}`);
    console.log("shutting down the server due to uncaught exception");
    server.close(() => {
        process.exit(1);
    });
});


//config
dotenv.config({ path: "backend/config/config.env" })

//connecting to database
connectDatabase()

app.listen(process.env.PORT, () => {
    console.log("server runnning on port", process.env.PORT)
})

//unhandled promise rejections
process.on("unhandledRejection", err => {
    console.log(`Error : ${err.message}`);
    console.log('shutting down the server due to undhandled promise rejection');
    server.close(() => {
        process.exit(1);
    });
});