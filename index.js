const express = require('express');
const app = express();

require('dotenv').config();
require('./connection.js');
const PORT = process.env.PORT || 3000;

app.use(express.json());
const auth = require('./src/routes/auth.router');
const user = require('./src/routes/user.router');
const cliente = require('./src/routes/cliente.router');
const equipamento = require('./src/routes/equipamentos.router');
const pecas = require('./src/routes/pecas.router');
const furos = require('./src/routes/furos.router');
const {authenticateToken} = require('./src/middlewares/auth.middleware.js');

app.get('/helloworld', (req, res) => {
  res.send('Hello World!!');
});

app.use(auth);
app.use(authenticateToken);
app.use(user);
app.use(cliente);
app.use(equipamento);
app.use(pecas);
app.use(furos);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));