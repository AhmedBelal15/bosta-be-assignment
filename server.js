const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require('cors')
require("colors");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

// Connect to DB
connectDB();

const app = express();

// Body Parser
app.use(express.json());

//Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Enable CORS
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

