const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
//const sequelize = require('./db');
// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
// sequelize.sync().then(result => {
 
//   console.log(result);
// }).catch(err => {
//   console.log(err);
// });

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});