const PORT = process.env.PORT || 3000;
const user = require('./src/routes/user.router.js');

app.use('/user', user);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));