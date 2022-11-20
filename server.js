const express = require("express");
const dotenv = require("dotenv");
//import middlewares
const morgan = require('morgan')

// Route files
const partners = require("./routes/partners");

//load environement variables
dotenv.config({ path: "./config/config.env" });


// initialize express  application
const app = express();

// Dev logging Middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}


//Mount routers
app.use("/krysto/api/v1/partners", partners);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);