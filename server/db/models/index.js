const Cast = require('./Cast');
const Ceremony = require('./Ceremony');
const Match = require('./Match');
const TruthBooth = require('./TruthBooth');

Cast.hasOne(Cast, { as: 'Match', through: Match });

module.exports = {
  Cast,
  Ceremony,
  Match,
  TruthBooth
};
