// dependency
const path = require('path')
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const fileupload = require("express-fileupload")
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require("xss-clean");
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
//import middlewares
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
const auth = require("./routes/auth");
// initialize express  application
const app = express();

// Body parser
app.use(express.json())

// Cookie parser 
app.use(cookieParser)

// Dev logging Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}


// File uploading 
app.use(fileupload())

// ======================= Security ====================
// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// =====================================================


//set static folder 
app.use(express.static(path.join(__dirname, 'public')))



//Mount routers
app.use("/krysto/api/v1/partners", partners);
app.use("/krysto/api/v1/articles", articles);
app.use("/krysto/api/v1/requests", requests);
app.use("/krysto/api/v1/collects", collects);
app.use("/krysto/api/v1/plasticTypes", plasticTypes);
app.use("/krysto/api/v1/auth", auth);

app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT} root URL : http://localhost${PORT}/api/v1: `.white
      .underline.bold.bgGreen
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server and exit process
  server.close(() => process.exit(1));
});
