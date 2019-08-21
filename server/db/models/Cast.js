const Sequelize = require('sequelize');
const db = require('../db');

const Cast = db.define('cast', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = Cast;
