const router = require('express').Router({ mergeParams: true });
const logger = require('../lib/logger');
const Dweets = require('../models/Dweets');

// GET /api/v1/users/:userId/dweets => Get all the dweets by User
router.get('/', (req, res) => {
  logger.info(
    `GET all dweets by (${req.params['userId']}) > /api/v1/users/:userId/dweets`
  );
  Dweets.findAll({
    where: {
      userId: req.params['userId'],
    },
  })
    .then((dweets) => {
      res.status(200).json(dweets);
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

// POST /api/v1/users/:userId/dweets => Create a dweet
router.post('/', (req, res) => {
  logger.info(
    `POST a dweet by (${req.params['userId']}) > /api/v1/users/:userId/dweets`
  );
  Dweets.create(
    {
      userId: req.params.userId,
      dweetText: req.body.dweetText,
      dweetImg: req.body.dweetImg,
    },
    { fields: ['userId', 'dweetText', 'dweetImg'] }
  )
    .then((newDweet) => {
      logger.info(newDweet);
      res.status(201);
      res.send(newDweet);
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

// GET /api/v1/users/:userId/dweets/:id => Get one particular dweet
router.get('/:id', async (req, res) => {
  logger.info(
    `GET one particular dweet (${req.params['id']}) by (${req.params['userId']}) > /api/v1/users/:userId/dweets/:id`
  );
  Dweets.findOne({
    where: {
      id: req.params['id'],
      userId: req.params['userId'],
    },
  })
    .then((dweet) => {
      res.status(200).json(dweet);
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

module.exports = router;
