const express = require('express');
const bodyParser = require('body-parser');
const doenv = require("dotenv");
const path = require("path");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");

const cors=require("cors");
require("dotenv").config();


// create express app
const app = express();
app.set('view engine', 'ejs');

app.use(cors({

  origin:["http://localhost:5000"],
 
 }))


doenv.config({
  path: "../config/.env",
});

// Setup server port
const port = process.env.PORT || 5000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))


// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a root route
app.get('/', (req, res) => {
  res.send("Hello World");
});

// Require employee routes


const projectRoutes = require('./src/routes/project.routes');

// using as middleware


app.use('/api/project', projectRoutes);


//app.use('/api/v1/download', attachmentRoutes);

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
