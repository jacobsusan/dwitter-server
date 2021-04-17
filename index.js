const express = require('express');
const cors = require('cors');
const passport = require('passport');
const logger = require('./lib/logger');
require('./auth/auth');

const api = require('./routes/api');
const authRoutes = require('./routes/authRoutes');

const sequelize = require('./database.js');
sequelize.sync({}).then(() => {
  logger.info('Dwitter Database initialized');
});

const app = new express();
app.use(cors());
app.use(express.json());

app.use('/', authRoutes);
app.use('/api', passport.authenticate('jwt', { session: false }), api);

app.listen(3002, () => {
  logger.info('Dwitter Server listening at port 3002');
});
