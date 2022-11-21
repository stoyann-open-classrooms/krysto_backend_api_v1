// dependency
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
//import middlewares
const morgan = require("morgan");
const errorHandler= require('./middlewares/error.js')


// load config DB
const connectDB = require("./config/db");

//load environement variables
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

// Route files
const partners = require("./routes/partners");
const articles = require("./routes/articles");
const requests = require("./routes/requests");
const collects = require("./routes/collects");
const plasticTypes = require("./routes/plastic_types");

// initialize express  application
const app = express();

// Body parser
app.use(express.json())

// Dev logging Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Mount routers
app.use("/krysto/api/v1/partners", partners);
app.use("/krysto/api/v1/articles", articles);
app.use("/krysto/api/v1/requests", requests);
app.use("/krysto/api/v1/collects", collects);
app.use("/krysto/api/v1/plasticTypes", plasticTypes);

app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT} `.white
      .underline.bold.bgGreen
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server and exit process
  server.close(() => process.exit(1));
});
