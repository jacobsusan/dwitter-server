const router = require('express').Router({ mergeParams: true });
const logger = require('../lib/logger');
const Followers = require('../models/Followers');
const User = require('../models/User');

router.get('/', (req, res) => {
  logger.info(
    `GET followers of Dweeter (${req.params['userId']}) > /api/v1/users/:userId/followers`
  );
  Followers.findAll({
    attributes: ['followerId'],
    where: {
      userId: req.params['userId'],
    },
  })
    .then((followers) => {
          res.status(200).json(followers);
    })
        .catch((err) => {
          res.status(500).json({
            error: err.message,
          });
        });
});

module.exports = router;
