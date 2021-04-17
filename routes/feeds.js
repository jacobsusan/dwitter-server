const router = require('express').Router({ mergeParams: true });
const Followers = require('../models/Followers');
const sequelize = require('./../database');
const logger = require('../lib/logger');

router.get('/', (req, res) => {
  logger.info(
    `GET the feed of (${req.params['userId']}) > /api/v1/users/:userId/feeds`
  );
  var following = [];
  Followers.findAll({
    attributes: ['userId'],
    where: {
      followerId: req.params.userId,
    },
  })
    .then((followers) => {
      followers.forEach(function (item, index) {
        following.push(item.userId);
      });

      sequelize
        .query(
          'SELECT DT.id, u.fullName, u.username, DT.dweetText, DT.dweetImg, DT.createdAt FROM Users u ' +
            ' JOIN Dweets DT ON (u.id = DT.userId) where DT.userId IN (' +
            following +
            ')',
          { type: sequelize.QueryTypes.SELECT }
        )
        .then(function (results) {
          res.status(200).json(results);
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
