const express = require('express');
const app = express();

require('dotenv').config();
require("./connection.js");

app.use(express.json());

const PORT = process.env.PORT || 3000;
const user = require('./src/routes/user.router.js');

app.use(user);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));