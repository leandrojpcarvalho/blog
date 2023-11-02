const express = require('express');
const Routes = require('./routes');

// ...

const app = express();
app.use(express.json());

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use('/post', Routes.post);
app.use('/login', Routes.login);
app.use('/user', Routes.user);
app.use('/categories', Routes.categories);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
