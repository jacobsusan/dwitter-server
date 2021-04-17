const router = require('express').Router({ mergeParams: true });
const logger = require('../lib/logger');
const Followers = require('../models/Followers');
const User = require('../models/User');

// GET /api/v1/users/:userId/followers
router.get('/', (req, res) => {
  logger.info(
    `GET followers of Dweeter (${req.params['userId']}) > /api/v1/dweeters/:userId/followers`
  );
  Followers.findAll({
    attributes: ['followerId'],
    where: {
      userId: req.params['userId'],
    },
  })
    .then((followers) => {
      User.findAll({
        where: {
          id: followers.map((fol) => fol.followerId),
        },
      })
        .then((users) => {
          res.status(200).json(users);
        })
        .catch((err) => {
          res.status(500).json({
            error: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

module.exports = router;
