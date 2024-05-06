const express = require('express');
const app = express();

require('dotenv').config();
require('./connection.js');
const PORT = process.env.PORT || 3000;

const authRouter = require('./src/routes/auth.router');

app.use(express.json());
app.use('/api/auth', authRouter);

app.get('/api/helloworld', (req, res) => {
  res.send('Hello World!!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));