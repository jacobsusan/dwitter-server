const router = require('express').Router();
const users = require('./users');

router.use('/v1/users', users);

module.exports = router;
