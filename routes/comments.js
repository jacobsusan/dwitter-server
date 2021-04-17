const router = require('express').Router({ mergeParams: true });
const logger = require('../lib/logger');
const Comments = require('../models/Comments');
const sequelize = require('./../database');

// GET /api/v1/dweeters/:dweeterId/dweets => Get all the comments for a dweet
router.get('/:dweetId', (req, res) => {
  logger.info(`GET all comments for dweet (${req.params['dweetId']}) > /api/v1/dweeters/comments/:dweetId`);
  /*Comments.findAll({
    where: {
      dweetId: req.params['dweetId'],
    },
  })
    .then((commentDetails) => {
      res.status(200).json(commentDetails);
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });*/

    sequelize
    .query(
      "SELECT R.id, DR.fullName, DR.username, R.commenterId,R.commentText, R.createdAt FROM Comments R " +
        " JOIN Users DR ON (R.commenterId = DR.id) where R.dweetId=" +req.params['dweetId'],
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

// POST /api/v1/dweeters/:dweeterId/dweets => Comment on a dweet
router.post('/:dweetId', (req, res) => {
  console.log(`POST Comment on dweet (${req.params['dweetId']}) > /api/v1/dweeters/comments/:dweetId`);
  Comments.create(
    {
      dweetId: req.params.dweetId,
      commenterId: req.body.commenterId,
      commentText: req.body.commentText
    },
    { fields: ['dweetId', 'commenterId', 'commentText'] }
  )
    .then((comment) => {
      console.log(comment);
      res.status(201);
      res.send(comment);
    })
    .catch(() => {
      console.log('Error in creating');
    });
});


module.exports = router;
