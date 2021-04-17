const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const logger = require('../lib/logger');
const User = require('../models/User');

router.post('/signup', async (req, res, next) => {
  logger.info('POST Signup User > /signup');
  User.create(req.body)
    .then((user) => {
      logger.info(user);
      res.status(201).json(user);
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).json({
        error: err.message,
      });
    });
});

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An error occurred.');

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, 'DWITTER');

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
