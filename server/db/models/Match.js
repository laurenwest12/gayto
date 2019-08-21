const Sequelize = require('sequelize');
const db = require('../db');

const Match = db.define('match', {
  discovered: {
    type: Sequelize.BOOLEAN
  }
});

module.exports = Match;
