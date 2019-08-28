const Sequelize = require('sequelize');
const db = require('../db');

const Pair = db.define('pair', {
  pair1: {
    type: Sequelize.JSON
  },
  pair2: {
    type: Sequelize.JSON
  },
  match: {
    type: Sequelize.BOOLEAN
  }
});

module.exports = Pair;
