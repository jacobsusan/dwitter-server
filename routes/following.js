const router = require('express').Router({ mergeParams: true });
const logger = require('../lib/logger');
const Followers = require('../models/Followers');

// POST /api/v1/users/:userId/following => Follow another Dweeter
router.post('/', (req, res) => {
  logger.info(
    `POST Follow dweeter (${req.body['userId']}) --> /api/v1/users/:userId/following`
  );
  Followers.create(
    {
      userId: req.body.userId,
      followerId: req.params.userId,
    },
    { fields: ['userId', 'followerId'] }
  )
    .then((follower) => {
      res.status(201).json(follower);
    })
    .catch((err) => {
      res.status(409).json({
        error: "You are already following this dweeter !!",
      });
    });
});

// GET /api/v1/users/:userId/following => Get list of following
router.get('/', (req, res) => {
  logger.info(
    `GET Fetching people whom User(${req.params['userId']}) is following > /api/v1/users/:userId/following`
  );

  Followers.findAll({
    attributes: ['userId'],
    where: {
      followerId: req.params['userId'],
    },
  })
    .then((followees) => {
      logger.debug(followees);
      res.status(200).json(followees);
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

module.exports = router;
