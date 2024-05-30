const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();

dotenv.config();

// const port = process.env.PORT || 5000;
const port = 5000;
const Knex = require("knex");
const { Model } = require("objection");
const knexConfig = require("./knexfile");

// Choose the environment (e.g., development, production)
const environment = process.env.NODE_ENV || "development";
const knex = Knex(knexConfig[environment]);

// Bind the knex instance to the objection.js Model class
Model.knex(knex);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use("/", require("./routes/authRoutes"));
app.use("/", require("./routes/userLogin"));
app.use("/", require("./routes/crudRoutes"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
