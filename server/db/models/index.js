const Cast = require('./Cast');
const Ceremony = require('./Ceremony');
const TruthBooth = require('./TruthBooth');
const Pair = require('./Pair');

Cast.hasOne(Cast, { as: 'match', foreignKey: 'matchId' });

Ceremony.hasMany(Pair);
Pair.belongsTo(Ceremony);

module.exports = {
  Cast,
  Ceremony,
  TruthBooth,
  Pair
};
