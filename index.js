const express = require('express');
const app = express();

require('dotenv').config();
require('./connection.js');
const PORT = process.env.PORT || 3000;

app.use(express.json());
const auth = require('./src/routes/auth.router');
const user = require('./src/routes/user.router');

app.get('/helloworld', (req, res) => {
  res.send('Hello World!!');
});

app.use(auth);
app.use(user);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));