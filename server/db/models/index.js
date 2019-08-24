const Cast = require('./Cast');
const Ceremony = require('./Ceremony');
const TruthBooth = require('./TruthBooth');

Cast.hasOne(Cast, { as: 'match', foreignKey: 'matchId' });

module.exports = {
  Cast,
  Ceremony,
  TruthBooth
};
