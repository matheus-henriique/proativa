const express = require('express');
const app = express();

require('dotenv').config();
require("./connection.js");

app.use(express.json());