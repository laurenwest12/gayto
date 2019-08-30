const Sequelize = require('sequelize');
const db = require('../db');

const TruthBooth = db.define('truthBooth', {
  match: {
    type: Sequelize.BOOLEAN,
    defaultValue: null
  },
  pair1: {
    type: Sequelize.JSON
  },
  pair2: {
    type: Sequelize.JSON
  }
});

module.exports = TruthBooth;
