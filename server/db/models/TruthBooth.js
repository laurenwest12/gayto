const Sequelize = require('sequelize');
const db = require('../db');

const TruthBooth = db.define('truthBooth', {
  match: {
    type: Sequelize.BOOLEAN,
    defaultValue: null
  }
});

module.exports = TruthBooth;
