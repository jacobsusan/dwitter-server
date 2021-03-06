const router = require('express').Router({ mergeParams: true });
const logger = require('../lib/logger');
const Dweets = require('../models/Dweets');
const User = require('../models/User');
const { Op } = require('sequelize');
const sequelize = require('./../database');

// Get //api/v1/user/search/dweeter => Search DWEETER
router.get('/dweeter', async (req, res) => {
  logger.info(`GET Search dweeter (${req.query.searchText}) > /api/v1/user/search/dweeter`);
  const searcht = '%' + req.query.searchText + '%';
  const user = await User.findAll({
    where: {
      [Op.or]: [
        { fullName: { [Op.like]: searcht } },
        { username: { [Op.like]: searcht } },
      ],
    },
  });
  res.send(user);
});

//GET /api/v1/users/search/dweet => Search DWEET
router.get('/dweet', async (req, res) => {
  logger.info(`GET Search dweet (${req.query.searchText}) > /api/v1/users/search/dweet`);
  const searcht = '%' + req.query.searchText + '%';

  sequelize
        .query(
          "SELECT DT.id, DR.fullName, DR.username, DT.dweetText, DT.dweetImg, DT.createdAt FROM Users DR " +
            " JOIN Dweets DT ON (DR.id = DT.userId) where DT.dweetText LIKE '" +
            searcht +
            "'",
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



module.exports = router;
