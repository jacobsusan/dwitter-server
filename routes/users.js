const router = require('express').Router({ mergeParams: true });
const logger = require('../lib/logger');
const dweetsRouter = require('./dweets');
const followersRouter = require('./followers');
const followingRouter = require('./following');
const feedsRouter = require('./feeds');
const searchRouter = require('./search');
const reactionRouter = require('./reactions');
const commentRouter = require('./comments');
const User = require('../models/User');

router.use('/:userId/dweets', dweetsRouter);
router.use('/:userId/followers', followersRouter);
router.use('/:userId/following', followingRouter);
router.use('/:userId/feeds', feedsRouter);
router.use('/search', searchRouter);
router.use('/reactions', reactionRouter);
router.use('/comments', commentRouter);

// GET /api/v1/users => Get all users
router.get('/', (req, res) => {
  logger.info('GET all users > /api/v1/users');
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

// GET /api/v1/users/:id => Get User by ID
// router.get('/:id', (req, res) => {
//   logger.info('GET a user > /api/v1/users/:id');
//   User.findByPk(req.params['id'])
//     .then((user) => {
//       res.status(200).json(user);
//     })
//     .catch((err) => {
//       res.status(500).json({
//         error: err.message,
//       });
//     });
// });

// GET /api/v1/users/:id => Get User by uname
router.get('/:username', (req, res) => {
  logger.info('GET a user > /api/v1/users/:username');

  logger.info(req.params['username'] );

  User.findAll({ where: { username: req.params['username'] } })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });

});

module.exports = router;
