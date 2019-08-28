const Sequelize = require('sequelize');
const db = require('../db');

const Ceremony = db.define('ceremony', {
  number: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1,
      max: 10
    }
  },
  beams: {
    type: Sequelize.INTEGER,
    defaultValue: null,
    validate: {
      min: 0,
      max: 10
    }
  }
});

module.exports = Ceremony;
