const router = require('express').Router({ mergeParams: true });
const logger = require('../lib/logger');
const Reactions = require('../models/Reactions');
const sequelize = require('./../database');

// GET /api/v1/users/:userId/dweets => Get all the reactions for a dweet
router.get('/:dweetId', (req, res) => {
  logger.info(
    `GET all reactions for dweet (${req.params['dweetId']}) > /api/v1/users/:userId/reactions/:dweetId`
  );
  /*Reactions.findAll({
    where: {
      dweetId: req.params['dweetId'],
    },
  })
    .then((reactionDetails) => {
      res.status(200).json(reactionDetails);
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });*/

    sequelize
    .query(
      "SELECT R.id, DR.fullName, DR.username, R.reactorId, R.createdAt FROM Reactions R " +
        " JOIN Users DR ON (R.reactorId = DR.id) where R.dweetId=" +req.params['dweetId'],
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

});

// POST /api/v1/users/:userId/dweets => React on a dweet
router.post('/:dweetId', (req, res) => {
  console.log(
    `POST Reaction on dweet (${req.params['dweetId']}) > /api/v1/users/reactions/:dweetId`
  );
  Reactions.create(
    {
      dweetId: req.params.dweetId,
      reactorId: req.body.reactorId,
      reactionType: 'like',
    },
    { fields: ['dweetId', 'reactorId', 'reactionType'] }
  )
    .then((reaction) => {
      console.log(reaction);
      res.status(201);
      res.send(reaction);
    })
    .catch((err) => {
      res.status(409).json({
        error: "You have already reacted on this dweet !",
      });
    });
});

module.exports = router;
